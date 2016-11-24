import Constraint from './constraint';
import instanceOf from 'lodash-ts/isinstanceof';
import mixin from 'lodash-ts/mixin';
import isEqual from 'lodash-ts/isEqual';
import { IPatternOptions, ICondition } from '../interfaces';
import { getMatcher } from '../constraint-matcher';
import Fact from '../facts/fact';

export default class ReferenceConstraint extends Constraint {
	protected type = "reference";
	protected pattern: string;
	// protected _options: IPatternOptions;
	protected _matcher: (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) => boolean = null;
	constructor(constraint: ICondition, options = {} as IPatternOptions) {
		super(constraint, options);
		// this.cache = {};
		// this.values = [];
		this.pattern = options.pattern;
		this._matcher = getMatcher(constraint, options, false);
	}

	assert(factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) {
		try {
			return this._matcher(factHanle1, factHandle2);
		} catch (e) {
			throw new Error("Error with evaluating pattern " + this.pattern + " " + e.message);
		}

	}

	merge(that: ReferenceConstraint) {
		let ret: ReferenceConstraint = this;
		if (that instanceof ReferenceConstraint) {
			ret = new ReferenceConstraint([this.constraint, that.constraint, "and"], mixin({}, this.options));
			ret.set_alias(this.get_alias() || that.get_alias());
			ret.vars = this.vars.concat(that.vars);
		}
		return ret;
	}

	equal(constraint: ReferenceConstraint) {
		return instanceOf(constraint, ReferenceConstraint) && isEqual(this.constraint, constraint.constraint);
	}

	get_variables() {
		return this.vars;
	}

	get_alias() {
		return this.alias;
	}
}