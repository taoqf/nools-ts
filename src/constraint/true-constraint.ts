import Constraint from './constraint';
import instanceOf from 'lodash-ts/isinstanceof';

export default class TrueConstraint extends Constraint {
	type = "equality";

	constructor() {
		super([true]);
	}

	assert(it: any) {
		return true;
	}

	equal(constraint: Constraint) {
		return instanceOf(constraint, TrueConstraint) && this.get_alias() === constraint.get_alias();
	}
}