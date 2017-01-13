/*
 * @Author: taoqf
 * @Date: 2016-12-13 15:52:51
 * @Last Modified by: taoqf
 * @Last Modified time: 2017-01-13 14:36:17
 * CopyRight 飞道科技 2016-2026
 */
import clone from 'lodash-ts/clone';
import mixin from 'lodash-ts/mixin';
import { IConstraint, is_instance_of_equality, is_instance_of_reference_constraint } from '../constraint';
import { IPattern, IFromPattern } from '../pattern';
import { INode, IRootNode, ITerminalNode, IJoinNode, ITypeNode, nodeType, IEqualityNode, IPropertyNode, IAliasNode, IAdapterNode, IBetaNode, INotNode, IFromNode, IFromNotNode } from '../nodes';
import AgendaTree from '../agenda';
import { addConstraint, create_join_reference_node } from '../nodes/join-reference-node';
import compile_rules from './rule';
import cst from './constraint';
import Memory from '../nodes/misc/memory';
import Context from '../context';
import InitialFact from '../facts/initial';
import Fact from '../facts/fact';
import pt from './pattern';

function compile_sub_nodes(patterns: IPattern[], node: INode) {
	const n = clone(node, true);
	const nodes = n.nodes = new Map<number, IPattern[]>();
	node.ns.forEach(([outNode, pattern]) => {
		if (!nodes.has(outNode)) {
			nodes.set(outNode, []);
		}
		nodes.get(outNode).push(patterns[pattern]);
	});
	return n;
}

const funcs = new Map<nodeType, (node: INode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) => INode>();

function terminal(node: ITerminalNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const rule = compile_rules(node.r, defines, scope);
	const n = {
		id: node.id,
		r: rule,
		agenda: agenda,
		b: root.bucket,
		i: node.i,
		n: node.n,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp
	} as ITerminalNode;
	agenda.register(n);
	return n;
}
funcs.set(nodeType.terminal, terminal);

function tp(node: ITypeNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const constraint = cs[node.c];
	return {
		id: node.id,
		ca: constraint.assert,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp
	} as ITypeNode;
}
funcs.set(nodeType.type, tp);
function equality(node: IEqualityNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const constraint = cs[node.c];
	return {
		id: node.id,
		ca: constraint.assert,
		nodes: node.nodes,
		ps: node.ps,
		memory: new Map<string, boolean>(),
		tp: node.tp
	} as IEqualityNode;
}
funcs.set(nodeType.equality, equality);
function property(node: IPropertyNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const constraint = cs[node.c];
	const alias = node.alias;
	return {
		alias: alias,
		id: node.id,
		constiables: clone(node.constiables),
		constraint: constraint,
		ca: constraint.assert,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp
	} as IPropertyNode;
}
funcs.set(nodeType.property, property);
function alias(node: IAliasNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const pattern = patterns[node.p];
	return {
		// constraint: pt(node.constraint, defines, scope),
		constraint: pattern,
		alias: node.alias,
		id: node.id,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp
	} as IAliasNode;
}
funcs.set(nodeType.alias, alias);
function adapter(node: IAdapterNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	return {
		id: node.id,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp
	} as IAdapterNode;
}
funcs.set(nodeType.leftadapter, adapter);
funcs.set(nodeType.rightadapter, adapter);
function beta(node: IBetaNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	return {
		id: node.id,
		nodes: node.nodes,
		ps: node.ps,
		tp: node.tp,
		leftMemory: {},
		rightMemory: {},
		leftTuples: Memory(),
		rightTuples: Memory()
	} as IBetaNode;
}
funcs.set(nodeType.beta, beta);
function join(node: IJoinNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	const constraint = node.constraint;
	node = beta(node, root, agenda, defines, scope, patterns, cs) as IBetaNode;
	const c = create_join_reference_node(node.leftTuples, node.rightTuples);
	if (!constraint.isDefault) {
		addConstraint(c, cst(constraint.constraint, defines, scope) as any);
	}
	return mixin(node, {
		constraint: c
	}) as IJoinNode;
}
funcs.set(nodeType.join, join);
function not(node: INotNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	node = join(node, root, agenda, defines, scope, patterns, cs) as IJoinNode as INotNode;
	return mixin(node, {
		leftTupleMemory: {},
		notMatch: new Context(new InitialFact()).match
	}) as INotNode;
}
funcs.set(nodeType.not, not);
funcs.set(nodeType.exists, not);
function from(node: IFromNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	// const pattern = pt(node.pattern, defines, scope) as IFromPattern;
	const pattern = patterns[node.p] as IFromPattern;
	const type_constraint = cs[pattern.constraints[0]];
	const from = pattern.from;
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	const constraints = pattern.constraints.slice(1);
	constraints.forEach((cc) => {
		const c = cs[cc];
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push((factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) => {
				return c.assert(factHanle1, factHandle2);
			});
		}
	});
	const vars = node.__variables;
	node = join(node, root, agenda, defines, scope, patterns, cs) as IJoinNode as IFromNode;
	return mixin(node, {
		pattern: pattern,
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
	}) as IFromNode;
}
funcs.set(nodeType.from, from);
function from_not(node: IFromNotNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>, patterns: IPattern[], cs: IConstraint[]) {
	// const pattern = pt(node.pattern, defines, scope) as IFromPattern;
	const pattern = patterns[node.p] as IFromPattern;
	const type_constraint = cs[pattern.constraints[0]];
	const from = pattern.from;
	const constraints = pattern.constraints.slice(1);
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	constraints.forEach((cc) => {
		const c = cs[cc];
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push(c.assert);
		}
	});
	const vars = node.__variables;
	node = join(node, root, agenda, defines, scope, patterns, cs) as IJoinNode as IFromNotNode;
	return mixin(node, {
		pattern: pattern,
		alias: pattern.a,
		// constraints: constraints,
		__equalityConstraints: eqConstraints,
		__variables: vars,
		fromMemory: {},
		type_assert(type: any) {
			return type_constraint.assert(type);
		},
		from_assert(fact: any, fh?: any) {
			return from.assert(fact, fh);
		}
	}) as IFromNotNode;
}
funcs.set(nodeType.from_not, from_not);
funcs.set(nodeType.exists_from, from_not);

export default function build(root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const patterns = root.ps.map((pattern) => {
		return pt(pattern, defines, scope);
	});
	const cs = root.cs.map((c) => {
		return cst(c, defines, scope);
	});
	const nodes = root.ns.map((node) => {
		node = compile_sub_nodes(patterns, node);
		const fun = funcs.get(node.tp);
		return fun(node, root, agenda, defines, scope, patterns, cs);
	});
	return {
		ns: nodes,
		ps: patterns,
		cs: cs,
		ts: clone(root.ts),
		js: clone(root.js),
		as: clone(root.as),
		tps: clone(root.tps),
		bucket: clone(root.bucket)
	} as IRootNode;
}
