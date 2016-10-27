import ReferenceEqualityConstraint from './reference-equality-constraint';

export default class ReferenceLTEConstraint extends ReferenceEqualityConstraint {
	type = 'reference_lte';
	op = 'lte';
}
