import Constraint from './constraint';
import instanceOf from 'lodash-ts/isinstanceof';
import isEqual from 'lodash-ts/isEqual';

export default class HashConstraint extends Constraint {
	type = "hash";

	constructor(hash: any) {
		super(hash);
	}

	assert(it: any) {
		return true;
	}

	equal(constraint: HashConstraint) {
		return instanceOf(constraint, HashConstraint) && this.get_alias() === constraint.get_alias() && isEqual(this.constraint, constraint.constraint);
	}

	// get_variables() {
	// 	return this.constraint;
	// }

	get_vars() {
		return this.constraint;
	}
}