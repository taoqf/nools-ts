import intersection from 'lodash-ts/intersection';
import { INode, nodeType } from '../nodes';
import { IObjectPattern } from '../pattern';
import Context from '../context';
import { IRule } from '../interfaces';
import Fact from '../facts/fact';
import WorkingMemory from '../working-memory';

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
assert_funcs.set(nodeType.type, type.assert);
modify_funcs.set(nodeType.type, type.modify);
retract_funcs.set(nodeType.type, type.retract);
dispose_funcs.set(nodeType.type, type.dispose);
import * as terminal from './terminal-node';
assert_funcs.set(nodeType.terminal, terminal.assert);
modify_funcs.set(nodeType.terminal, terminal.modify);
retract_funcs.set(nodeType.terminal, terminal.retract);
// assert_left_funcs.set(nodeType.terminal, terminal.assert);
// assert_right_funcs.set(nodeType.terminal, terminal.assert);
// retract_left_funcs.set(nodeType.terminal, terminal.retract);
// retract_right_funcs.set(nodeType.terminal, terminal.retract);
import * as left_adapter from './left-adapter-node';
assert_funcs.set(nodeType.leftadapter, left_adapter.assert);
modify_funcs.set(nodeType.leftadapter, left_adapter.modify);
retract_funcs.set(nodeType.leftadapter, left_adapter.retract);
import * as right_adapter from './right-adapter-node';
assert_funcs.set(nodeType.rightadapter, right_adapter.assert);
modify_funcs.set(nodeType.rightadapter, right_adapter.modify);
retract_funcs.set(nodeType.rightadapter, right_adapter.retract);
import * as alias from './alias-node';
assert_funcs.set(nodeType.alias, alias.assert);
modify_funcs.set(nodeType.alias, alias.modify);
retract_funcs.set(nodeType.alias, alias.retract);
import * as equality from './equality-node';
assert_funcs.set(nodeType.equality, equality.assert);
modify_funcs.set(nodeType.equality, equality.modify);
retract_funcs.set(nodeType.equality, equality.retract);
import * as property from './property-node';
assert_funcs.set(nodeType.property, property.assert);
modify_funcs.set(nodeType.property, property.modify);
retract_funcs.set(nodeType.property, property.retract);
import * as beta from './beta-node';
assert_funcs.set(nodeType.beta, beta.assert);
modify_funcs.set(nodeType.beta, beta.modify);
retract_funcs.set(nodeType.beta, beta.retract);
assert_left_funcs.set(nodeType.beta, beta.assert_left);
assert_right_funcs.set(nodeType.beta, beta.assert_right);
modify_left_funcs.set(nodeType.beta, beta.modify_left);
modify_right_funcs.set(nodeType.beta, beta.modify_right);
retract_left_funcs.set(nodeType.beta, beta.retract_left);
retract_right_funcs.set(nodeType.beta, beta.retract_right);
dispose_funcs.set(nodeType.beta, beta.dispose);

import * as join from './join-node';
assert_funcs.set(nodeType.join, beta.assert);
modify_funcs.set(nodeType.join, beta.modify);
retract_funcs.set(nodeType.join, beta.retract);
assert_left_funcs.set(nodeType.join, join.assert_left);
assert_right_funcs.set(nodeType.join, join.assert_right);
modify_left_funcs.set(nodeType.join, join.modify_left);
modify_right_funcs.set(nodeType.join, join.modify_right);
retract_left_funcs.set(nodeType.join, beta.retract_left);
retract_right_funcs.set(nodeType.join, beta.retract_right);
dispose_funcs.set(nodeType.join, beta.dispose);

import * as not from './not-node';
assert_funcs.set(nodeType.not, beta.assert);
modify_funcs.set(nodeType.not, beta.modify);
retract_funcs.set(nodeType.not, beta.retract);
assert_left_funcs.set(nodeType.not, not.assert_left);
assert_right_funcs.set(nodeType.not, not.assert_right);
modify_left_funcs.set(nodeType.not, not.modify_left);
modify_right_funcs.set(nodeType.not, not.modify_right);
retract_left_funcs.set(nodeType.not, not.retract_left);
retract_right_funcs.set(nodeType.not, not.retract_right);
dispose_funcs.set(nodeType.not, beta.dispose);

import * as from from './from-node';
assert_funcs.set(nodeType.from, beta.assert);
modify_funcs.set(nodeType.from, beta.modify);
retract_funcs.set(nodeType.from, beta.retract);
assert_left_funcs.set(nodeType.from, from.assert_left);
// assert_right_funcs.set(nodeType.from, from.assert_right);
modify_left_funcs.set(nodeType.from, from.modify_left);
// modify_right_funcs.set(nodeType.from, from.modify_right);
retract_left_funcs.set(nodeType.from, from.retract_left);
// retract_right_funcs.set(nodeType.from, from.retract_right);
dispose_funcs.set(nodeType.from, beta.dispose);

import * as exists from './exists-node';
assert_funcs.set(nodeType.exists, beta.assert);
modify_funcs.set(nodeType.exists, beta.modify);
retract_funcs.set(nodeType.exists, beta.retract);
assert_left_funcs.set(nodeType.exists, exists.assert_left);
assert_right_funcs.set(nodeType.exists, exists.assert_right);
modify_left_funcs.set(nodeType.exists, exists.modify_left);
modify_right_funcs.set(nodeType.exists, exists.modify_right);
retract_left_funcs.set(nodeType.exists, exists.retract_left);
retract_right_funcs.set(nodeType.exists, exists.retract_right);
dispose_funcs.set(nodeType.exists, beta.dispose);

import * as from_not from './from-not-node';
assert_funcs.set(nodeType.from_not, beta.assert);
modify_funcs.set(nodeType.from_not, beta.modify);
retract_funcs.set(nodeType.from_not, beta.retract);
assert_left_funcs.set(nodeType.from_not, from_not.assert_left);
// assert_right_funcs.set(nodeType.from_not, from_not.assert_right);
modify_left_funcs.set(nodeType.from_not, from_not.modify_left);
// modify_right_funcs.set(nodeType.from_not, from_not.modify_right);
retract_left_funcs.set(nodeType.from_not, from_not.retract_left);
// retract_right_funcs.set(nodeType.from_not, from_not.retract_right);
dispose_funcs.set(nodeType.from_not, beta.dispose);

import * as exists_from from './exists-from-node';
assert_funcs.set(nodeType.exists_from, beta.assert);
modify_funcs.set(nodeType.exists_from, beta.modify);
retract_funcs.set(nodeType.exists_from, beta.retract);
assert_left_funcs.set(nodeType.exists_from, exists_from.assert_left);
// assert_right_funcs.set(nodeType.exists_from, exists_from.assert_right);
modify_left_funcs.set(nodeType.exists_from, exists_from.modify_left);
// modify_right_funcs.set(nodeType.exists_from, exists_from.modify_right);
retract_left_funcs.set(nodeType.exists_from, exists_from.retract_left);
// retract_right_funcs.set(nodeType.exists_from, exists_from.retract_right);
dispose_funcs.set(nodeType.exists_from, beta.dispose);

export function base_assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = assert_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method assert_left';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_assert_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = assert_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method assert_right';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_assert(nodes: INode[], n: number, fact: Fact | Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = assert_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_assert(nodes, outNode, fact, wm);
		}
	} else {
		fun(nodes, n, fact, wm);
	}
}

export function base_retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = retract_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method retract_left';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_retract_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = retract_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method retract_right';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_retract(nodes: INode[], n: number, fact: Fact | Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = retract_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_retract(nodes, outNode, fact, wm);
		}
	} else {
		fun(nodes, n, fact, wm);
	}
}

export function base_modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = modify_left_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method modify_left';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_modify_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = modify_right_funcs.get(node.type);
	if (!fun) {
		console.error(node, context);
		throw 'cannot find method modify_right';
	} else {
		fun(nodes, n, context, wm);
	}
}

export function base_modify(nodes: INode[], n: number, fact: Fact | Context, wm: WorkingMemory) {
	const node = nodes[n];
	const fun = modify_funcs.get(node.type);
	if (!fun) {
		console.error(node, fact);
		for (const [outNode, paths] of node.nodes.entries()) {
			base_modify(nodes, outNode, fact, wm);
		}
	} else {
		fun(nodes, n, fact, wm);
	}
}

export function base_dispose(nodes: INode[], n: number, context: Context) {
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

export function propagate_modify(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify(nodes, outNode, new Context(context.fact, continuingPaths, context.match), wm);
		}
	}
}

export function propagate_retract(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract(nodes, outNode, new Context(context.fact, continuingPaths, context.match), wm);
		}
	}
}

export function propagate_assert(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n];
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert(nodes, outNode, new Context(context.fact, continuingPaths, context.match), wm);
		}
	}
}

export function propagate_dispose(nodes: INode[], n: number, context: Context) {
	const node = nodes[n];
	for (const [outNode, value] of node.nodes.entries()) {
		base_dispose(nodes, outNode, context);
	}
}
