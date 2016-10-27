import ObjectPattern from './object-pattern';
import {ICondition, IPatternOptions} from '../interfaces';
import FromConstraint from '../constraint/from-constraint';

export default class FromPattern extends ObjectPattern {
	public from: FromConstraint;
	constructor(type: any, alias: string, conditions: ICondition, store: any, from: ICondition, options?: IPatternOptions) {
		super(type, alias, conditions, store, options);
		this.from = new FromConstraint(from, options);
	}

	hasConstraint(type: any) {
		return this.constraints.some(function (c) {
			return c instanceof type;
		});
	}

	getSpecificity() {
		return super.getSpecificity() + 1;
	}

	hashCode() {
		// return [this.type, this.alias, extd.format("%j", this.conditions), this.from.from].join(":");		// todo:
		return [this.type, this.alias, JSON.stringify(this.constraints), this.from.get_alias()].join(":");
	}

	toString() {
		return JSON.stringify(this.constraints) + this.from.get_alias();
		// return extd.format("%j from %s", this.constraints, this.from.from);	// todo:
	}
}