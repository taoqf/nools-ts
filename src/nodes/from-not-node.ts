import JoinNode from './join-node';
import { IFromPattern } from '../pattern';
import Context from '../context';
import WorkingMemory from '../working-memory';
import Fact from '../facts/fact';
import { IConstraint, is_instance_of_equality, is_instance_of_reference_constraint, is_instance_of_hash } from '../constraint';
import isArray from 'lodash-ts/isArray';

export default class FromNotNode extends JoinNode {
	nodeType = "FromNotNode";
	workingMemory: WorkingMemory;
	pattern: IFromPattern;
	fromMemory = {} as { [id: number]: { [hashCode: string]: Context }; };
	protected __variables: any[];
	type: (it: any) => boolean;
	from: (fact: any, fh?: any) => any;
	alias: string;
	protected __equalityConstraints: { (factHanle1: Map<string, Fact>, factHandle2?: Map<string, Fact>): boolean; }[] = [];
	constraints: IConstraint[];

	constructor(pattern: IFromPattern, workingMemory: WorkingMemory) {
		super();
		this.workingMemory = workingMemory;
		this.pattern = pattern;
		this.type = (it: any) => {
			return pattern.constraints[0].assert(it);
		}
		this.alias = pattern.alias;
		this.from = pattern.from.assert;
		this.fromMemory = {};
		const eqConstraints = this.__equalityConstraints;
		let vars: any[] = [];
		this.constraints = this.pattern.constraints.slice(1);
		this.constraints.forEach((c) => {
			if (is_instance_of_equality(c) || is_instance_of_reference_constraint(c)) {
				eqConstraints.push(c.assert);
			} else if (is_instance_of_hash(c)) {
				debugger;
				vars = vars.concat(c.constraint);
			}
		});
		this.__variables = vars;

	}

	retractLeft(context: Context) {
		const tuple = this.removeFromLeftMemory(context);
		if (tuple) {
			const ctx = tuple.data;
			if (!ctx.blocked) {
				this.propagateRetract(ctx.clone());
			}
		}
	}

	protected __modify(context: Context, leftContext: Context) {
		const leftContextBlocked = leftContext.blocked;
		const fh = context.factHash, o = this.from(fh);
		if (isArray(o)) {
			(o as any[]).some((o) => {
				if (this.__isMatch(context, o, true)) {
					context.blocked = true;
					return true;
				} else {
					return false;
				}
			});
		} else if (o !== undefined) {
			context.blocked = this.__isMatch(context, o, true);
		}
		const newContextBlocked = context.blocked;
		if (!newContextBlocked) {
			if (leftContextBlocked) {
				this.propagateAssert(context.clone());
			} else {
				this.propagateModify(context.clone());
			}
		} else if (!leftContextBlocked) {
			this.propagateRetract(leftContext.clone());
		}

	}

	modifyLeft(context: Context) {
		const ctx = this.removeFromLeftMemory(context);
		if (ctx) {
			this.__addToLeftMemory(context);
			this.__modify(context, ctx.data);
		} else {
			throw new Error();
		}
		const fm = this.fromMemory[context.fact.id];
		this.fromMemory[context.fact.id] = {};
		if (fm) {
			for (const i in fm) {
				// update any contexts associated with this fact
				if (i !== context.hashCode) {
					const lc = fm[i];
					const ctx = this.removeFromLeftMemory(lc);
					if (ctx) {
						const lc_cp = lc.clone();
						lc_cp.blocked = false;
						this.__addToLeftMemory(lc_cp);
						this.__modify(lc_cp, ctx.data);
					}
				}
			}
		}
	}

	protected __findMatches(context: Context) {
		const fh = context.factHash, o = this.from(fh), isMatch = false;
		if (isArray(o)) {
			(o as any[]).some((o) => {
				if (this.__isMatch(context, o, true)) {
					context.blocked = true;
					return true;
				} else {
					return false;
				}
			});
			this.propagateAssert(context.clone());
		} else if (o !== undefined && !(context.blocked = this.__isMatch(context, o, true))) {
			this.propagateAssert(context.clone());
		}
		return isMatch;
	}

	protected __isMatch(oc: Context, o: any, add: boolean) {
		let ret = false;
		if (this.type(o)) {
			const createdFact = this.workingMemory.getFactHandle(o);
			const context = new Context(createdFact, null)
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
			ret = this.__equalityConstraints.every((eqConstraint) => {
				return eqConstraint(fh, fh);
			});
		}
		return ret;
	}

	assertLeft(context: Context) {
		this.__addToLeftMemory(context);
		this.__findMatches(context);
	}

	assertRight() {
		throw new Error("Shouldnt have gotten here");
	}

	retractRight() {
		throw new Error("Shouldnt have gotten here");
	}

}