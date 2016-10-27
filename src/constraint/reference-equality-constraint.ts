import ReferenceConstraint from './reference-constraint';
import {getIndexableProperties} from '../constraint-matcher';

export default class ReferenceEqualityConstraint extends ReferenceConstraint {
	type = 'reference_equality';
	op = 'eq';
	getIndexableProperties() {
		return getIndexableProperties(this.constraint);
	}
}
