import mixin from 'lodash-ts/mixin';
import { IRule } from '../interfaces';
import { INode, IRootNode, ITerminalNode, IBucket, nodeType, IJoinNode, IAlphaNode, ITypeNode, IEqualityNode, IPropertyNode, IAliasNode, IAdapterNode, IBetaNode, INotNode, IExistsNode, IFromNode, IFromNotNode, IExistsFromNode } from '../nodes';
import AgendaTree from '../agenda';
import { IPattern, IObjectPattern, ICompositePattern, IFromPattern, composite_pattern, initial_fact_pattern, patternType } from '../pattern';
import { is_instance_of_reference_constraint, IConstraint, IObjectConstraint, IHashConstraint, IReferenceConstraint, is_instance_of_hash, is_instance_of_equality } from '../constraint';
import Memory, { IMemory } from '../nodes/misc/memory';
import Context from '../context';
import Fact from '../facts/fact';
import InitialFact from '../facts/initial';
import { addConstraint, create_join_reference_node } from '../nodes/join-reference-node';
import cst from './constraint';
import pt from './pattern';

function create_root_node(): IRootNode {
	return {
		ns: [],
		ps: [],
		ts: [],
		js: [],
		as: [],
		tps: [],
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
		tp: type,
		ns: [],
		id: id++,
		ps: []
	};
}

function create_terminal_node(rules: IRule[], index: number, bucket: IBucket): ITerminalNode {
	const rule = rules[index];
	const node = mixin(create_node(nodeType.terminal), {
		i: index,
		r: rule,
		n: rule.n,
		b: bucket
	});
	return node;
}

function build_nodes(rules: IRule[]) {
	const root = create_root_node();
	rules.forEach((rule, idx) => {
		const terminalNode = create_terminal_node(rules, idx, root.bucket);
		const tn = root.ns.push(terminalNode) - 1;
		__addToNetwork(root, idx, rule.pt, tn);
		__mergeJoinNodes(root);
		root.ts.push(tn);
	});
	return root;
}

function hasRefernceConstraints(pattern: IObjectPattern) {
	return (pattern.constraints || []).some((c) => {
		return is_instance_of_reference_constraint(c);
	});
}

function addOutNode(node: INode, outNode: number, pattern: number) {
	node.ns.push([outNode, pattern]);
}

function addParentNode(node: INode, n: number) {
	const parentNodes = node.ps;
	if (parentNodes.indexOf(n) === -1) {
		parentNodes.push(n);
	}
}

function merge(node1: number, node2: number, nodes: INode[]) {
	const n1 = nodes[node1];
	const n2 = nodes[node2];
	for (const [idx, [node, pattern]] of n2.ns.entries()) {
	}
	n2.ns.forEach(([n, p]) => {
		addOutNode(n1, n, p);
	});
	n2.ns = [];
	n2.ps.forEach((parentNode) => {
		addParentNode(n1, parentNode);
		nodes[parentNode].ns = nodes[parentNode].ns.filter(([n, p]) => {
			return n != node2;
		});
	});
	return n1;
}

function is_instance_of_beta_node(node: INode) {
	switch (node.tp) {
		case nodeType.not:
		case nodeType.exists:
		case nodeType.join:
		case nodeType.from:
		case nodeType.from_not:
		case nodeType.exists_from:
		case nodeType.beta:
			return true;
		default:
			return false;
	}
}

function __mergeJoinNodes(root: IRootNode) {
	const joinNodes = root.js;
	const nodes = root.ns;
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
	const constraints = root.as;
	let index = -1;

	if (constraints.some((id) => {
		const n = root.ns[id] as IAlphaNode;
		const r = node.eq(n);
		r && (index = id);
		return r;
	})) {
		return index;
	} else {
		index = root.ns.push(node) - 1;
		constraints.push(index);
		return index;
	}
}

function create_alpha(type: nodeType, constraint: IConstraint): IAlphaNode {
	return mixin(create_node(type), {
		constraint: constraint,
		ca: constraint.assert,
		eq(other: IAlphaNode) {
			return constraint.equal(other.constraint);
		}
	});
}

function __createTypeNode(root: IRootNode, constraint: IConstraint) {
	const typenode = create_alpha(nodeType.type, constraint) as ITypeNode;
	const typeNodes = root.tps;
	let index = -1;
	if (typeNodes.some((id) => {
		const typeNode = root.ns[id] as IAlphaNode;
		const r = typenode.constraint.equal(typeNode.constraint);
		r && (index = id);
		return r;
	})) {
		return index;
	} else {
		index = root.ns.push(typenode) - 1;
		typeNodes.push(index);
		return index;
	}
}

function create_equality_node(constraint: IConstraint): IEqualityNode {
	return mixin(create_alpha(nodeType.equality, constraint), {
		memory: new Map<string, boolean>()
	});
}

function __createEqualityNode(root: IRootNode, rule: number, constraint: IObjectConstraint) {
	return __checkEqual(root, create_equality_node(constraint));
}

function create_property_node(constraint: IHashConstraint): IPropertyNode {
	return mixin(create_alpha(nodeType.property, constraint), {
		alias: constraint.a,
		constiables: constraint.constraint
	});
}

function __createPropertyNode(root: IRootNode, rule: number, constraint: IHashConstraint) {
	return __checkEqual(root, create_property_node(constraint));
}

function create_alias_node(root: IRootNode, p: number): IAliasNode {
	const pattern = root.ps[p] as IObjectPattern;
	const alias = pattern.a;
	return mixin(create_node(nodeType.alias), {
		alias: alias,
		constraint: pattern,
		p: p,
		eq(other: IAliasNode) {
			return other.tp == nodeType.alias && alias === other.alias;
		}
	});
}

function __createAliasNode(root: IRootNode, rule: number, pattern: number) {
	// return __checkEqual(new AliasNode(pattern)).addRule(rule);
	return __checkEqual(root, create_alias_node(root, pattern) as any);
}

function create_adapter_node(left: boolean): IAdapterNode {
	return create_node(left ? nodeType.leftadapter : nodeType.rightadapter);
}

function __createAdapterNode(root: IRootNode, rule: number, side: Side = 'right') {
	const node = create_adapter_node(side === "left");
	return root.ns.push(node) - 1;
}

function _create_beta_node(type: nodeType): IBetaNode {
	return mixin(create_node(type), {
		leftMemory: {},
		rightMemory: {},
		leftTuples: Memory(),
		rightTuples: Memory()
	});
}

function create_beta_node(): IBetaNode {
	return _create_beta_node(nodeType.beta);
}

function _create_join_node(type: nodeType): IJoinNode {
	const node = _create_beta_node(type);
	const constraint = create_join_reference_node(node.leftTuples, node.rightTuples);
	return mixin(node, {
		constraint: constraint
	});
}

function create_join_node(): IJoinNode {
	return _create_join_node(nodeType.join);
}

function _create_not_node(type: nodeType): INotNode {
	return mixin(_create_join_node(type), {
		leftTupleMemory: {},
		notMatch: new Context(new InitialFact()).match
	});
}

function create_not_node(): INotNode {
	return _create_not_node(nodeType.not);
}

function create_exists_node(): IExistsNode {
	return _create_not_node(nodeType.exists);
}

function _create_from_node(root: IRootNode, type: nodeType, pattern: IFromPattern): IFromNode {
	const p = root.ps.push(pattern) - 1;
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
			vars = vars.concat((c as IHashConstraint).constraint);
		}
	});
	return mixin(_create_join_node(type), {
		pattern: pattern,
		p: p,
		alias: pattern.a,
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

function create_from_node(root: IRootNode, pattern: IFromPattern): IFromNode {
	return _create_from_node(root, nodeType.from, pattern);
}

function _create_from_not_node(root: IRootNode, type: nodeType, pattern: IFromPattern): IFromNotNode {
	const p = root.ps.push(pattern) - 1;
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
			vars = vars.concat((c as IHashConstraint).constraint);
		}
	});
	return mixin(_create_join_node(type), {
		pattern: pattern,
		p: p,
		alias: pattern.a,
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

function create_from_not_node(root: IRootNode, pattern: IFromPattern): IFromNotNode {
	return _create_from_not_node(root, nodeType.from_not, pattern);
}

function create_exists_from_node(root: IRootNode, pattern: IFromPattern): IExistsFromNode {
	return _create_from_not_node(root, nodeType.exists_from, pattern);
}

function __createJoinNode(root: IRootNode, rule: number, pattern: ICompositePattern, out_node: number, side: Side) {
	// const p = root.patterns.push(pattern) - 1;
	let joinNode: INode;
	let jn = -1;
	const nodes = root.ns;
	const right_type = pattern.rightPattern.tp;
	if (right_type === patternType.not) {
		joinNode = create_not_node();
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === patternType.from_exists) {
		joinNode = create_exists_from_node(root, pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === patternType.exists) {
		joinNode = create_exists_node();
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === patternType.from_not) {
		joinNode = create_from_not_node(root, pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (right_type === patternType.from) {
		joinNode = create_from_node(root, pattern.rightPattern as IFromPattern);
		jn = nodes.push(joinNode) - 1;
	} else if (pattern.tp === patternType.composite && !hasRefernceConstraints(pattern.leftPattern as IObjectPattern) && !hasRefernceConstraints(pattern.rightPattern as IObjectPattern)) {
		const bn = joinNode = create_beta_node();
		jn = nodes.push(bn) - 1;
		root.js.push(jn);
	} else {
		joinNode = create_join_node();
		jn = nodes.push(joinNode) - 1;
		root.js.push(jn);
	}
	let parentNode = joinNode;
	if (is_instance_of_beta_node(nodes[out_node])) {
		const an = __createAdapterNode(root, rule, side);
		addOutNode(parentNode, an, -1);
		parentNode = nodes[an];
	}
	addOutNode(parentNode, out_node, -1);
	return jn;
}

function __addToNetwork(root: IRootNode, rule: number, pattern: IPattern, outNode: number, side: Side = 'left') {
	const type = pattern.tp;
	if (type === patternType.composite) {
		__createBetaNode(root, rule, pattern as ICompositePattern, outNode, side);
	} else if (type !== patternType.initial_fact && side === 'left') {
		__createBetaNode(root, rule, composite_pattern(initial_fact_pattern(), pattern), outNode, side);
	} else {
		__createAlphaNode(root, rule, pattern as IObjectPattern, outNode, side);
	}
}

function __createBetaNode(root: IRootNode, rule: number, pattern: ICompositePattern, out_node: number, side: Side) {
	const nodes = root.ns;
	const outNode = nodes[out_node];
	const joinNode = __createJoinNode(root, rule, pattern, out_node, side);
	__addToNetwork(root, rule, pattern.rightPattern, joinNode, "right");
	__addToNetwork(root, rule, pattern.leftPattern, joinNode, "left");
	addParentNode(outNode, joinNode);
	return joinNode;
}

function __createAlphaNode(root: IRootNode, rule: number, pattern: IObjectPattern, out_node: number, side: Side) {
	const p = root.ps.push(pattern) - 1;
	const type = pattern.tp;
	if (type !== patternType.from && type !== patternType.from_exists && type !== patternType.from_not) {
		const nodes = root.ns;
		const outNode = nodes[out_node];
		const constraints = pattern.constraints;
		const tn = __createTypeNode(root, constraints[0]);
		const typeNode = nodes[tn];
		const an = __createAliasNode(root, rule, p);
		addOutNode(typeNode, an, p);
		addParentNode(nodes[an], tn);
		let parentNode = an;
		constraints.filter((constraint, idx) => {
			return idx > 0;
		}).forEach((constraint) => {
			let n = -1;
			if (is_instance_of_hash(constraint)) {
				n = __createPropertyNode(root, rule, (constraint as IHashConstraint));
			} else if (is_instance_of_reference_constraint(constraint)) {
				addConstraint((outNode as IJoinNode).constraint, constraint as IReferenceConstraint);
				return;
			} else {
				n = __createEqualityNode(root, rule, constraint as IObjectConstraint);
			}
			const node = nodes[n];
			addOutNode(nodes[parentNode], n, p);
			addParentNode(node, parentNode);
			parentNode = n;
		});

		if (is_instance_of_beta_node(outNode)) {
			const an = __createAdapterNode(root, rule, side);
			addParentNode(nodes[an], parentNode);
			addOutNode(nodes[parentNode], an, p);
			parentNode = an;
		}
		addParentNode(outNode, parentNode);
		addOutNode(nodes[parentNode], out_node, p);
	}
}

const funcs = new Map<nodeType, (node: INode) => INode>();

function terminal(node: ITerminalNode) {
	delete node.b;
	return node;
}
funcs.set(nodeType.terminal, terminal);

function tp(node: ITypeNode) {
	delete node.eq;
	delete node.ca;
	node.constraint = cst(node.constraint);
	return node;
}
funcs.set(nodeType.type, tp);
function equality(node: IEqualityNode) {
	delete node.eq;
	delete node.ca;
	delete node.memory;
	node.constraint = cst(node.constraint);
	return node;
}
funcs.set(nodeType.equality, equality);
function property(node: IPropertyNode) {
	delete node.eq;
	delete node.ca;
	node.constraint = cst(node.constraint);
	return node;
}
funcs.set(nodeType.property, property);
function alias(node: IAliasNode) {
	delete node.eq;
	// node.constraint = pt(node.constraint);
	delete node.constraint;
	return node;
}
funcs.set(nodeType.alias, alias);
// function adapter(node: IAdapterNode) {
// 	return node;
// }
// funcs.set('leftadapter', adapter);
// funcs.set('rightadapter', adapter);

function beta(node: IBetaNode) {
	delete node.leftMemory;
	delete node.leftTuples;
	delete node.rightMemory;
	delete node.rightTuples;
	return node;
}
funcs.set(nodeType.beta, beta);
function join(node: IJoinNode) {
	node = beta(node);
	const c = node.constraint;
	delete c.leftMemory;
	delete c.rightMemory;
	delete c.equal;
	delete c.isMatch;
	delete c.match;
	const cc = c.constraint;
	delete cc.merge;
	delete cc.getIndexableProperties;
	return node;
}
funcs.set(nodeType.join, join);
function not(node: INotNode) {
	node = join(node) as INotNode;
	delete node.leftTupleMemory;
	delete node.notMatch;
	return node;
}
funcs.set(nodeType.not, not);
funcs.set(nodeType.exists, not);
function from(node: IFromNode) {
	node = join(node) as IFromNode;
	// node.pattern = pt(node.pattern) as IFromPattern;
	delete node.__equalityConstraints;
	delete node.fromMemory;
	delete node.type_assert;
	delete node.from_assert;
	delete node.pattern;
	return node;
}
funcs.set(nodeType.from, from);
funcs.set(nodeType.from_not, from);
funcs.set(nodeType.exists_from, from);

export default function (rules: IRule[]) {
	const root = build_nodes(rules);
	root.ns = root.ns.map((node) => {
		const fun = funcs.get(node.tp);
		return fun ? fun(node) : node;
	});
	root.ps = root.ps.map(pt);
	return root;
}
