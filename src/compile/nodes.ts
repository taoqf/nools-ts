import mixin from 'lodash-ts/mixin';
import { IRule } from '../interfaces';
import { INode, IRootNode, ITerminalNode, IBucket, nodeType, IJoinNode, IAlphaNode, alphaNodeType, betaNodeType, ITypeNode, IEqualityNode, IPropertyNode, IAliasNode, IAdapterNode, IBetaNode, joinNodeType, notNodeType, INotNode, IExistsNode, IFromNode, IFromNotNode, IExistsFromNode } from '../nodes';
import AgendaTree from '../agenda';
import { IPattern, IObjectPattern, ICompositePattern, IFromPattern, composite_pattern, initial_fact_pattern } from '../pattern';
import { is_instance_of_reference_constraint, IConstraint, IObjectConstraint, IHashConstraint, IReferenceConstraint, is_instance_of_hash, is_instance_of_equality } from '../constraint';
import LeftMemory from '../nodes/misc/left-memory';
import RightMemory from '../nodes/misc/right-memory';
import Context from '../context';
import Fact from '../facts/fact';
import InitialFact from '../facts/initial';
import { addConstraint, create_join_reference_node } from '../nodes/join-reference-node';

export default function create_root_node(): IRootNode {
	return {
		nodes: [],
		terminalNodes: [],
		joinNodes: [],
		constraints: [],
		typeNodes: [],
		bucket: {
			counter: 0,
			recency: 0
		}
	};
}

type Side = 'left' | 'right';

let id = 0;

export function create_node(type: nodeType): INode {
	return {
		type: type,
		out_nodes: [],
		__id: id++,
		parentNodes: []
	};
}

function create_terminal_node(rules: IRule[], index: number, bucket: IBucket): ITerminalNode {
	const rule = rules[index];
	const node = mixin(create_node('terminal'), {
		index: index,
		rule: rule,
		name: rule.name,
		bucket: bucket
	});
	return node;
}

export function build(rules: IRule[]) {
	const root = create_root_node();
	rules.forEach((rule, idx) => {
		const terminalNode = create_terminal_node(rules, idx, root.bucket);
		const tn = root.nodes.push(terminalNode) - 1;
		__addToNetwork(root, idx, rule.pattern, tn);
		__mergeJoinNodes(root);
		root.terminalNodes.push(tn);
	});
	return root;
}

function hasRefernceConstraints(pattern: IObjectPattern) {
	return (pattern.constraints || []).some((c) => {
		return is_instance_of_reference_constraint(c);
	});
}

function addOutNode(node: INode, outNode: number, pattern: IObjectPattern) {
	const nodes = node.out_nodes;
	nodes.push([outNode, pattern]);
}

function addParentNode(node: INode, n: number) {
	const parentNodes = node.parentNodes;
	if (parentNodes.indexOf(n) === -1) {
		parentNodes.push(n);
	}
}

function merge(node1: number, node2: number, nodes: INode[]) {
	const n1 = nodes[node1];
	const n2 = nodes[node2];
	for (const [node, patterns] of n2.nodes.entries()) {
		patterns.forEach((pattern) => {
			addOutNode(n1, node, pattern);
		});
		n2.nodes.delete(node);
	}
	n2.parentNodes.forEach((parentNode) => {
		addParentNode(n1, parentNode);
		nodes[parentNode].nodes.delete(node2);
	});
	return n1;
}

function is_instance_of_beta_node(node: INode) {
	switch (node.type) {
		case 'not':
		case 'exists':
		case 'join':
		case 'from':
		case 'from-not':
		case 'exists-from':
		case 'beta':
			return true;
		default:
			return false;
	}
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

function create_alpha(type: alphaNodeType, constraint: IConstraint): IAlphaNode {
	return mixin(create_node(type), {
		constraint: constraint,
		constraintAssert: constraint.assert,
		equal(other: IAlphaNode) {
			return constraint.equal(other.constraint);
		}
	});
}

function __createTypeNode(root: IRootNode, constraint: IConstraint) {
	const typenode = create_alpha('type', constraint) as ITypeNode;
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

function create_equality_node(constraint: IConstraint): IEqualityNode {
	return mixin(create_alpha('equality', constraint), {
		memory: new Map<string, boolean>()
	});
}

function __createEqualityNode(root: IRootNode, rule: number, constraint: IObjectConstraint) {
	return __checkEqual(root, create_equality_node(constraint));
}

function create_property_node(constraint: IConstraint): IPropertyNode {
	return mixin(create_alpha('property', constraint), {
		alias: constraint.alias,
		constiables: constraint.constraint
	})
}

function __createPropertyNode(root: IRootNode, rule: number, constraint: IHashConstraint) {
	return __checkEqual(root, create_property_node(constraint));
}

function create_alias_node(pattern: IObjectPattern): IAliasNode {
	const alias = pattern.alias;
	return mixin(create_alpha('alias', pattern as any), {
		alias: alias,
		equal(other: IAliasNode) {
			return other.type == 'alias' && alias === other.alias;
		}
	});
}

function __createAliasNode(root: IRootNode, rule: number, pattern: IObjectPattern) {
	// return __checkEqual(new AliasNode(pattern)).addRule(rule);
	return __checkEqual(root, create_alias_node(pattern));
}

function create_adapter_node(left: boolean): IAdapterNode {
	return create_node(left ? 'leftadapter' : 'rightadapter');
}

function __createAdapterNode(root: IRootNode, rule: number, side: Side = 'right') {
	const node = create_adapter_node(side === "left");
	return root.nodes.push(node) - 1;
}

function _create_beta_node(type: betaNodeType): IBetaNode {
	return mixin(create_node(type), {
		leftMemory: {},
		rightMemory: {},
		leftTuples: new LeftMemory(),
		rightTuples: new RightMemory()
	});
}

function create_beta_node(): IBetaNode {
	return _create_beta_node('beta');
}

function _create_join_node(type: joinNodeType): IJoinNode {
	const node = _create_beta_node(type);
	const constraint = create_join_reference_node(node.leftTuples, node.rightTuples);
	return mixin(node, {
		constraint: constraint
	});
}

function create_join_node(): IJoinNode {
	return _create_join_node('join');
}

function _create_not_node(type: notNodeType): INotNode {
	return mixin(_create_join_node(type), {
		leftTupleMemory: {},
		notMatch: new Context(new InitialFact()).match
	});
}

function create_not_node(): INotNode {
	return _create_not_node('not');
}

function create_exists_node(): IExistsNode {
	return _create_not_node('exists');
}

function _create_from_node(type: joinNodeType, pattern: IFromPattern): IFromNode {
	const type_constraint = pattern.constraints[0];
	const from = pattern.from;
	const constraints = pattern.constraints.slice(1);
	let vars: any[] = [];
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	constraints.forEach((c) => {
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push((factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) => {
				return c.assert(factHanle1, factHandle2);
			});
		} else if (is_instance_of_hash(c)) {
			// todo: need debug
			debugger;
			vars = vars.concat(c.constraint);
		}
	});
	return mixin(_create_join_node(type), {
		pattern: pattern,
		alias: pattern.alias,
		constraints: constraints,
		__equalityConstraints: eqConstraints,
		__variables: vars,
		fromMemory: {},
		type_assert(type: any) {
			return type_constraint.assert(type);
		},
		from_assert(fact: any, fh?: any) {
			return from.assert(fact, fh);
		}
	});
}

function create_from_node(pattern: IFromPattern): IFromNode {
	return _create_from_node('from', pattern);
}

function _create_from_not_node(type: joinNodeType, pattern: IFromPattern): IFromNotNode {
	const type_constraint = pattern.constraints[0];
	const from = pattern.from;
	const constraints = pattern.constraints.slice(1);
	let vars: any[] = [];
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	constraints.forEach((c) => {
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push(c.assert);
		} else if (is_instance_of_hash(c)) {
			debugger;
			vars = vars.concat(c.constraint);
		}
	});
	return mixin(_create_join_node(type), {
		pattern: pattern,
		alias: pattern.alias,
		constraints: constraints,
		__equalityConstraints: eqConstraints,
		__variables: vars,
		fromMemory: {},
		type_assert(type: any) {
			return type_constraint.assert(type);
		},
		from_assert(fact: any, fh?: any) {
			return from.assert(fact, fh);
		}
	});
}

function create_from_not_node(pattern: IFromPattern): IFromNotNode {
	return _create_from_not_node('from-not', pattern);
}

function create_exists_from_node(pattern: IFromPattern): IExistsFromNode {
	return _create_from_not_node('exists-from', pattern);
}

function __createJoinNode(root: IRootNode, rule: number, pattern: ICompositePattern, out_node: number, side: Side) {
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
	return jn;
}

function __addToNetwork(root: IRootNode, rule: number, pattern: IPattern, outNode: number, side: Side = 'left') {
	const type = pattern.type;
	if (type === 'composite') {
		__createBetaNode(root, rule, pattern as ICompositePattern, outNode, side);
	} else if (type !== 'initial_fact' && side === 'left') {
		__createBetaNode(root, rule, composite_pattern(initial_fact_pattern(), pattern), outNode, side);
	} else {
		__createAlphaNode(root, rule, pattern as IObjectPattern, outNode, side);
	}
}

function __createBetaNode(root: IRootNode, rule: number, pattern: ICompositePattern, out_node: number, side: Side) {
	const nodes = root.nodes;
	const outNode = nodes[out_node];
	const joinNode = __createJoinNode(root, rule, pattern, out_node, side);
	__addToNetwork(root, rule, pattern.rightPattern, joinNode, "right");
	__addToNetwork(root, rule, pattern.leftPattern, joinNode, "left");
	addParentNode(outNode, joinNode);
	return joinNode;
}


function __createAlphaNode(root: IRootNode, rule: number, pattern: IObjectPattern, out_node: number, side: Side) {
	const type = pattern.type;
	if (type !== 'from' && type !== 'from_exists' && type !== 'from_not') {
		const nodes = root.nodes;
		const outNode = nodes[out_node];
		const constraints = pattern.constraints;
		const tn = __createTypeNode(root, constraints[0]);
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
