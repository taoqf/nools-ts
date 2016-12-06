import isArray from 'lodash-ts/isArray';
import mixin from 'lodash-ts/mixin';
import WorkingMemory from '../working-memory';
import { IConstraint, is_instance_of_hash, is_instance_of_equality, is_instance_of_reference_constraint } from '../constraint';
import Fact from '../facts/fact';
import Context from '../context';
import { IFromPattern } from '../pattern';
import { joinNodeType } from './node';
import { __addToLeftMemory, assert, modify, retract, removeFromLeftMemory } from './beta-node';
import { IJoinNode, _create_join_node } from './join-node';

export interface IFromNotNode extends IJoinNode {
	pattern: IFromPattern;
	alias: string;
	type_assert: (type: any) => boolean;
	from_assert: (fact: any, fh?: any) => any;
	constraints: IConstraint[];
	fromMemory: { [id: number]: { [hashCode: string]: Context }; };
	__equalityConstraints: { (factHanle1: Map<string, Fact>, factHandle2?: Map<string, Fact>): boolean; }[];
	__variables: any[];
	workingMemory: WorkingMemory;
}

export function _create_from_not_node(type: joinNodeType, pattern: IFromPattern, wm: WorkingMemory): IFromNotNode {
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
		workingMemory: wm,
		type_assert(type: any) {
			return type_constraint.assert(type);
		},
		from_assert(fact: any, fh?: any) {
			return from.assert(fact, fh);
		}
	});
}

export function create(pattern: IFromPattern, wm: WorkingMemory): IFromNotNode {
	return _create_from_not_node('from-not', pattern, wm);
}

function __isMatch(node: IFromNotNode, oc: Context, o: any, add: boolean) {
	let ret = false;
	if (node.type_assert(o)) {
		const createdFact = node.workingMemory.getFactHandle(o);
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

export function __findMatches(node: IFromNotNode, context: Context) {
	const fh = context.factHash, o = node.from_assert(fh), isMatch = false;
	if (isArray(o)) {
		(o as any[]).some((o) => {
			if (__isMatch(node, context, o, true)) {
				context.blocked = true;
				return true;
			} else {
				return false;
			}
		});
		assert(node, context.clone());
	} else if (o !== undefined && !(context.blocked = __isMatch(node, context, o, true))) {
		assert(node, context.clone());
	}
	return isMatch;
}

export function assert_left(node: IFromNotNode, context: Context) {
	__addToLeftMemory(node, context);
	__findMatches(node, context);
}

function __modify(node: IFromNotNode, context: Context, leftContext: Context) {
	const leftContextBlocked = leftContext.blocked;
	const fh = context.factHash, o = node.from_assert(fh);
	if (isArray(o)) {
		(o as any[]).some((o) => {
			if (__isMatch(node, context, o, true)) {
				context.blocked = true;
				return true;
			} else {
				return false;
			}
		});
	} else if (o !== undefined) {
		context.blocked = __isMatch(node, context, o, true);
	}
	const newContextBlocked = context.blocked;
	if (!newContextBlocked) {
		if (leftContextBlocked) {
			assert(node, context.clone());
		} else {
			modify(node, context.clone());
		}
	} else if (!leftContextBlocked) {
		retract(node, leftContext.clone());
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

export function retract_left(node: IFromNotNode, context: Context) {
	const tuple = removeFromLeftMemory(node, context);
	if (tuple) {
		const ctx = tuple.data;
		if (!ctx.blocked) {
			retract(node, ctx.clone());
		}
	}
}
