import { IPattern, IObjectPattern, IFromPattern, ICompositePattern, composite_pattern, initial_fact_pattern } from '../pattern';
import WorkingMemory from '../working-memory';
import AgendaTree from '../agenda';
import Fact from '../facts/fact';
import { IRule } from '../rule';

import { IConstraint, IObjectConstraint, IHashConstraint, IReferenceConstraint, is_instance_of_reference_constraint, is_instance_of_hash } from '../constraint';

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

function hasRefernceConstraints(pattern: IObjectPattern) {
	return (pattern.constraints || []).some((c) => {
		return is_instance_of_reference_constraint(c);
	});
}

export type Side = 'left' | 'right';

export interface IBucket {
	counter: number;
	recency: number;
}

export interface IRootNode {
	nodes: Node[];
	terminalNodes: number[];
	joinNodes: number[];
	constraints: number[];
	typeNodes: number[];
	__ruleCount: number;
	bucket: IBucket;
	workingMemory: WorkingMemory;
	agendaTree: AgendaTree;
}

export function create_root_node(wm: WorkingMemory, agendaTree: AgendaTree): IRootNode {
	return {
		nodes: [],
		terminalNodes: [],
		joinNodes: [],
		constraints: [],
		typeNodes: [],
		__ruleCount: 0,
		bucket: {
			counter: 0,
			recency: 0
		},
		workingMemory: wm,	// todo: need to be removed
		agendaTree: agendaTree	// todo: need to be removed
	};
}

export function assertRule(root: IRootNode, rule: IRule) {
	const terminalNode = new TerminalNode(root.bucket, root.__ruleCount++, rule, root.agendaTree);
	__addToNetwork(root, rule, rule.pattern, terminalNode);
	__mergeJoinNodes(root);
	root.terminalNodes.push(root.nodes.push(terminalNode) - 1);
}

export function assertFact(root: IRootNode, fact: Fact) {
	root.typeNodes.forEach((id) => {
		const typeNode = root.nodes[id];
		typeNode.assert(fact);
	});
}


export function retractFact(root: IRootNode, fact: Fact) {
	root.typeNodes.forEach((id) => {
		const typeNode = root.nodes[id];
		typeNode.retract(fact);
	});
}

export function modifyFact(root: IRootNode, fact: Fact) {
	root.typeNodes.forEach((id) => {
		const typeNode = root.nodes[id];
		typeNode.modify(fact);
	});
}

export function dispose(root: IRootNode) {
	root.typeNodes.forEach((id) => {
		const typeNode = root.nodes[id] as TypeNode;
		typeNode.dispose();
	})
}

export function containsRule(root: IRootNode, name: string) {
	return root.terminalNodes.some((id) => {
		const terminalNode = root.nodes[id] as TerminalNode;
		return terminalNode.rule.name === name;
	});
}

function __mergeJoinNodes(root: IRootNode) {
	const joinNodes = root.joinNodes;
	const nodes = root.nodes;
	for (let i = 0; i < joinNodes.length; i++) {
		const j1 = nodes[joinNodes[i]] as JoinNode;
		const j2 = nodes[joinNodes[i + 1]] as JoinNode;
		if (j1 && j2 && (j1.constraint && j2.constraint && j1.constraint.equal(j2.constraint))) {
			j1.merge(j2);
			joinNodes.splice(i + 1, 1);
		}
	}
}

function __checkEqual<T extends AlphaNode>(root: IRootNode, node: T): T {
	const constraints = root.constraints;
	let index = -1;

	if (constraints.some((id) => {
		const constraint = root.nodes[id] as AlphaNode;
		const r = node.equal(constraint);
		r && (index = id);
		return r;
	})) {
		return root.nodes[index] as T;
	} else {
		constraints.push(root.nodes.push(node) - 1);
		return node;
	}
}

function __createTypeNode(root: IRootNode, rule: IRule, constraint: IConstraint) {
	const ret = new TypeNode(constraint);
	const typeNodes = root.typeNodes;
	let index = -1;
	if (typeNodes.some((id) => {
		const typeNode = root.nodes[id] as AlphaNode;
		const r = ret.equal(typeNode);
		r && (index = id);
		return r;
	})) {
		return root.nodes[index] as TypeNode;
	} else {
		typeNodes.push(root.nodes.push(ret) - 1);
		return ret;
	}
}

function __createEqualityNode(root: IRootNode, rule: IRule, constraint: IObjectConstraint) {
	return __checkEqual(root, new EqualityNode(constraint)).addRule(rule);
}

function __createPropertyNode(root: IRootNode, rule: IRule, constraint: IHashConstraint) {
	return __checkEqual(root, new PropertyNode(constraint)).addRule(rule);
}

function __createAliasNode(root: IRootNode, rule: IRule, pattern: IObjectPattern) {
	// return __checkEqual(new AliasNode(pattern)).addRule(rule);
	return __checkEqual(root, new AliasNode(pattern)).addRule(rule);
}

function __createAdapterNode(root: IRootNode, rule: IRule, side: Side = 'right') {
	return (side === "left" ? new LeftAdapterNode() : new RightAdapterNode()).addRule(rule);
}

function __createJoinNode(root: IRootNode, rule: IRule, pattern: ICompositePattern, outNode: Node, side: Side) {
	let joinNode: Node;
	const right_type = pattern.rightPattern.type;
	if (right_type === 'not') {
		joinNode = new NotNode();
	} else if (right_type === 'from_exists') {
		joinNode = new ExistsFromNode(pattern.rightPattern as IFromPattern, root.workingMemory);
	} else if (right_type === 'exists') {
		joinNode = new ExistsNode();
	} else if (right_type === 'from_not') {
		joinNode = new FromNotNode(pattern.rightPattern as IFromPattern, root.workingMemory);
	} else if (right_type === 'from') {
		joinNode = new FromNode(pattern.rightPattern as IFromPattern, root.workingMemory);
	} else if (pattern.type === 'composite' && !hasRefernceConstraints(pattern.leftPattern as IObjectPattern) && !hasRefernceConstraints(pattern.rightPattern as IObjectPattern)) {
		const bn = joinNode = new BetaNode();
		root.joinNodes.push(root.nodes.push(bn) - 1);
	} else {
		const jn = joinNode = new JoinNode();
		root.joinNodes.push(root.nodes.push(jn) - 1);
	}
	let parentNode = joinNode;
	if (outNode instanceof BetaNode) {
		const adapterNode = __createAdapterNode(root, rule, side);
		parentNode.addOutNode(adapterNode, pattern as any);	// todo:: type of pattern should be 'ObjectPattern'
		parentNode = adapterNode;
	}
	parentNode.addOutNode(outNode, pattern as any);
	return joinNode.addRule(rule);
}

function __addToNetwork(root: IRootNode, rule: IRule, pattern: IPattern, outNode: Node, side: Side = 'left') {
	const type = pattern.type;
	if (type === 'composite') {
		__createBetaNode(root, rule, pattern as ICompositePattern, outNode, side);
	} else if (type !== 'initial_fact' && side === 'left') {
		__createBetaNode(root, rule, composite_pattern(initial_fact_pattern(), pattern), outNode, side);
	} else {
		__createAlphaNode(root, rule, pattern as IObjectPattern, outNode, side);
	}
}

function __createBetaNode(root: IRootNode, rule: IRule, pattern: ICompositePattern, outNode: Node, side: Side) {
	const joinNode = __createJoinNode(root, rule, pattern, outNode, side);
	__addToNetwork(root, rule, pattern.rightPattern, joinNode, "right");
	__addToNetwork(root, rule, pattern.leftPattern, joinNode, "left");
	outNode.addParentNode(joinNode);
	return joinNode;
}


function __createAlphaNode(root: IRootNode, rule: IRule, pattern: IObjectPattern, outNode: Node, side: Side) {
	const type = pattern.type;
	if (type !== 'from' && type !== 'from_exists' && type !== 'from_not') {
		const constraints = pattern.constraints;
		const typeNode = __createTypeNode(root, rule, constraints[0]);
		const aliasNode = __createAliasNode(root, rule, pattern);
		typeNode.addOutNode(aliasNode, pattern);
		aliasNode.addParentNode(typeNode);
		let parentNode = aliasNode as Node;
		constraints.filter((constraint, idx) => {
			return idx > 0;
		}).forEach((constraint) => {
			let node: Node;
			if (is_instance_of_hash(constraint)) {
				node = __createPropertyNode(root, rule, constraint);
			} else if (is_instance_of_reference_constraint(constraint)) {
				(outNode as JoinNode).constraint.addConstraint(constraint as IReferenceConstraint);
				return;
			} else {
				node = __createEqualityNode(root, rule, constraint as IObjectConstraint);
			}
			parentNode.addOutNode(node, pattern);
			node.addParentNode(parentNode);
			parentNode = node;
		});

		if (outNode instanceof BetaNode) {
			const adapterNode = __createAdapterNode(root, rule, side);
			adapterNode.addParentNode(parentNode);
			parentNode.addOutNode(adapterNode, pattern);
			parentNode = adapterNode;
		}
		outNode.addParentNode(parentNode);
		parentNode.addOutNode(outNode, pattern);
		return typeNode;
	}
}

export function print(root: IRootNode) {
	root.terminalNodes.forEach((t) => {
		root.nodes[t].print("    ");
	});
}

