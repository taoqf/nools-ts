import Constraint from './constraint';
import instanceOf from 'lodash-ts/isinstanceof';
import {IPatternOptions} from '../interfaces';

export default class CustomConstraint extends Constraint {
	fn: (fact: any, fh?: any) => any = null;
	constructor(func: (fact: any, fh?: any) => any, options = {} as IPatternOptions) {
		super(null, options);
		this.type = "custom";
		this.fn = func;
		// extd.bindAll(this, ["assert"]);
	}

	equal(constraint: Constraint) {
		return instanceOf(constraint, CustomConstraint) && this.fn === constraint.get_constraint();
	}

	assert(fact: any, fh?: any) {
		return this.fn(fact, fh);
	}
}