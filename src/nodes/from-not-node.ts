import isArray from 'lodash-ts/isArray';
import WorkingMemory from '../working-memory';
import { IConstraint, is_instance_of_hash, is_instance_of_equality, is_instance_of_reference_constraint } from '../constraint';
import Fact from '../facts/fact';
import Context from '../context';
import { IFromPattern } from '../pattern';
import { INode, IFromNotNode, joinNodeType } from '../nodes';
import { __addToLeftMemory, assert, modify, retract, removeFromLeftMemory } from './beta-node';

function __isMatch(node: IFromNotNode, oc: Context, o: any, add: boolean, wm: WorkingMemory) {
	let ret = false;
	if (node.type_assert(o)) {
		const createdFact = wm.getFactHandle(o);
		const context = new Context(createdFact, null)
			.mergeMatch(oc.match)
			.set(node.alias, o);
		if (add) {
			let fm = node.fromMemory[createdFact.id];
			if (!fm) {
				fm = node.fromMemory[createdFact.id] = {};
			}
			fm[oc.hashCode] = oc;
		}
		const fh = context.factHash;
		ret = node.__equalityConstraints.every((eqConstraint) => {
			return eqConstraint(fh, fh);
		});
	}
	return ret;
}

export function __findMatches(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IFromNotNode;
	const fh = context.factHash, o = node.from_assert(fh), isMatch = false;
	if (isArray(o)) {
		(o as any[]).some((o) => {
			if (__isMatch(node, context, o, true, wm)) {
				context.blocked = true;
				return true;
			} else {
				return false;
			}
		});
		assert(nodes, n, context.clone(), wm);
	} else if (o !== undefined && !(context.blocked = __isMatch(node, context, o, true, wm))) {
		assert(nodes, n, context.clone(), wm);
	}
	return isMatch;
}

export function assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToLeftMemory(nodes, n, context);
	__findMatches(nodes, n, context, wm);
}

function __modify(nodes: INode[], n: number, context: Context, leftContext: Context, wm: WorkingMemory) {
	const node = nodes[n] as IFromNotNode;
	const leftContextBlocked = leftContext.blocked;
	const fh = context.factHash, o = node.from_assert(fh);
	if (isArray(o)) {
		(o as any[]).some((o) => {
			if (__isMatch(node, context, o, true, wm)) {
				context.blocked = true;
				return true;
			} else {
				return false;
			}
		});
	} else if (o !== undefined) {
		context.blocked = __isMatch(node, context, o, true, wm);
	}
	const newContextBlocked = context.blocked;
	if (!newContextBlocked) {
		if (leftContextBlocked) {
			assert(nodes, n, context.clone(), wm);
		} else {
			modify(nodes, n, context.clone(), wm);
		}
	} else if (!leftContextBlocked) {
		retract(nodes, n, leftContext.clone(), wm);
	}
}

export function modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromLeftMemory(nodes, n, context);
	if (ctx) {
		__addToLeftMemory(nodes, n, context);
		__modify(nodes, n, context, ctx.data, wm);
	} else {
		throw new Error();
	}
	const node = nodes[n] as IFromNotNode;
	const fm = node.fromMemory[context.fact.id];
	node.fromMemory[context.fact.id] = {};
	if (fm) {
		for (const i in fm) {
			// update any contexts associated with this fact
			if (i !== context.hashCode) {
				const lc = fm[i];
				const ctx = removeFromLeftMemory(nodes, n, lc);
				if (ctx) {
					const lc_cp = lc.clone();
					lc_cp.blocked = false;
					__addToLeftMemory(nodes, n, lc_cp);
					__modify(nodes, n, lc_cp, ctx.data, wm);
				}
			}
		}
	}
}

export function retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const tuple = removeFromLeftMemory(nodes, n, context);
	if (tuple) {
		const ctx = tuple.data;
		if (!ctx.blocked) {
			retract(nodes, n, ctx.clone(), wm);
		}
	}
}
