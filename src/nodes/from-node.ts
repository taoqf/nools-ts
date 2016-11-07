import JoinNode from './join-node';
import FromPattern from '../pattern/from-pattern';
import Context from '../context';
import WorkingMemory from '../working-memory';
import Constraint from '../constraint/constraint';
import ReferenceConstraint from '../constraint/reference-constraint';
import EqualityConstraint from '../constraint/equality-constraint';
import HashConstraint from '../constraint/hash-constraint';
import isArray from 'lodash-ts/isArray';
import isEmpty from 'lodash-ts/isEmpty';
import Fact from '../facts/fact';

const DEFAULT_MATCH = {
	isMatch: function () {
		return false;
	}
};
export default class FromNode extends JoinNode {
	nodeType = "FromNode";
	workingMemory: WorkingMemory;
	pattern: FromPattern;
	alias: string;
	type: (it: any) => boolean;
	from: (fact: any, fh?: any) => any;
	constraints: Constraint[];
	fromMemory = {} as { [id: number]: { [hashCode: string]: [Context, Context] }; };
	protected __equalityConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[] = [];
	protected __variables: any[];
	constructor(pattern: FromPattern, wm: WorkingMemory) {
		super();
		this.workingMemory = wm;
		this.pattern = pattern;
		this.type = (it: any) => {
			return pattern.constraints[0].assert(it);
		};
		this.alias = pattern.alias;
		this.from = (fact: any, fh?: any) => {
			return pattern.from.assert(fact, fh);
		};
		const eqConstraints = this.__equalityConstraints;
		let vars: any[] = [];
		this.constraints = this.pattern.constraints.slice(1);
		this.constraints.forEach(function (c) {
			if (c instanceof EqualityConstraint || c instanceof ReferenceConstraint) {
				eqConstraints.push(c.assert);
			} else if (c instanceof HashConstraint) {
				// todo: need debug
				vars = vars.concat(c.get_vars());
			}
		});
		this.__variables = vars;
	}

	protected __createMatches(context: Context) {
		const fh = context.factHash, o = this.from(fh);
		if (isArray(o)) {
			(o as any[]).forEach((o) => {
				this.__checkMatch(context, o, true);
			});
		} else if (o !== undefined) {
			this.__checkMatch(context, o, true);
		}
	}

	protected __checkMatch(context: Context, o: any, propogate = false) {
		const newContext = this.__createMatch(context, o);
		if (newContext.isMatch() && propogate) {
			this.propagateAssert(newContext.clone());
		}
		return newContext;
	}

	protected __createMatch(lc: Context, o: any) {
		if (this.type(o)) {
			const createdFact = this.workingMemory.getFactHandle(o);
			const rc = new Context(createdFact, null, null)
				.set(this.alias, o);
			const createdFactId = createdFact.id;
			const fh = rc.factHash, lcFh = lc.factHash;
			for (const [key, fact] of lcFh) {
				fh.set(key, fact);
			}
			let fm = this.fromMemory[createdFactId];
			if (!fm) {
				fm = this.fromMemory[createdFactId] = {} as any;
			}
			const eqConstraints = this.__equalityConstraints;
			if (eqConstraints.some((eqConstraint) => {
				if (!eqConstraint(fh, fh)) {
					return true;
				} else {
					return false;
				}
			})) {
				const createdContext = DEFAULT_MATCH as any as Context;
				fm[lc.hashCode] = [lc, createdContext];
				return createdContext;
			} else {
				this.__variables.forEach((prop) => {
					fh.set(prop, o[prop]);
				});
				const createdContext = rc.clone(createdFact, null, lc.match.merge(rc.match));
				lc.fromMatches[createdFact.id] = createdContext;
				fm[lc.hashCode] = [lc, createdContext];
				return createdContext;
			}
		}
		return DEFAULT_MATCH as any as Context;
	}

	retractRight() {
		throw new Error("Shouldnt have gotten here");
	}

	removeFromFromMemory(context: Context) {
		const factId = context.fact.id;
		const fm = this.fromMemory[factId];
		if (fm) {
			for (const i in fm) {
				const entry = fm[i];
				if (entry[1] === context) {
					delete fm[i];
					if (isEmpty(fm)) {
						delete this.fromMemory[factId];
					}
					break;
				}
			}
		}

	}

	retractLeft(context: Context) {
		const tuple = this.removeFromLeftMemory(context);
		if (tuple) {
			const ctx = tuple.data;
			const fromMatches = ctx.fromMatches;
			for (const i in fromMatches) {
				this.removeFromFromMemory(fromMatches[i]);
				this.propagateRetract(fromMatches[i].clone());
			}
		}
	}

	modifyLeft(context: Context) {
		const ctx = this.removeFromLeftMemory(context);
		// newContext, i, l, factId, fact;
		if (ctx) {
			this.__addToLeftMemory(context);
			const leftContext = ctx.data;
			context.fromMatches = {};
			const fromMatches = context.fromMatches;
			const rightMatches = leftContext.fromMatches;
			const o = this.from(context.factHash);

			if (isArray(o)) {
				(o as any[]).forEach((o) => {
					const newContext = this.__checkMatch(context, o, false);
					if (newContext.isMatch()) {
						const factId = newContext.fact.id;
						if (factId in rightMatches) {
							this.propagateModify(newContext.clone());
						} else {
							this.propagateAssert(newContext.clone());
						}
					}
				});
			} else if (o !== undefined) {
				const newContext = this.__checkMatch(context, o, false);
				if (newContext.isMatch()) {
					const factId = newContext.fact.id;
					if (factId in rightMatches) {
						this.propagateModify(newContext.clone());
					} else {
						this.propagateAssert(newContext.clone());
					}
				}
			}
			for (const i in rightMatches) {
				if (!(i in fromMatches)) {
					this.removeFromFromMemory(rightMatches[i]);
					this.propagateRetract(rightMatches[i].clone());
				}
			}
		} else {
			this.assertLeft(context);
		}
		const fact = context.fact;
		const factId = fact.id;
		const fm = this.fromMemory[factId];
		this.fromMemory[factId] = {};
		if (fm) {
			const factObject = fact.object;
			// lc, entry, cc, createdIsMatch,
			for (const i in fm) {
				const entry = fm[i];
				const lc = entry[0];
				const cc = entry[1];
				const createdIsMatch = cc.isMatch();
				if (lc.hashCode !== context.hashCode) {
					const newContext = this.__createMatch(lc, factObject);
					if (createdIsMatch) {
						this.propagateRetract(cc.clone());
					}
					if (newContext.isMatch()) {
						createdIsMatch ? this.propagateModify(newContext.clone()) : this.propagateAssert(newContext.clone());
					}
				}
			}
		}
	}

	assertLeft(context: Context) {
		this.__addToLeftMemory(context);
		context.fromMatches = {};
		this.__createMatches(context);
	}

	assertRight() {
		throw new Error("Shouldnt have gotten here");
	}

}