import { Hash, IPatternOptions } from '../interfaces';
import { constraintType, IConstraint, ITrueConstraint, IEqualityConstraint, IObjectConstraint, IHashConstraint, IFromConstraint, IReferenceConstraint } from '../constraint';

const funcs = new Map<constraintType, (constraint: IConstraint) => IConstraint>();

function constraint(constraint: ITrueConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	return constraint;
}

function op(options: IPatternOptions) {
	const scope = options.scope;
	const scope2: Hash = options.scope2 = {};
	if (scope) {
		for (const [k, v] of scope.entries()) {
			scope2[k] = v;
		}
		delete options.scope;
	}
	return options;
}

function equality(constraint: IEqualityConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	constraint.options = op(constraint.options);
	return constraint;
}

funcs.set(constraintType.true, constraint);
funcs.set(constraintType.equality, equality);
funcs.set(constraintType.inequality, equality);
funcs.set(constraintType.comparison, equality);
function obj(constraint: IObjectConstraint) {
	delete constraint.constraint;
	delete constraint.assert;
	delete constraint.equal;
	return constraint;
}
funcs.set(constraintType.object, obj);
funcs.set(constraintType.hash, constraint);
function from(constraint: IFromConstraint) {
	delete constraint.constraint;
	delete constraint.assert;
	delete constraint.equal;
	constraint.options = op(constraint.options);
	return constraint;
}
funcs.set(constraintType.from, from);
function reference(constraint: IReferenceConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	delete constraint.getIndexableProperties;
	constraint.options = op(constraint.options);
	return constraint;
}
funcs.set(constraintType.reference, reference);
funcs.set(constraintType.reference_equality, reference);
funcs.set(constraintType.reference_inequality, reference);
funcs.set(constraintType.reference_gt, reference);
funcs.set(constraintType.reference_gte, reference);
funcs.set(constraintType.reference_lt, reference);
funcs.set(constraintType.reference_lte, reference);

export default function cst(constraint: IConstraint) {
	const fun = funcs.get(constraint.type);
	return fun(constraint);
}