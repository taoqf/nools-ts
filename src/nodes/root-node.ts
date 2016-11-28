import { IPattern, IObjectPattern, IFromPattern, ICompositePattern } from '../interfaces';
import { enumPatternType, composite_pattern, initial_fact_pattern } from '../pattern';
import WorkingMemory from '../working-memory';
import AgendaTree from '../agenda';
import Fact from '../facts/fact';
import Rule from '../rule';

import Constraint from '../constraint/constraint';
import ReferenceConstraint from '../constraint/reference-constraint';
import HashConstraint from '../constraint/hash-constraint';
import ObjectConstraint from '../constraint/object-constraint';

import Node from './node';
import NotNode from './not-node';
import ExistsFromNode from './exists-from-node';
import ExistsNode from './exists-node';
import FromNotNode from './from-not-node';
import FromNode from './from-node';
import BetaNode from './beta-node';
import JoinNode from './join-node';
import TerminalNode from './terminal-node';
import TypeNode from './type-node';
import LeftAdapterNode from './left-adapter-node';
import RightAdapterNode from './right-adapter-node';
import AliasNode from './alias-node';
import AlphaNode from './alpha-node';
import PropertyNode from './property-node';
import EqualityNode from './equality-node';

// const extd = require("../extended"),
//     forEach = extd.forEach,
//     some = extd.some,
//     declare = extd.declare,
//     FromPattern = pattern.FromPattern,
//     FromNotPattern = pattern.FromNotPattern,
//     ExistsPattern = pattern.ExistsPattern,
//     FromExistsPattern = pattern.FromExistsPattern,
//     NotPattern = pattern.NotPattern,
//     constraints = require("../constraint"),
//     HashConstraint = constraints.HashConstraint,
//     ReferenceConstraint = constraints.ReferenceConstraint,
//     AliasNode = require("./aliasNode"),
//     EqualityNode = require("./equalityNode"),
//     JoinNode = require("./joinNode"),
//     BetaNode = require("./betaNode"),
//     NotNode = require("./notNode"),
//     FromNode = require("./fromNode"),
//     FromNotNode = require("./fromNotNode"),
//     ExistsNode = require("./existsNode"),
//     ExistsFromNode = require("./existsFromNode"),
//     LeftAdapterNode = require("./leftAdapterNode"),
//     RightAdapterNode = require("./rightAdapterNode"),
//     TypeNode = require("./typeNode"),
//     PropertyNode = require("./propertyNode");

function hasRefernceConstraints(pattern: IObjectPattern) {
	return (pattern.constraints || []).some((c) => {
		return c instanceof ReferenceConstraint;
	});
}

export type Side = 'left' | 'right';

export default class RootNode {
	protected terminalNodes: TerminalNode[] = [];
	protected joinNodes: (BetaNode | JoinNode)[] = [];
	// protected nodes = [];
	protected constraints: AlphaNode[] = [];
	protected typeNodes: TypeNode[] = [];
	protected __ruleCount = 0;
	protected bucket = {
		counter: 0,
		recency: 0
	};
	protected workingMemory: WorkingMemory;
	protected agendaTree: AgendaTree;
	constructor(wm: WorkingMemory, agendaTree: AgendaTree) {
		this.agendaTree = agendaTree;
		this.workingMemory = wm;
	}
	assertRule(rule: Rule) {
		const terminalNode = new TerminalNode(this.bucket, this.__ruleCount++, rule, this.agendaTree);
		this.__addToNetwork(rule, rule.pattern, terminalNode);
		this.__mergeJoinNodes();
		this.terminalNodes.push(terminalNode);
	}

	resetCounter() {
		this.bucket.counter = 0;
	}
	incrementCounter() {
		this.bucket.counter++;
	}
	assertFact(fact: Fact) {
		this.typeNodes.forEach((typeNode) => {
			typeNode.assert(fact);
		});
	}

	retractFact(fact: Fact) {
		this.typeNodes.forEach((typeNode) => {
			typeNode.retract(fact);
		});
	}

	modifyFact(fact: Fact) {
		this.typeNodes.forEach((typeNode) => {
			typeNode.modify(fact);
		});
	}


	containsRule(name: string) {
		return this.terminalNodes.some((n) => {
			return n.rule.name === name;
		});
	}

	dispose() {
		this.typeNodes.forEach((typeNode) => {
			typeNode.dispose();
		})
	}

	__mergeJoinNodes() {
		const joinNodes = this.joinNodes;
		for (let i = 0; i < joinNodes.length; i++) {
			const j1 = joinNodes[i] as JoinNode;
			const j2 = joinNodes[i + 1] as JoinNode;
			if (j1 && j2 && (j1.constraint && j2.constraint && j1.constraint.equal(j2.constraint))) {
				j1.merge(j2);
				joinNodes.splice(i + 1, 1);
			}
		}
	}

	__checkEqual<T extends AlphaNode>(node: T): T {
		const constraints = this.constraints;
		const nodes = constraints.filter((constraint) => {
			return node.equal(constraint);
		});
		if (nodes.length > 0) {
			return nodes[0] as T;
		} else {
			constraints.push(node);
			return node;
		}
	}

	__createTypeNode(rule: Rule, constraint: Constraint) {
		const ret = new TypeNode(constraint);
		const typeNodes = this.typeNodes;
		const tns = typeNodes.filter((typeNode) => {
			return ret.equal(typeNode);
		});
		if (tns.length > 0) {
			return tns[0];
		} else {
			typeNodes.push(ret);
			return ret;
		}
	}

	__createEqualityNode(rule: Rule, constraint: ObjectConstraint) {
		return this.__checkEqual(new EqualityNode(constraint)).addRule(rule);
	}

	__createPropertyNode(rule: Rule, constraint: HashConstraint) {
		return this.__checkEqual(new PropertyNode(constraint)).addRule(rule);
	}

	__createAliasNode(rule: Rule, pattern: IObjectPattern) {
		// return this.__checkEqual(new AliasNode(pattern)).addRule(rule);
		return this.__checkEqual(new AliasNode(pattern)).addRule(rule);
	}

	__createAdapterNode(rule: Rule, side: Side = 'right') {
		return (side === "left" ? new LeftAdapterNode() : new RightAdapterNode()).addRule(rule);
	}

	__createJoinNode(rule: Rule, pattern: ICompositePattern, outNode: Node, side: Side) {
		let joinNode: Node;
		const right_type = pattern.rightPattern.type;
		if (right_type === enumPatternType.not) {
			joinNode = new NotNode();
		} else if (right_type === enumPatternType.from_exists) {
			joinNode = new ExistsFromNode(pattern.rightPattern as IFromPattern, this.workingMemory);
		} else if (right_type === enumPatternType.exists) {
			joinNode = new ExistsNode();
		} else if (right_type === enumPatternType.from_not) {
			joinNode = new FromNotNode(pattern.rightPattern as IFromPattern, this.workingMemory);
		} else if (right_type === enumPatternType.from) {
			joinNode = new FromNode(pattern.rightPattern as IFromPattern, this.workingMemory);
		} else if (pattern.type === enumPatternType.composite && !hasRefernceConstraints(pattern.leftPattern as IObjectPattern) && !hasRefernceConstraints(pattern.rightPattern as IObjectPattern)) {
			const bn = joinNode = new BetaNode();
			this.joinNodes.push(bn);
		} else {
			const jn = joinNode = new JoinNode();
			this.joinNodes.push(jn);
		}
		joinNode.set_rule(rule);
		let parentNode = joinNode;
		if (outNode instanceof BetaNode) {
			const adapterNode = this.__createAdapterNode(rule, side);
			parentNode.addOutNode(adapterNode, pattern as any);	// todo:: type of pattern should be 'ObjectPattern'
			parentNode = adapterNode;
		}
		parentNode.addOutNode(outNode, pattern as any);
		return joinNode.addRule(rule);
	}

	__addToNetwork(rule: Rule, pattern: IPattern, outNode: Node, side: Side = 'left') {
		const type = pattern.type;
		if (type === enumPatternType.composite) {
			this.__createBetaNode(rule, pattern as ICompositePattern, outNode, side);
		} else if (type !== enumPatternType.initial_fact && side === 'left') {
			this.__createBetaNode(rule, composite_pattern(initial_fact_pattern(), pattern), outNode, side);
		} else {
			this.__createAlphaNode(rule, pattern as IObjectPattern, outNode, side);
		}
	}

	__createBetaNode(rule: Rule, pattern: ICompositePattern, outNode: Node, side: Side) {
		const joinNode = this.__createJoinNode(rule, pattern, outNode, side);
		this.__addToNetwork(rule, pattern.rightPattern, joinNode, "right");
		this.__addToNetwork(rule, pattern.leftPattern, joinNode, "left");
		outNode.addParentNode(joinNode);
		return joinNode;
	}


	__createAlphaNode(rule: Rule, pattern: IObjectPattern, outNode: Node, side: Side) {
		const type = pattern.type;
		if (type !== enumPatternType.from && type !== enumPatternType.from_exists && type !== enumPatternType.from_not) {
			const constraints = pattern.constraints;
			const typeNode = this.__createTypeNode(rule, constraints[0]);
			const aliasNode = this.__createAliasNode(rule, pattern);
			typeNode.addOutNode(aliasNode, pattern);
			aliasNode.addParentNode(typeNode);
			let parentNode = aliasNode as Node;
			constraints.filter((constraint, idx) => {
				return idx > 0;
			}).forEach((constraint) => {
				let node: Node;
				if (constraint instanceof HashConstraint) {
					node = this.__createPropertyNode(rule, constraint);
				} else if (constraint instanceof ReferenceConstraint) {
					(outNode as JoinNode).constraint.addConstraint(constraint as any as ReferenceConstraint);	// todo: wrong type
					return;
				} else {
					node = this.__createEqualityNode(rule, constraint as ObjectConstraint);
				}
				parentNode.addOutNode(node, pattern);
				node.addParentNode(parentNode);
				parentNode = node;
			});

			if (outNode instanceof BetaNode) {
				const adapterNode = this.__createAdapterNode(rule, side);
				adapterNode.addParentNode(parentNode);
				parentNode.addOutNode(adapterNode, pattern);
				parentNode = adapterNode;
			}
			outNode.addParentNode(parentNode);
			parentNode.addOutNode(outNode, pattern);
			return typeNode;
		}
	}

	print() {
		this.terminalNodes.forEach((t) => {
			t.print("    ");
		});
	}
}
