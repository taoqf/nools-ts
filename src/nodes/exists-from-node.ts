import FromNotNode from './from-not-node';
import Context from '../context';
import isArray from 'lodash-ts/isArray';
import WorkingMemory from '../working-memory';
import FromExistsPattern from '../pattern/from-exists-pattern';

export default class ExistsFromNode extends FromNotNode {

	nodeType = "ExistsFromNode";

	constructor(pattern: FromExistsPattern, wm: WorkingMemory) {
		super(pattern, wm)
	}

	retractLeft(context: Context) {
		const tuple = this.removeFromLeftMemory(context);
		if (tuple) {
			const ctx = tuple.data;
			if (ctx.blocked) {
				this.propagateRetract(ctx.clone());
			}
		}
	}

	protected __modify(context: Context, leftContext: Context) {
		const leftContextBlocked = leftContext.blocked;
		const fh = context.factHash, o = this.from(fh);
		if (isArray(o)) {
			context.blocked = (o as any[]).some((o) => {
				return this.__isMatch(context, o, true);
			});
		} else if (o !== undefined) {
			context.blocked = this.__isMatch(context, o, true);
		}
		const newContextBlocked = context.blocked;
		if (newContextBlocked) {
			if (leftContextBlocked) {
				this.propagateModify(context.clone());
			} else {
				this.propagateAssert(context.clone());
			}
		} else if (leftContextBlocked) {
			this.propagateRetract(context.clone());
		}

	}

	protected __findMatches(context: Context) {
		const fh = context.factHash, o = this.from(fh), isMatch = false;
		if (isArray(o)) {
			context.blocked = (o as any[]).some((o) => {
				return this.__isMatch(context, o, true);
			});
			if (context.blocked) {
				this.propagateAssert(context.clone());
			}
		} else if (o !== undefined && (this.__isMatch(context, o, true))) {
			context.blocked = true;
			this.propagateAssert(context.clone());
		}
		return isMatch;
	}

	protected __isMatch(oc: Context, o: any, add: boolean) {
		let ret = false;
		if (this.type(o)) {
			const createdFact = this.workingMemory.getFactHandle(o);
			const context = new Context(createdFact, null, null)
				.mergeMatch(oc.match)
				.set(this.alias, o);
			if (add) {
				let fm = this.fromMemory[createdFact.id];
				if (!fm) {
					fm = this.fromMemory[createdFact.id] = {};
				}
				fm[oc.hashCode] = oc;
			}
			const fh = context.factHash;
			const eqConstraints = this.__equalityConstraints;
			ret = eqConstraints.length && eqConstraints.every((eqConstraint) => {
				return eqConstraint(fh);
			});
		}
		return ret;
	}

	assertLeft(context: Context) {
		this.__addToLeftMemory(context);
		this.__findMatches(context);
	}
}