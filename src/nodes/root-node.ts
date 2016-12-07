import { IPattern, IObjectPattern, IFromPattern, ICompositePattern, composite_pattern, initial_fact_pattern } from '../pattern';
import WorkingMemory from '../working-memory';
import AgendaTree from '../agenda';
import Fact from '../facts/fact';
import { IRule } from '../runtime/rule';

import { IConstraint, IObjectConstraint, IHashConstraint, IReferenceConstraint, is_instance_of_reference_constraint, is_instance_of_hash } from '../constraint';

import { INode, IAlphaNode, ITypeNode, ITerminalNode, IJoinNode, IRootNode} from '../nodes';
import { addRule, addOutNode, addParentNode, is_instance_of_beta_node, merge, base_assert, base_modify, base_dispose as node_dispose, base_retract } from './node';
import { create as create_type_node } from './type-node';
import { create as create_terminal_node } from './terminal-node';
import { create as create_join_node } from './join-node';
import { create as create_alias_node } from './alias-node';
import { create as create_adapter_node } from './adapter-node';
import { create as create_not_node } from './not-node';
import { create as create_exists_node } from './exists-node';
import { create as create_beta_node } from './beta-node';
import { create as create_from_node } from './from-node';
import { create as create_from_not_node } from './from-not-node';
import { create as create_exists_from_node } from './exists-from-node';
import { create as create_equality_node } from './equality-node';
import { create as create_property_node } from './property-node';
import { addConstraint } from './join-reference-node';

function hasRefernceConstraints(pattern: IObjectPattern) {
	return (pattern.constraints || []).some((c) => {
		return is_instance_of_reference_constraint(c);
	});
}

export type Side = 'left' | 'right';

export function create_root_node(): IRootNode {
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
		}
	};
}

export function assertRule(root: IRootNode, rule: IRule, agenda: AgendaTree) {
	const terminalNode = create_terminal_node(rule.name, rule, root.__ruleCount++, root.bucket, agenda);
	agenda.register(terminalNode);
	const tn = root.nodes.push(terminalNode) - 1;
	__addToNetwork(root, rule, rule.pattern, tn);
	__mergeJoinNodes(root);
	root.terminalNodes.push(tn);
}

export function assertFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_assert(root.nodes, typeNode, fact, wm);
	});
}

export function retractFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_retract(root.nodes, typeNode, fact, wm);
	});
}

export function modifyFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_modify(root.nodes, typeNode, fact, wm);
	});
}

export function dispose(root: IRootNode) {
	root.typeNodes.forEach((typeNode) => {
		node_dispose(root.nodes, typeNode, undefined);
	})
}

export function containsRule(root: IRootNode, name: string) {
	return root.terminalNodes.some((id) => {
		const terminalNode = root.nodes[id] as ITerminalNode;
		return terminalNode.rule.name === name;
	});
}

function __mergeJoinNodes(root: IRootNode) {
	const joinNodes = root.joinNodes;
	const nodes = root.nodes;
	for (let i = 0; i < joinNodes.length; i++) {
		const jj1 = joinNodes[i];
		const jj2 = joinNodes[i + 1];
		const j1 = nodes[jj1] as IJoinNode;
		const j2 = nodes[jj2] as IJoinNode;
		if (j1 && j2 && (j1.constraint && j2.constraint && j1.constraint.constraint.equal(j2.constraint.constraint))) {
			merge(jj1, jj2, nodes);
			joinNodes.splice(i + 1, 1);
		}
	}
}

function __checkEqual<T extends IAlphaNode>(root: IRootNode, node: T) {
	const constraints = root.constraints;
	let index = -1;

	if (constraints.some((id) => {
		const n = root.nodes[id] as IAlphaNode;
		const r = node.equal(n);
		r && (index = id);
		return r;
	})) {
		return index;
	} else {
		index = root.nodes.push(node) - 1;
		constraints.push(index);
		return index;
	}
}

function __createTypeNode(root: IRootNode, rule: IRule, constraint: IConstraint) {
	const typenode = create_type_node(constraint);
	const typeNodes = root.typeNodes;
	let index = -1;
	if (typeNodes.some((id) => {
		const typeNode = root.nodes[id] as IAlphaNode;
		const r = typenode.constraint.equal(typeNode.constraint);
		r && (index = id);
		return r;
	})) {
		return index;
	} else {
		index = root.nodes.push(typenode) - 1;
		typeNodes.push(index);
		return index;
	}
}

function __createEqualityNode(root: IRootNode, rule: IRule, constraint: IObjectConstraint) {
	return addRule(__checkEqual(root, create_equality_node(constraint)), rule, root.nodes);
}

function __createPropertyNode(root: IRootNode, rule: IRule, constraint: IHashConstraint) {
	return addRule(__checkEqual(root, create_property_node(constraint)), rule, root.nodes);
}

function __createAliasNode(root: IRootNode, rule: IRule, pattern: IObjectPattern) {
	// return __checkEqual(new AliasNode(pattern)).addRule(rule);
	return addRule(__checkEqual(root, create_alias_node(pattern)), rule, root.nodes);
}

function __createAdapterNode(root: IRootNode, rule: IRule, side: Side = 'right') {
	const node = create_adapter_node(side === "left");
	return addRule(root.nodes.push(node) - 1, rule, root.nodes);
}

function __createJoinNode(root: IRootNode, rule: IRule, pattern: ICompositePattern, out_node: number, side: Side) {
	let joinNode: INode;
	let jn = -1;
	const nodes = root.nodes;
	const right_type = pattern.rightPattern.type;
	if (right_type === 'not') {
		joinNode = create_not_node();
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === 'from_exists') {
		joinNode = create_exists_from_node(pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === 'exists') {
		joinNode = create_exists_node();
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === 'from_not') {
		joinNode = create_from_not_node(pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === 'from') {
		joinNode = create_from_node(pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (pattern.type === 'composite' && !hasRefernceConstraints(pattern.leftPattern as IObjectPattern) && !hasRefernceConstraints(pattern.rightPattern as IObjectPattern)) {
		const bn = joinNode = create_beta_node();
		jn = nodes.push(bn) - 1;
		root.joinNodes.push(jn);
	} else {
		joinNode = create_join_node();
		jn = nodes.push(joinNode) - 1;
		root.joinNodes.push(jn);
	}
	let parentNode = joinNode;
	if (is_instance_of_beta_node(nodes[out_node])) {
		const an = __createAdapterNode(root, rule, side);
		addOutNode(parentNode, an, pattern as any);	// todo:: type of pattern should be 'ObjectPattern'
		parentNode = nodes[an];
	}
	addOutNode(parentNode, out_node, pattern as any);
	addRule(jn, rule, nodes);
	return jn;
}

function __addToNetwork(root: IRootNode, rule: IRule, pattern: IPattern, outNode: number, side: Side = 'left') {
	const type = pattern.type;
	if (type === 'composite') {
		__createBetaNode(root, rule, pattern as ICompositePattern, outNode, side);
	} else if (type !== 'initial_fact' && side === 'left') {
		__createBetaNode(root, rule, composite_pattern(initial_fact_pattern(), pattern), outNode, side);
	} else {
		__createAlphaNode(root, rule, pattern as IObjectPattern, outNode, side);
	}
}

function __createBetaNode(root: IRootNode, rule: IRule, pattern: ICompositePattern, out_node: number, side: Side) {
	const nodes = root.nodes;
	const outNode = nodes[out_node];
	const joinNode = __createJoinNode(root, rule, pattern, out_node, side);
	__addToNetwork(root, rule, pattern.rightPattern, joinNode, "right");
	__addToNetwork(root, rule, pattern.leftPattern, joinNode, "left");
	addParentNode(outNode, joinNode);
	return joinNode;
}


function __createAlphaNode(root: IRootNode, rule: IRule, pattern: IObjectPattern, out_node: number, side: Side) {
	const type = pattern.type;
	if (type !== 'from' && type !== 'from_exists' && type !== 'from_not') {
		const nodes = root.nodes;
		const outNode = nodes[out_node];
		const constraints = pattern.constraints;
		const tn = __createTypeNode(root, rule, constraints[0]);
		const typeNode = nodes[tn];
		const an = __createAliasNode(root, rule, pattern);
		addOutNode(typeNode, an, pattern);
		addParentNode(nodes[an], tn);
		let parentNode = an;
		constraints.filter((constraint, idx) => {
			return idx > 0;
		}).forEach((constraint) => {
			let n = -1;
			if (is_instance_of_hash(constraint)) {
				n = __createPropertyNode(root, rule, constraint);
			} else if (is_instance_of_reference_constraint(constraint)) {
				addConstraint((outNode as IJoinNode).constraint, constraint as IReferenceConstraint);
				return;
			} else {
				n = __createEqualityNode(root, rule, constraint as IObjectConstraint);
			}
			const node = nodes[n];
			addOutNode(nodes[parentNode], n, pattern);
			addParentNode(node, parentNode);
			parentNode = n;
		});

		if (is_instance_of_beta_node(outNode)) {
			const an = __createAdapterNode(root, rule, side);
			addParentNode(nodes[an], parentNode);
			addOutNode(nodes[parentNode], an, pattern);
			parentNode = an;
		}
		addParentNode(outNode, parentNode);
		addOutNode(nodes[parentNode], out_node, pattern);
	}
}
