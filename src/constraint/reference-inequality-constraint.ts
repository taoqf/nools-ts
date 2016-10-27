import ReferenceEqualityConstraint from './reference-equality-constraint';

export default class ReferenceInequalityConstraint extends ReferenceEqualityConstraint {
	type = 'reference_inequality';
	op = 'neq';
}
