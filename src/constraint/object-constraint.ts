import Constraint from './constraint';
import instanceOf from 'lodash-ts/isinstanceof';

export default class ObjectConstraint extends Constraint {
	type = "object";

	constructor(constraint: any) {
		super(constraint);
	}

	assert(it: any) {
		return it instanceof (this.constraint as any) || it.constructor === this.constraint;
	}

	equal(constraint: ObjectConstraint) {
		return instanceOf(constraint, ObjectConstraint) && this.constraint === constraint.constraint;
	}
}