import Constraint from './constraint';
import isEqual from 'lodash-ts/isEqual';
import instanceOf from 'lodash-ts/isinstanceof';
import {IPatternOptions, ICondition} from '../interfaces';
import {getSourceMatcher} from '../constraint-matcher';

export default class FromConstraint extends Constraint {
	type = "from";
	constraints: any = null;
	constructor(constraints: ICondition, options = {} as IPatternOptions) {
		super(null, options);
		this.constraints = getSourceMatcher(constraints as ICondition, options, true);
		// extd.bindAll(this, ["assert"]);
	}

	equal(constraint: FromConstraint) {
		return instanceOf(constraint, FromConstraint) && this.get_alias() === constraint.get_alias() && isEqual(this.constraints, constraint.constraints);
	}

	assert(fact: any, fh?: any) {
		return this.constraints(fact, fh);
	}

	get_variables() {
		return this.constraint;
	}
}