import isArray from 'lodash-ts/isArray';
import isEmpty from 'lodash-ts/isEmpty';
import Context from '../context';
import { IFromPattern } from '../pattern';
import WorkingMemory from '../working-memory';
import { INode, IFromNode } from '../nodes';
import { __addToLeftMemory, assert, removeFromLeftMemory, modify, retract } from './beta-node';
import { assert_left as base_assert_left } from './join-node';

const DEFAULT_MATCH = {
	isMatch: function () {
		return false;
	}
} as Context;

function __createMatch(node: IFromNode, lc: Context, o: any, wm: WorkingMemory) {
	if (node.type_assert(o)) {
		const createdFact = wm.getFactHandle(o);
		const rc = new Context(createdFact, null, null)
			.set(node.alias, o);
		const createdFactId = createdFact.id;
		const fh = rc.factHash, lcFh = lc.factHash;
		for (const [key, fact] of lcFh) {
			fh.set(key, fact);
		}
		let fm = node.fromMemory[createdFactId];
		if (!fm) {
			fm = node.fromMemory[createdFactId] = {} as any;
		}
		const eqConstraints = node.__equalityConstraints;
		if (eqConstraints.some((eqConstraint) => {
			if (!eqConstraint(fh, fh)) {
				return true;
			} else {
				return false;
			}
		})) {
			const createdContext = DEFAULT_MATCH;
			fm[lc.hashCode] = [lc, createdContext];
			return createdContext;
		} else {
			node.__variables.forEach((prop) => {
				fh.set(prop, o[prop]);
			});
			const createdContext = rc.clone(createdFact, null, lc.match.merge(rc.match));
			lc.fromMatches[createdFact.id] = createdContext;
			fm[lc.hashCode] = [lc, createdContext];
			return createdContext;
		}
	}
	return DEFAULT_MATCH;
}

function __checkMatch(nodes: INode[], n: number, context: Context, o: any, propogate = false, wm: WorkingMemory) {
	const node = nodes[n] as IFromNode;
	const newContext = __createMatch(node, context, o, wm);
	if (newContext.isMatch() && propogate) {
		assert(nodes, n, newContext.clone(), wm);
	}
	return newContext;
}

function __createMatches(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IFromNode;
	const fh = context.factHash, o = node.from_assert(fh);
	if (isArray(o)) {
		(o as any[]).forEach((o) => {
			__checkMatch(nodes, n, context, o, true, wm);
		});
	} else if (o !== undefined) {
		__checkMatch(nodes, n, context, o, true, wm);
	}
}

export function assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToLeftMemory(nodes, n, context);
	context.fromMatches = {};
	__createMatches(nodes, n, context, wm);
}

// export function assert_right(node: IFromNode, context: Context) {
// 	throw new Error("Shouldnt have gotten here");
// }

function removeFromFromMemory(node: IFromNode, context: Context) {
	const factId = context.fact.id;
	const fm = node.fromMemory[factId];
	if (fm) {
		for (const i in fm) {
			const entry = fm[i];
			if (entry[1] === context) {
				delete fm[i];
				if (isEmpty(fm)) {
					delete node.fromMemory[factId];
				}
				break;
			}
		}
	}

}

export function modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromLeftMemory(nodes, n, context);
	// newContext, i, l, factId, fact;
	const node = nodes[n] as IFromNode;
	if (ctx) {
		__addToLeftMemory(nodes, n, context);
		const leftContext = ctx.data;
		context.fromMatches = {};
		const fromMatches = context.fromMatches;
		const rightMatches = leftContext.fromMatches;
		const o = node.from_assert(context.factHash);

		if (isArray(o)) {
			(o as any[]).forEach((o) => {
				const newContext = __checkMatch(nodes, n, context, o, false, wm);
				if (newContext.isMatch()) {
					const factId = newContext.fact.id;
					if (factId in rightMatches) {
						modify(nodes, n, newContext.clone(), wm);
					} else {
						assert(nodes, n, newContext.clone(), wm);
					}
				}
			});
		} else if (o !== undefined) {
			const newContext = __checkMatch(nodes, n, context, o, false, wm);
			if (newContext.isMatch()) {
				const factId = newContext.fact.id;
				if (factId in rightMatches) {
					modify(nodes, n, newContext.clone(), wm);
				} else {
					assert(nodes, n, newContext.clone(), wm);
				}
			}
		}
		for (const i in rightMatches) {
			if (!(i in fromMatches)) {
				removeFromFromMemory(node, rightMatches[i]);
				retract(nodes, n, rightMatches[i].clone(), wm);
			}
		}
	} else {
		base_assert_left(nodes, n, context, wm);
	}
	const fact = context.fact;
	const factId = fact.id;
	const fm = node.fromMemory[factId];
	node.fromMemory[factId] = {};
	if (fm) {
		const factObject = fact.object;
		// lc, entry, cc, createdIsMatch,
		for (const i in fm) {
			const entry = fm[i];
			const lc = entry[0];
			const cc = entry[1];
			const createdIsMatch = cc.isMatch();
			if (lc.hashCode !== context.hashCode) {
				const newContext = __createMatch(node, lc, factObject, wm);
				if (createdIsMatch) {
					retract(nodes, n, cc.clone(), wm);
				}
				if (newContext.isMatch()) {
					createdIsMatch ? modify(nodes, n, newContext.clone(), wm) : assert(nodes, n, newContext.clone(), wm);
				}
			}
		}
	}
}

export function retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const tuple = removeFromLeftMemory(nodes, n, context);
	if (tuple) {
		const ctx = tuple.data;
		const fromMatches = ctx.fromMatches;
		for (const i in fromMatches) {
			removeFromFromMemory(nodes[n] as IFromNode, fromMatches[i]);
			retract(nodes, n, fromMatches[i].clone(), wm);
		}
	}
}