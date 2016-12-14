import { Hash, IPatternOptions } from '../interfaces';
import { ConstraintType, IConstraint, ITrueConstraint, IEqualityConstraint, IObjectConstraint, IHashConstraint, IFromConstraint, IReferenceConstraint } from '../constraint';

const funcs = new Map<ConstraintType, (constraint: IConstraint) => IConstraint>();

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

funcs.set('true', constraint);
funcs.set('equality', equality);
funcs.set('inequality', equality);
funcs.set('comparison', equality);
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
	constraint.options = op(constraint.options);
	return constraint;
}
funcs.set('from', from);
function reference(constraint: IReferenceConstraint) {
	delete constraint.assert;
	delete constraint.equal;
	delete constraint.getIndexableProperties;
	constraint.options = op(constraint.options);
	return constraint;
}
funcs.set('reference', reference);
funcs.set('reference_equality', reference);
funcs.set('reference_inequality', reference);
funcs.set('reference_gt', reference);
funcs.set('reference_gte', reference);
funcs.set('reference_lt', reference);
funcs.set('reference_lte', reference);

export default function cst(constraint: IConstraint) {
	const fun = funcs.get(constraint.type);
	return fun(constraint);
}