import { ConstraintType, IConstraint, ITrueConstraint, IEqualityConstraint, IObjectConstraint, IHashConstraint, IFromConstraint, IReferenceConstraint } from '../constraint';

const funcs = new Map<ConstraintType, (constraint: IConstraint) => IConstraint>();

function constraint(constraint: ITrueConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	return constraint;
}
funcs.set('true', constraint);
funcs.set('equality', constraint);
funcs.set('inequality', constraint);
funcs.set('comparison', constraint);
function obj(constraint: IObjectConstraint) {
	delete constraint.constraint;
	delete constraint.assert;
	delete constraint.equal;
	return constraint;
}
funcs.set('object', obj);
funcs.set('hash', constraint);
function from(constraint: IFromConstraint) {
	delete constraint.constraint;
	delete constraint.assert;
	delete constraint.equal;
	return constraint;
}
funcs.set('from', from);
function reference(constraint: IReferenceConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	delete constraint.getIndexableProperties;
	return constraint;
}
funcs.set('reference', reference);
funcs.set('reference_equality', reference);
funcs.set('reference_inequality', reference);
funcs.set('reference_gt', reference);
funcs.set('reference_gte', reference);
funcs.set('reference_lt', reference);
funcs.set('reference_lte', reference);
funcs.set('reference', reference);
funcs.set('reference', reference);
funcs.set('reference', reference);

export default function cst(constraint: IConstraint) {
	const fun = funcs.get(constraint.type);
	return fun(constraint);
}