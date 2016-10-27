import ReferenceEqualityConstraint from './reference-equality-constraint';

export default class ReferenceLTConstraint extends ReferenceEqualityConstraint {
	type = 'reference_lt';
	op = 'lt';
}
