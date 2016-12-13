/*
 * @Author: taoqf
 * @Date: 2016-12-13 15:52:51
 * @Last Modified by: taoqf
 * @Last Modified time: 2016-12-13 19:36:32
 * CopyRight 飞道科技 2016-2026
 */
import clone from 'lodash-ts/clone';
import mixin from 'lodash-ts/mixin';
import { is_instance_of_equality, is_instance_of_reference_constraint } from '../constraint';
import { IObjectPattern, IFromPattern } from '../pattern';
import { INode, IRootNode, ITerminalNode, IJoinNode, ITypeNode, nodeType, IEqualityNode, IPropertyNode, IAliasNode, IAdapterNode, IBetaNode, INotNode, IFromNode } from '../nodes';
import AgendaTree from '../agenda';
import { addConstraint, create_join_reference_node } from '../nodes/join-reference-node';
import compile_rules from './rule';
import cst from './constraint';
import Memory from '../nodes/misc/memory';
import Context from '../context';
import InitialFact from '../facts/initial';
import Fact from '../facts/fact';
import pt from './pattern';

function compile_sub_nodes(node: INode) {
	const nodes = node.nodes = new Map<number, IObjectPattern[]>();
	node.out_nodes.forEach(([outNode, pattern]) => {
		if (!nodes.has(outNode)) {
			nodes.set(outNode, []);
		}
		nodes.get(outNode).push(pattern);
	});
	return node;
}

const funcs = new Map<nodeType, (node: INode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) => INode>();

function terminal(node: ITerminalNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const rule = compile_rules(node.rule, defines, scope);
	const n = {
		__id: node.__id,
		rule: rule,
		agenda: agenda,
		bucket: root.bucket,
		index: node.index,
		name: node.name,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type
	};
	agenda.register(n);
	return n;
}
funcs.set('terminal', terminal);

function tp(node: ITypeNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const constraint = cst(node.constraint, defines);
	return {
		__id: node.__id,
		constraintAssert: constraint.assert,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type
	};
}
funcs.set('type', tp);
function equality(node: IEqualityNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const constraint = cst(node.constraint, defines);
	return {
		__id: node.__id,
		constraintAssert: constraint.assert,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		memory: new Map<string, boolean>(),
		type: node.type
	};
}
funcs.set('equality', equality);
function property(node: IPropertyNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const constraint = cst(node.constraint, defines);
	const alias = node.alias;
	return {
		alias: alias,
		__id: node.__id,
		constiables: clone(node.constiables),
		constraint: constraint,
		constraintAssert: constraint.assert,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type
	};
}
funcs.set('property', property);
function alias(node: IAliasNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	return {
		constraint: pt(node.constraint, defines),
		alias: node.alias,
		__id: node.__id,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type
	};
}
funcs.set('alias', alias);
function adapter(node: IAdapterNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	return {
		__id: node.__id,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type
	};
}
funcs.set('leftadapter', adapter);
funcs.set('rightadapter', adapter);
function beta(node: IBetaNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	return {
		__id: node.__id,
		nodes: node.nodes,
		parentNodes: node.parentNodes,
		type: node.type,
		leftMemory: {},
		rightMemory: {},
		// leftTuples: Memory(),
		// rightTuples: Memory()
		leftTuples: node.leftTuples,
		rightTuples: node.rightTuples
	};
}
funcs.set('beta', beta);
function join(node: IJoinNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const constraint = node.constraint;
	node = beta(node, root, agenda, defines, scope) as IBetaNode;
	// const constraint = create_join_reference_node(node.leftTuples, node.rightTuples);
	return mixin(node, {
		constraint: constraint
	});
}
funcs.set('join', join);
function not(node: INotNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	return node;
	// node = join(node, root, agenda, defines, scope) as IJoinNode as INotNode;
	// return mixin(node, {
	// 	leftTupleMemory: {},
	// 	// notMatch: new Context(new InitialFact()).match
	// 	notMatch: node.notMatch
	// });
}
funcs.set('not', not);
funcs.set('exists', not);
function from(node: IFromNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const pattern = pt(node.pattern, defines) as IFromPattern;
	const type_constraint = pattern.constraints[0];
	const from = pattern.from;
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	const constraints = pattern.constraints.slice(1);
	constraints.forEach((c) => {
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push((factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) => {
				return c.assert(factHanle1, factHandle2);
			});
		}
	});
	const vars = node.__variables;
	node = join(node, root, agenda, defines, scope) as IJoinNode as IFromNode;
	return mixin(node, {
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
funcs.set('from', from);
function from_not(node: IFromNode, root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const pattern = pt(node.pattern, defines) as IFromPattern;
	const type_constraint = pattern.constraints[0];
	const from = pattern.from;
	const constraints = pattern.constraints.slice(1);
	const eqConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	constraints.forEach((c) => {
		if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
			eqConstraints.push(c.assert);
		}
	});
	const vars = node.__variables;
	node = join(node, root, agenda, defines, scope) as IJoinNode as IFromNode;
	return mixin(node, {
		pattern: pattern,
		alias: pattern.alias,
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
	});
}
funcs.set('from-not', from_not);
funcs.set('exists-from', from_not);

export default function build(root: IRootNode, agenda: AgendaTree, defines: Map<string, any>, scope: Map<string, any>) {
	const nodes = root.nodes.map((node) => {
		node = compile_sub_nodes(node);
		const fun = funcs.get(node.type);
		return fun ? fun(node, root, agenda, defines, scope) : node;
	});
	return {
		nodes: nodes,
		terminalNodes: clone(root.terminalNodes),
		joinNodes: clone(root.joinNodes),
		alphaNodes: clone(root.alphaNodes),
		typeNodes: clone(root.typeNodes),
		bucket: clone(root.bucket)
	};
}
