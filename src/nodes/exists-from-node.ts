import isArray from 'lodash-ts/isArray';
import { IFromPattern } from '../pattern';
import WorkingMemory from '../working-memory';
import Context from '../context';
import { __addToLeftMemory, assert, removeFromLeftMemory, modify, retract } from './beta-node';
import { IFromNotNode, _create_from_not_node } from './from-not-node';

export interface IExistsFromNode extends IFromNotNode {

}

export function create(pattern: IFromPattern, wm: WorkingMemory): IExistsFromNode {
	return _create_from_not_node('exists-from', pattern, wm);
}

function __isMatch(node: IExistsFromNode, oc: Context, o: any, add: boolean) {
	let ret = false;
	if (node.type_assert(o)) {
		const createdFact = node.workingMemory.getFactHandle(o);
		const context = new Context(createdFact, null, null)
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
		const eqConstraints = node.__equalityConstraints;
		ret = eqConstraints.length && eqConstraints.every((eqConstraint) => {
			return eqConstraint(fh);
		});
	}
	return ret;
}

function __findMatches(node: IExistsFromNode, context: Context) {
	const fh = context.factHash, o = node.from_assert(fh), isMatch = false;
	if (isArray(o)) {
		context.blocked = (o as any[]).some((o) => {
			return __isMatch(node, context, o, true);
		});
		if (context.blocked) {
			assert(node, context.clone());
		}
	} else if (o !== undefined && (__isMatch(node, context, o, true))) {
		context.blocked = true;
		assert(node, context.clone());
	}
	return isMatch;
}

export function assert_left(node: IExistsFromNode, context: Context) {
	__addToLeftMemory(node, context);
	__findMatches(node, context);
}

function __modify(node: IExistsFromNode, context: Context, leftContext: Context) {
	const leftContextBlocked = leftContext.blocked;
	const fh = context.factHash, o = node.from_assert(fh);
	if (isArray(o)) {
		context.blocked = (o as any[]).some((o) => {
			return __isMatch(node, context, o, true);
		});
	} else if (o !== undefined) {
		context.blocked = __isMatch(node, context, o, true);
	}
	const newContextBlocked = context.blocked;
	if (newContextBlocked) {
		if (leftContextBlocked) {
			modify(node, context.clone());
		} else {
			assert(node, context.clone());
		}
	} else if (leftContextBlocked) {
		retract(node, context.clone());
	}

}

export function modify_left(node: IFromNotNode, context: Context) {
	const ctx = removeFromLeftMemory(node, context);
	if (ctx) {
		__addToLeftMemory(node, context);
		__modify(node, context, ctx.data);
	} else {
		throw new Error();
	}
	const fm = node.fromMemory[context.fact.id];
	node.fromMemory[context.fact.id] = {};
	if (fm) {
		for (const i in fm) {
			// update any contexts associated with this fact
			if (i !== context.hashCode) {
				const lc = fm[i];
				const ctx = removeFromLeftMemory(node, lc);
				if (ctx) {
					const lc_cp = lc.clone();
					lc_cp.blocked = false;
					__addToLeftMemory(node, lc_cp);
					__modify(node, lc_cp, ctx.data);
				}
			}
		}
	}
}

export function retract_left(node: IExistsFromNode, context: Context) {
	const tuple = removeFromLeftMemory(node, context);
	if (tuple) {
		const ctx = tuple.data;
		if (ctx.blocked) {
			retract(node, ctx.clone());
		}
	}
}
