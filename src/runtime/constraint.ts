import clone from 'lodash-ts/clone';
import isEqual from 'lodash-ts/isEqual';
import { IPatternOptions } from '../interfaces';
import { constraintType, IConstraint, ITrueConstraint, IEqualityConstraint, IObjectConstraint, IHashConstraint, IFromConstraint, IReferenceConstraint, is_instance_of_reference_constraint } from '../constraint';
import { getMatcher, getSourceMatcher, getIndexableProperties } from '../constraint-matcher';

const funcs = new Map<constraintType, (constraint: IConstraint, defines: Map<string, any>, scope: Map<string, any>) => IConstraint>();

function true_constraint(constraint: ITrueConstraint): ITrueConstraint {
	const alias = constraint.alias;
	return {
		type: constraintType.true,
		alias: alias,
		assert(it) {
			return true;
		},
		equal(that: IConstraint) {
			return that.type == constraintType.true && alias === that.alias;
		}
	};
}
funcs.set(constraintType.true, true_constraint);

function op(options: IPatternOptions, scope: Map<string, any>) {
	const scope2 = options.scope2;
	if(scope2){
		scope = clone(scope);
		for(const name in scope2){
			scope.set(name, scope2[name]);
		}
	}
	return {
		scope: scope,
		pattern: options.pattern,
		alias: options.alias
	};
}

function equality(constraint: IEqualityConstraint, defines: Map<string, any>, scope: Map<string, any>) {
	const options = op(constraint.options, scope);
	const cst = constraint.constraint;
	const matcher = getMatcher(cst, options, true);
	const alias = constraint.alias;
	return {
		// pattern: options.pattern,	// todo:::: can this be removed?
		type: constraint.type,
		alias: alias,
		constraint: cst,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return /*constraint.type == 'equality' && */ that.alias == alias, isEqual(cst, (that as IEqualityConstraint).constraint);
		}
	};
}
funcs.set(constraintType.equality, equality);
funcs.set(constraintType.inequality, equality);
funcs.set(constraintType.comparison, equality);
function obj(constraint: IObjectConstraint, defines: Map<string, any>): IObjectConstraint {
	const cls = defines.get(constraint.cls);
	const alias = constraint.alias;
	return {
		type: constraintType.object,
		alias: alias,
		constraint: cls,
		assert(fact: any, fh?: any) {
			return fact instanceof cls || fact.constructor === cls;
		},
		equal(that: IConstraint) {
			return that.type === constraintType.object && cls === (that as IObjectConstraint).constraint;		// todo: isEqual?????
		}
	};
}
funcs.set(constraintType.object, obj);
function hash(constraint: IHashConstraint, defines: Map<string, any>): IHashConstraint {
	const alias = constraint.alias;
	const cst = clone(constraint.constraint);
	return {
		type: constraintType.hash,
		alias: alias,
		constraint: cst,
		assert(fact: any, fh?: any) {
			return true;
		},
		equal(that: IConstraint) {
			return that.type === constraintType.hash && that.alias === alias && isEqual(cst, (that as IHashConstraint).constraint);
		}
	};
}
funcs.set(constraintType.hash, hash);
function from(constraint: IFromConstraint, defines: Map<string, any>, scope: Map<string, any>): IFromConstraint {
	const alias = constraint.alias;
	const condition = constraint.condition;
	const options = op(constraint.options, scope);
	const matcher = getSourceMatcher(condition, options, true);
	return {
		type: constraintType.from,
		options: options,
		condition: condition,
		alias: alias,
		constraint: matcher,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return that.type === constraintType.from && that.alias === alias && isEqual(condition, (that as IFromConstraint).constraint);
		}
	};
}
funcs.set(constraintType.from, from);
function reference(constraint: IReferenceConstraint, defines: Map<string, any>, scope: Map<string, any>) {
	const alias = constraint.alias;
	const options = op(constraint.options, scope);
	const cst = constraint.constraint;
	const matcher = getMatcher(cst, options, false);
	return {
		options: options,
		op: constraint.op,
		type: constraint.type,
		alias: alias,
		constraint: cst,
		vars: clone(constraint.vars, true),
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		getIndexableProperties() {
			return getIndexableProperties(cst);
		},
		equal(that: IConstraint) {
			return is_instance_of_reference_constraint(that) && isEqual(cst, (that as IReferenceConstraint).constraint);
		}
	};
}
funcs.set(constraintType.reference, reference);
funcs.set(constraintType.reference_equality, reference);
funcs.set(constraintType.reference_inequality, reference);
funcs.set(constraintType.reference_gt, reference);
funcs.set(constraintType.reference_gte, reference);
funcs.set(constraintType.reference_lt, reference);
funcs.set(constraintType.reference_lte, reference);
funcs.set(constraintType.reference, reference);
funcs.set(constraintType.reference, reference);
funcs.set(constraintType.reference, reference);

export default function cst(constraint: IConstraint, defines: Map<string, any>, scope: Map<string, any>) {
	const fun = funcs.get(constraint.type);
	return fun(constraint, defines, scope);
}