import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { IRule } from '../runtime/rule';
import { IObjectPattern } from '../pattern';
import Fact from '../facts/fact';

export type notNodeType = 'not' | 'exists';
export type joinNodeType = 'join' | 'from' | 'from-not' | 'exists-from' | notNodeType;
export type betaNodeType = 'beta' | joinNodeType;
export type adapterNodeType = 'leftadapter' | 'rightadapter';
export type alphaNodeType = 'type' | 'alias' | 'equality' | 'property';
export type nodeType = 'terminal' | 'join-reference' | alphaNodeType | adapterNodeType | betaNodeType;

export interface INode {
	type: nodeType;
	nodes: Map<number, IObjectPattern[]>;
	rules: IRule[];
	parentNodes: number[];
	__id: number;
}

export function addRule(node: number, rule: IRule, nodes: INode[]) {
	const n = nodes[node];
	if (n.rules.indexOf(rule) === -1) {
		n.rules.push(rule);
	}
	return node;
}

export function merge(node1: number, node2: number, nodes: INode[]) {
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

export function addOutNode(node: INode, outNode: number, pattern: IObjectPattern) {
	const nodes = node.nodes;
	if (!nodes.has(outNode)) {
		nodes.set(outNode, []);
	}
	nodes.get(outNode).push(pattern);
}

export function addParentNode(node: INode, n: number) {
	const parentNodes = node.parentNodes;
	if (parentNodes.indexOf(n) === -1) {
		parentNodes.push(n);
	}
}

let id = 0;

export function create_node(type: nodeType): INode {
	return {
		type: type,
		nodes: new Map<number, IObjectPattern[]>(),
		__id: id++,
		rules: [],
		parentNodes: []
	};
}

export function is_instance_of_beta_node(node: INode) {
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

const assert_funcs = new Map<nodeType, typeof base_assert>();
const assert_left_funcs = new Map<nodeType, typeof base_assert_left>();
const assert_right_funcs = new Map<nodeType, typeof base_assert_right>();
const retract_funcs = new Map<nodeType, typeof base_retract>();
const retract_left_funcs = new Map<nodeType, typeof base_retract_left>();
const retract_right_funcs = new Map<nodeType, typeof base_retract_right>();
const modify_funcs = new Map<nodeType, typeof base_modify>();
const modify_left_funcs = new Map<nodeType, typeof base_modify>();
const modify_right_funcs = new Map<nodeType, typeof base_modify>();
const dispose_funcs = new Map<nodeType, typeof base_dispose>();
// const dispose_left_funcs = new Map<nodeType, typeof base_dispose>();
// const dispose_right_funcs = new Map<nodeType, typeof base_dispose>();

import * as type from './type-node';
assert_funcs.set('type', type.assert);
modify_funcs.set('type', type.modify);
retract_funcs.set('type', type.retract);
dispose_funcs.set('type', type.dispose);
import * as terminal from './terminal-node';
assert_funcs.set('terminal', terminal.assert);
modify_funcs.set('terminal', terminal.modify);
retract_funcs.set('terminal', terminal.retract);
// assert_left_funcs.set('terminal', terminal.assert);
// assert_right_funcs.set('terminal', terminal.assert);
// retract_left_funcs.set('terminal', terminal.retract);
// retract_right_funcs.set('terminal', terminal.retract);
import * as left_adapter from './left-adapter-node';
assert_funcs.set('leftadapter', left_adapter.assert);
modify_funcs.set('leftadapter', left_adapter.modify);
retract_funcs.set('leftadapter', left_adapter.retract);
import * as right_adapter from './right-adapter-node';
assert_funcs.set('rightadapter', right_adapter.assert);
modify_funcs.set('rightadapter', right_adapter.modify);
retract_funcs.set('rightadapter', right_adapter.retract);
import * as alias from './alias-node';
assert_funcs.set('alias', alias.assert);
modify_funcs.set('alias', alias.modify);
retract_funcs.set('alias', alias.retract);
import * as equality from './equality-node';
assert_funcs.set('equality', equality.assert);
modify_funcs.set('equality', equality.modify);
retract_funcs.set('equality', equality.retract);
import * as property from './property-node';
assert_funcs.set('property', property.assert);
modify_funcs.set('property', property.modify);
retract_funcs.set('property', property.retract);
import * as beta from './beta-node';
assert_funcs.set('beta', beta.assert);
modify_funcs.set('beta', beta.modify);
retract_funcs.set('beta', beta.retract);
assert_left_funcs.set('beta', beta.assert_left);
assert_right_funcs.set('beta', beta.assert_right);
modify_left_funcs.set('beta', beta.modify_left);
modify_right_funcs.set('beta', beta.modify_right);
retract_left_funcs.set('beta', beta.retract_left);
retract_right_funcs.set('beta', beta.retract_right);
dispose_funcs.set('beta', beta.dispose);

import * as join from './join-node';
assert_funcs.set('join', beta.assert);
modify_funcs.set('join', beta.modify);
retract_funcs.set('join', beta.retract);
assert_left_funcs.set('join', join.assert_left);
assert_right_funcs.set('join', join.assert_right);
modify_left_funcs.set('join', join.modify_left);
modify_right_funcs.set('join', join.modify_right);
retract_left_funcs.set('join', beta.retract_left);
retract_right_funcs.set('join', beta.retract_right);
dispose_funcs.set('join', beta.dispose);

import * as not from './not-node';
assert_funcs.set('not', beta.assert);
modify_funcs.set('not', beta.modify);
retract_funcs.set('not', beta.retract);
assert_left_funcs.set('not', not.assert_left);
assert_right_funcs.set('not', not.assert_right);
modify_left_funcs.set('not', not.modify_left);
modify_right_funcs.set('not', not.modify_right);
retract_left_funcs.set('not', not.retract_left);
retract_right_funcs.set('not', not.retract_right);
dispose_funcs.set('not', beta.dispose);

import * as from from './from-node';
assert_funcs.set('from', beta.assert);
modify_funcs.set('from', beta.modify);
retract_funcs.set('from', beta.retract);
assert_left_funcs.set('from', from.assert_left);
// assert_right_funcs.set('from', from.assert_right);
modify_left_funcs.set('from', from.modify_left);
// modify_right_funcs.set('from', from.modify_right);
retract_left_funcs.set('from', from.retract_left);
// retract_right_funcs.set('from', from.retract_right);
dispose_funcs.set('from', beta.dispose);

import * as exists from './exists-node';
assert_funcs.set('exists', beta.assert);
modify_funcs.set('exists', beta.modify);
retract_funcs.set('exists', beta.retract);
assert_left_funcs.set('exists', exists.assert_left);
assert_right_funcs.set('exists', exists.assert_right);
modify_left_funcs.set('exists', exists.modify_left);
modify_right_funcs.set('exists', exists.modify_right);
retract_left_funcs.set('exists', exists.retract_left);
retract_right_funcs.set('exists', exists.retract_right);
dispose_funcs.set('exists', beta.dispose);

import * as from_not from './from-not-node';
assert_funcs.set('from-not', beta.assert);
modify_funcs.set('from-not', beta.modify);
retract_funcs.set('from-not', beta.retract);
assert_left_funcs.set('from-not', from_not.assert_left);
// assert_right_funcs.set('from-not', from_not.assert_right);
modify_left_funcs.set('from-not', from_not.modify_left);
// modify_right_funcs.set('from-not', from_not.modify_right);
retract_left_funcs.set('from-not', from_not.retract_left);
// retract_right_funcs.set('from-not', from_not.retract_right);
dispose_funcs.set('from-not', beta.dispose);

import * as exists_from from './exists-from-node';
assert_funcs.set('exists-from', beta.assert);
modify_funcs.set('exists-from', beta.modify);
retract_funcs.set('exists-from', beta.retract);
assert_left_funcs.set('exists-from', exists_from.assert_left);
// assert_right_funcs.set('exists-from', exists_from.assert_right);
modify_left_funcs.set('exists-from', exists_from.modify_left);
// modify_right_funcs.set('exists-from', exists_from.modify_right);
retract_left_funcs.set('exists-from', exists_from.retract_left);
// retract_right_funcs.set('exists-from', exists_from.retract_right);
dispose_funcs.set('exists-from', beta.dispose);

export function base_assert_left(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = assert_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method assert_left';
	} else {
		fun(nodes, n, context);
	}
}

export function base_assert_right(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = assert_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method assert_right';
	} else {
		fun(nodes, n, context);
	}
}

export function base_assert(nodes: INode[], n: number, fact: Fact | Context) {
	const node = nodes[n];
	const fun = assert_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_assert(nodes, outNode, fact);
		}
	} else {
		fun(nodes, n, fact);
	}
}

export function base_retract_left(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = retract_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method retract_left';
	} else {
		fun(nodes, n, context);
	}
}

export function base_retract_right(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = retract_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method retract_right';
	} else {
		fun(nodes, n, context);
	}
}

export function base_retract(nodes: INode[], n: number, fact: Fact | Context) {
	const node = nodes[n];
	const fun = retract_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_retract(nodes, outNode, fact);
		}
	} else {
		fun(nodes, n, fact);
	}
}

export function base_modify_left(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = modify_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method modify_left';
	} else {
		fun(nodes, n, context);
	}
}

export function base_modify_right(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	const fun = modify_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method modify_right';
	} else {
		fun(nodes, n, context);
	}
}

export function base_modify(nodes: INode[], n: number, fact: Fact | Context) {
	const node = nodes[n];
	const fun = modify_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_modify(nodes, outNode, fact);
		}
	} else {
		fun(nodes, n, fact);
	}
}

export function base_dispose(nodes: INode[], n: number, context?: Context) {
	const node = nodes[n];
	const fun = dispose_funcs.get(node.type);
	if (!fun) {
		for (const [outNode, value] of node.nodes.entries()) {
			base_dispose(nodes, outNode, context);
		}
	} else {
		fun(nodes, n, context);
	}
}

export function propagate_modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify(nodes, outNode, new Context(context.fact, continuingPaths, context.match));
		}
	}
}

export function propagate_retract(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract(nodes, outNode, new Context(context.fact, continuingPaths, context.match));
		}
	}
}

export function propagate_assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert(nodes, outNode, new Context(context.fact, continuingPaths, context.match));
		}
	}
}

export function propagate_dispose(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	for (const [outNode, value] of node.nodes.entries()) {
		base_dispose(nodes, outNode, context);
	}
}
