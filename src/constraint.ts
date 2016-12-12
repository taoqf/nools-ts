import instanceOf from 'lodash-ts/isinstanceof';
import isEqual from 'lodash-ts/isEqual';
import mixin from 'lodash-ts/mixin';
import { Hash, IPatternOptions, ICondition } from './interfaces';
import { getMatcher, getSourceMatcher, getIdentifiers, getIndexableProperties } from './constraint-matcher';

export type ConstraintType =
	'comparison' |	// > >= < <= !=
	'custom' |		// when type is function, actually I don't need this since we have `class`
	'equality' |	// ==,TrueConstraint
	'from' |		// from
	'hash' |		// {count: $count}
	'inequality' |	// > >= < <= !=
	'object' |
	'reference' |
	'reference_equality' |
	'reference_gt' |
	'reference_gte' |
	'reference_inequality' |
	'reference_lt' |
	'reference_lte' |
	'true';

export interface IConstraint {
	type: ConstraintType;
	alias: string;
	assert?(fact: any, fh?: any): any;
	equal?(constraint: IConstraint): boolean;
	// options: IPatternOptions;
	// vars: any;
}

export interface ITrueConstraint extends IConstraint { }

export function create_true_constraint(alias: string): ITrueConstraint {
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

export interface ICustomConstraint extends IConstraint {
	fn(fact: any, fh?: any): any;
}

export function create_custom_constraint(alias: string, matcher: (fact: any, fh?: any) => any): ICustomConstraint {
	return {
		type: 'custom',
		fn: matcher,
		alias: alias,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return that.type == 'custom' && matcher === (that as ICustomConstraint).fn;
		}
	};
}

function _create_equality_constraint(type: ConstraintType, alias: string, constraint: ICondition, options = {} as IPatternOptions): IEqualityConstraint {
	const matcher = getMatcher(constraint, options, true);
	return {
		pattern: options.pattern,
		type: type,
		alias: alias,
		constraint: constraint,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return /*constraint.type == 'equality' && */ that.alias == alias, isEqual(constraint, (that as IEqualityConstraint).constraint);
		}
	};
}

export interface IEqualityConstraint extends IConstraint {
	constraint: ICondition;
	pattern: string;	// todo: pattern and type are not needed.
}

export function create_equality_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IEqualityConstraint {
	return _create_equality_constraint('equality', alias, constraint, options);
}

export interface IInequalityConstraint extends IEqualityConstraint {
}

export function create_inequality_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IInequalityConstraint {
	return _create_equality_constraint('inequality', alias, constraint, options);
}

export interface IComparisonConstraint extends IEqualityConstraint {
}

export function create_comparison_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IComparisonConstraint {
	return _create_equality_constraint('comparison', alias, constraint, options);
}

export interface IObjectConstraint extends IConstraint {
	cls: string;
	constraint: any;	// class: String, Number, Boolean... etc
}

export function create_object_constraint(alias: string, cls: string, constraint: any): IObjectConstraint {
	return {
		type: 'object',
		alias: alias,
		cls: cls,
		constraint: constraint,
		assert(fact: any, fh?: any) {
			return fact instanceof constraint || fact.constructor === constraint;
		},
		equal(that: IConstraint) {
			return that.type === 'object' && constraint === (that as IObjectConstraint).constraint;
		}
	};
}
export interface IHashConstraint extends IConstraint {
	constraint: Hash;	// store: {}
}

export function create_hash_constraint(alias: string, constraint: Hash): IHashConstraint {
	return {
		type: 'hash',
		alias: alias,
		constraint: constraint,
		assert(fact: any, fh?: any) {
			return true;
		},
		equal(that: IConstraint) {
			return that.type === 'hash' && that.alias === alias && isEqual(constraint, (that as IHashConstraint).constraint);
		}
	};
}

export interface IFromConstraint extends IConstraint {
	constraint: Function;
}

export function create_from_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IFromConstraint {
	const matcher = getSourceMatcher(constraint, options, true);
	return {
		type: 'from',
		alias: alias,
		constraint: matcher,
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		equal(that: IConstraint) {
			return that.type === 'from' && that.alias === alias && isEqual(constraint, (that as IFromConstraint).constraint);
		}
	};
}

export interface IReferenceConstraint extends IConstraint {
	pattern: string;	// todo: pattern and type are not needed.
	op: string;
	constraint: ICondition;
	merge(that: IReferenceConstraint): IReferenceConstraint;
	getIndexableProperties(): string[];
	vars: string[];
}

enum enumReferenceOp {
	none,
	eq,
	gt,
	gte,
	neq,
	lt,
	lte
}

export function is_instance_of_equality(constraint: IConstraint) {
	return constraint.type === 'equality' || constraint.type === 'inequality' || constraint.type == 'comparison';
}

export function is_instance_of_hash(constraint: IConstraint) {
	return constraint.type === 'hash';
}

export function is_instance_of_reference_constraint(constraint: IConstraint) {
	return constraint.type === 'reference' || constraint.type === 'reference_equality' || constraint.type === 'reference_gt' || constraint.type === 'reference_gte' || constraint.type === 'reference_inequality' || constraint.type === 'reference_lt' || constraint.type === 'reference_lte';
}

export function is_instance_of_reference_eq_constraint(constraint: IConstraint) {
	return constraint.type === 'reference_equality' || constraint.type === 'reference_gt' || constraint.type === 'reference_gte' || constraint.type === 'reference_inequality' || constraint.type === 'reference_lt' || constraint.type === 'reference_lte';
}

function _create_reference_constraint(type: ConstraintType, op: string, alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceConstraint {
	const matcher = getMatcher(constraint, options, false);
	return {
		pattern: options.pattern,
		op: op,
		type: type,
		alias: alias,
		constraint: constraint,
		vars: getIdentifiers(constraint).filter((v) => {
			return v !== alias;
		}),
		assert(fact: any, fh?: any) {
			return matcher(fact, fh);
		},
		getIndexableProperties() {
			return getIndexableProperties(constraint);
		},
		merge(that: IConstraint) {
			if (is_instance_of_reference_constraint(that)) {
				return _create_reference_constraint(type, op, alias || that.alias, [constraint, (that as IReferenceConstraint).constraint, "and"], mixin({}, options));
			} else {
				return _create_reference_constraint(type, op, alias, constraint, options);	// return this;
			}
		},
		equal(that: IConstraint) {
			return is_instance_of_reference_constraint(that) && isEqual(constraint, (that as IReferenceConstraint).constraint);
		}
	};
}

export function create_reference_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions) {
	return _create_reference_constraint('reference', 'none', alias, constraint, options);
}

export interface IReferenceEqualityConstraint extends IReferenceConstraint {
	getIndexableProperties(): string[];
}

export function create_reference_equality_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceEqualityConstraint {
	return _create_reference_constraint('reference_equality', 'eq', alias, constraint, options);
}

export interface IReferenceInequalityConstraint extends IReferenceConstraint {
}

export function create_reference_inequality_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceInequalityConstraint {
	return _create_reference_constraint('reference_inequality', 'neq', alias, constraint, options);
}

export interface IReferenceGTConstraint extends IReferenceConstraint {
}

export function create_reference_gt_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceGTConstraint {
	return _create_reference_constraint('reference_gt', 'gt', alias, constraint, options);
}

export interface IReferenceGTEConstraint extends IReferenceConstraint {
}

export function create_reference_gte_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceGTEConstraint {
	return _create_reference_constraint('reference_gte', 'gte', alias, constraint, options);
}

export interface IReferenceLTConstraint extends IReferenceConstraint {
}

export function create_reference_lt_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceLTConstraint {
	return _create_reference_constraint('reference_lt', 'lt', alias, constraint, options);
}

export interface IReferenceLTEConstraint extends IReferenceConstraint {
}

export function create_reference_lte_constraint(alias: string, constraint: ICondition, options = {} as IPatternOptions): IReferenceLTEConstraint {
	return _create_reference_constraint('reference_lte', 'lte', alias, constraint, options);
}
