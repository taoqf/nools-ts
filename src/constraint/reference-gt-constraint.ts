import ReferenceEqualityConstraint from './reference-equality-constraint';

export default class ReferenceGTConstraint extends ReferenceEqualityConstraint {
	type = 'reference_gt';
	op = 'gt';
}
