import clone from 'lodash-ts/clone';
import isEqual from 'lodash-ts/isEqual';
import { IPatternOptions } from '../interfaces';
import { ConstraintType, IConstraint, ITrueConstraint, IEqualityConstraint, IObjectConstraint, IHashConstraint, IFromConstraint, IReferenceConstraint, is_instance_of_reference_constraint } from '../constraint';
import { getMatcher, getSourceMatcher, getIndexableProperties } from '../constraint-matcher';

const funcs = new Map<ConstraintType, (constraint: IConstraint, defines: Map<string, any>) => IConstraint>();

function true_constraint(constraint: ITrueConstraint): ITrueConstraint {
	const alias = constraint.alias;
	return {
		type: 'true',
		alias: alias,
		assert(it) {
			return true;
		},
		equal(that: IConstraint) {
			return that.type == 'true' && alias === that.alias;
		}
	};
}
funcs.set('true', true_constraint);

	const scope = new Map<string, any>();
function op(options: IPatternOptions) {
	// const scope2 = options.scope2;
	// for(const name in scope2){
	// 	scope.set(name, scope2[name]);
	// }
	return {
		scope: scope,
		pattern: options.pattern,
		alias: options.alias
	};
}

function equality(constraint: IEqualityConstraint) {
	const options = op(constraint.options);
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
funcs.set('equality', equality);
funcs.set('inequality', equality);
funcs.set('comparison', equality);
function obj(constraint: IObjectConstraint, defines: Map<string, any>): IObjectConstraint {
	const cls = defines.get(constraint.cls);
	const alias = constraint.alias;
	return {
		type: 'object',
		alias: alias,
		constraint: cls,
		assert(fact: any, fh?: any) {
			return fact instanceof cls || fact.constructor === cls;
		},
		equal(that: IConstraint) {
			return that.type === 'object' && cls === (that as IObjectConstraint).constraint;		// todo: isEqual?????
		}
	};
}
funcs.set('object', obj);
function hash(constraint: IHashConstraint, defines: Map<string, any>): IHashConstraint {
	const alias = constraint.alias;
	const cst = clone(constraint.constraint);
	return {
		type: 'hash',
		alias: alias,
		constraint: cst,
		assert(fact: any, fh?: any) {
			return true;
		},
		equal(that: IConstraint) {
			return that.type === 'hash' && that.alias === alias && isEqual(cst, (that as IHashConstraint).constraint);
		}
	};
}
funcs.set('hash', hash);
function from(constraint: IFromConstraint): IFromConstraint {
	const alias = constraint.alias;
	const condition = constraint.condition;
	const options = op(constraint.options);
	const matcher = getSourceMatcher(condition, options, true);
	return {
		type: 'from',
		options: options,
		condition: condition,
		alias: alias,
		constraint: matcher,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return that.type === 'from' && that.alias === alias && isEqual(condition, (that as IFromConstraint).constraint);
		}
	};
}
funcs.set('from', from);
function reference(constraint: IReferenceConstraint) {
	const alias = constraint.alias;
	const options = op(constraint.options);
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

export default function cst(constraint: IConstraint, defines: Map<string, any>) {
	const fun = funcs.get(constraint.type);
	return fun(constraint, defines);
}