import ReferenceEqualityConstraint from './reference-equality-constraint';

export default class ReferenceGTEConstraint extends ReferenceEqualityConstraint {
	type = 'reference_gte';
	op = 'gte';
}
