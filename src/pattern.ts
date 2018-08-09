import isNumber from 'lodash-ts/isNumber';
import isEmpty from 'lodash-ts/isEmpty';
import isString from 'lodash-ts/isString';
import isHash from 'lodash-ts/isHash';
import isFunction from 'lodash-ts/isFunction';
import isEqual from 'lodash-ts/isEqual';
import flattenDeep from 'lodash-ts/flattenDeep';
// import isBoolean from 'lodash-ts/isBoolean';
// import isArray from 'lodash-ts/isArray';
import mixin from 'lodash-ts/mixin';
import { Hash, IContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ICondition, IPatternOptions } from './interfaces';
import { getIdentifiers } from './constraint-matcher';
import InitialFact from './facts/initial';
import baseParseConstraint from './compile/parser/constraint';
import { IConstraint, create_true_constraint, create_equality_constraint, create_inequality_constraint, create_comparison_constraint, create_object_constraint, create_hash_constraint, create_from_constraint, create_reference_constraint, create_reference_equality_constraint, create_reference_inequality_constraint, create_reference_gt_constraint, create_reference_lt_constraint, create_reference_gte_constraint, create_reference_lte_constraint } from './constraint';

export enum patternType {
	composite,
	object,
	exists,
	from,
	from_exists,
	from_not,
	initial_fact,
	not
}

export interface IPattern {
	id: number;
	tp: patternType;
}

export interface IObjectPattern extends IPattern {
	id: number;
	cls?: string;
	class_type: any;
	a: string;
	pattern: string;
	constraints: number[];
}
import { IFromConstraint } from './constraint';

export interface IFromPattern extends IObjectPattern {
	from: IFromConstraint;
}

export interface IExistsPattern extends IObjectPattern {
}

export interface IFromExistsPattern extends IFromPattern {
}

export interface IFromNotPattern extends IFromPattern {
}

export interface INotPattern extends IObjectPattern {
}

export interface IInitialFactPattern extends IObjectPattern {
}

export interface ICompositePattern extends IPattern {
	id: number;
	leftPattern: IPattern;
	rightPattern: IPattern;
}

const definedFuncs = {
	// indexOf: extd.indexOf,
	now: function () {
		return new Date();
	},

	Date: function (y?: number, m?: number, d?: number, h?: number, min?: number, s?: number, ms?: number) {
		const date = new Date();
		if (isNumber(y)) {
			date.setFullYear(y);
			// date.setYear(y);
		}
		if (isNumber(m)) {
			date.setMonth(m);
		}
		if (isNumber(d)) {
			date.setDate(d);
		}
		if (isNumber(h)) {
			date.setHours(h);
		}
		if (isNumber(min)) {
			date.setMinutes(min);
		}
		if (isNumber(s)) {
			date.setSeconds(s);
		}
		if (isNumber(ms)) {
			date.setMilliseconds(ms);
		}
		return date;
	},

	lengthOf: function (arr: any[], length: number) {
		return arr.length === length;
	},

	isTrue: function (val: any) {
		return val === true;
	},

	isFalse: function (val: any) {
		return val === false;
	},

	isNotNull: function (actual: any) {
		return actual !== null;
	},

	dateCmp: function (dt1: Date, dt2: Date) {
		return dt1 > dt2 ? 1 : dt1 < dt2 ? -1 : 0;
	}

};

function toConstraints(condition: ICondition, options: {
	alias: string;
} & IPatternOptions) {
	const alias = options.alias;
	if (typeof condition === 'function') {
		throw new Error("do not support custom constraint.");
	}
	//constraint.split("&&")
	let ret: IConstraint[] = [];
	const scope = options.scope || {};
	const rule2 = condition[2];

	if (rule2 === "and") {
		ret = ret.concat(toConstraints(condition[0] as any, options)).concat(toConstraints(condition[1] as any, options));
	} else if (
		rule2 === "composite" ||
		rule2 === "or" ||
		rule2 === "lt" ||
		rule2 === "gt" ||
		rule2 === "lte" ||
		rule2 === "gte" ||
		rule2 === "like" ||
		rule2 === "notLike" ||
		rule2 === "eq" ||
		rule2 === "neq" ||
		rule2 === "seq" ||
		rule2 === "sneq" ||
		rule2 === "in" ||
		rule2 === "notIn" ||
		rule2 === "prop" ||
		rule2 === "propLookup" ||
		rule2 === "function" ||
		rule2 === "logicalNot") {
		const isReference = getIdentifiers(condition).some((i) => {
			return i !== alias && !(i in definedFuncs) && !(i in scope);
		});
		switch (rule2) {
			case "eq":
				ret.push(isReference ? create_reference_equality_constraint(alias, condition, options) : create_equality_constraint(alias, condition, options));
				break;
			case "seq":
				ret.push(isReference ? create_reference_equality_constraint(alias, condition, options) : create_equality_constraint(alias, condition, options));
				break;
			case "neq":
				ret.push(isReference ? create_reference_inequality_constraint(alias, condition, options) : create_inequality_constraint(alias, condition, options));
				break;
			case "sneq":
				ret.push(isReference ? create_reference_inequality_constraint(alias, condition, options) : create_inequality_constraint(alias, condition, options));
				break;
			case "gt":
				ret.push(isReference ? create_reference_gt_constraint(alias, condition, options) : create_comparison_constraint(alias, condition, options));
				break;
			case "gte":
				ret.push(isReference ? create_reference_gte_constraint(alias, condition, options) : create_comparison_constraint(alias, condition, options));
				break;
			case "lt":
				ret.push(isReference ? create_reference_lt_constraint(alias, condition, options) : create_comparison_constraint(alias, condition, options));
				break;
			case "lte":
				ret.push(isReference ? create_reference_lte_constraint(alias, condition, options) : create_comparison_constraint(alias, condition, options));
				break;
			default:
				ret.push(isReference ? create_reference_constraint(alias, condition, options) : create_comparison_constraint(alias, condition, options));
		}
	}
	return ret;
}

let id = 0;
function _object_pattern(type: patternType, cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, options: IPatternOptions, cs: IConstraint[]): IObjectPattern {
	// this.conditions = conditions;
	let constraints: IConstraint[] = [create_object_constraint(alias, cls, class_type)];
	const constrnts = toConstraints(conditions, mixin({ alias: alias }, options));
	if (constrnts.length) {
		constraints = constraints.concat(constrnts);
	} else {
		const cnstrnt = create_true_constraint(alias);
		constraints.push(cnstrnt);
	}
	if (store && !isEmpty(store)) {
		const atm = create_hash_constraint(alias, store);
		constraints.push(atm);
	}
	const csts = constraints.map((c) => {
		return cs.push(c) - 1;
	});

	return {
		tp: type,
		id: ++id,
		cls: cls,
		class_type: class_type,
		a: alias,
		pattern: options.pattern,
		constraints: csts
	};
}

export function initial_fact_pattern(cs: IConstraint[]) {
	return _object_pattern(patternType.initial_fact, 'InitialFact', InitialFact, "__i__", [] as any, {}, {} as IPatternOptions, cs);
}

function object_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, options: IPatternOptions, cs: IConstraint[]) {
	return _object_pattern(patternType.object, cls, class_type, alias, conditions, store, options, cs);
}

function _from_pattern(type: patternType, cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, from: ICondition, options: IPatternOptions, cs: IConstraint[]): IFromPattern {
	return mixin(_object_pattern(type, cls, class_type, alias, conditions, store, options, cs), {
		from: create_from_constraint(alias, from, options)
	});
}

export function composite_pattern(left: IPattern, right: IPattern): ICompositePattern {
	return {
		tp: patternType.composite,
		id: ++id,
		leftPattern: left,
		rightPattern: right
	};
}

function parseExtra(s: string) {
	if (s === undefined || s === null) {
		return null;
	} else if (/^from +/.test(s)) {
		return { from: s.replace(/^from +/, "").replace(/^\s*|\s*$/g, "") };
	} else {
		throw new Error("invalid rule constraint option " + s);
	}
}

function normailizeConstraint(c: ICondition): ICondition {
	switch (c.length) {
		case 1:
			throw new Error(`invalid rule constraint ${JSON.stringify(c)}`);
		case 2:
			return (() => {
				c.push("true");
				return c;
			})();
		case 3:
			return (() => {
				if (isString(c[2]) && /^from +/.test(c[2])) {
					const extra = c[2];
					c.splice(2, 0, "true");
					c[3] = null;
					c[4] = parseExtra(extra);
				} else if (isHash(c[2])) {
					c.splice(2, 0, "true");
				}
				return c;
			})();
		case 4:
			return (() => {
				if (isString(c[3])) {
					c.splice(3, 0, null);
					c[4] = parseExtra(c[4] as any);
				}
				return c;
			})();
		default:
			return (() => {
				if (c.length === 5) {
					c[4] = parseExtra(c[4] as any);
				}
				return c;
			})();
	}
}

function getParamTypeSwitch(type: string): any {
	switch (type) {
		case 'string':
			return String;
		case 'date':
			return Date;
		case 'array':
			return Array;
		case 'boolean':
			return Boolean;
		case 'regexp':
			return RegExp;
		case 'number':
			return Number;
		case 'object':
		case 'hash':
			return Object;
		default:
			throw new TypeError("invalid param type " + type);
	}
}

function getParamType(type: any, scope = {} as any) {
	if (isString(type)) {
		const param = type as string;
		const t = scope[param];
		if (!t) {
			return getParamTypeSwitch(param.toLowerCase());
		} else {
			return t;
		}
	} else if (isFunction(type)) {
		return type;
	} else if (isEqual(type, [])) {
		return Array;
	} else {
		throw new Error(`invalid param type ${type}`);
	}
}

function parsePattern_or(condition: ICondition, cs: IConstraint[]): IPattern[] {
	condition.shift();
	return flattenDeep(condition.map((cond: ICondition) => {
		cond.scope = (condition as any).scope;
		return pattern(cond, cs);
	}));
}

function parseConstraint(constraint: string) {
	if (typeof constraint === 'function') {
		// No parsing is needed for constraint functions
		return constraint as any as ICondition;
	}
	return baseParseConstraint(constraint);
}

function from_not_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, from: ICondition, options: IPatternOptions, cs: IConstraint[]) {
	return _from_pattern(patternType.from_not, cls, class_type, alias, conditions, store, from, options, cs) as IFromNotPattern;
}

function not_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, options: IPatternOptions, cs: IConstraint[]) {
	return _object_pattern(patternType.not, cls, class_type, alias, conditions, store, options, cs) as INotPattern;
}

function parsePattern_not(condition: ICondition, cs: IConstraint[]): [IPattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_not_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] as string },
				cs
			)
		];
	} else {
		return [
			not_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] as string },
				cs
			)
		];
	}
}

function from_exists_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, from: ICondition, options: IPatternOptions, cs: IConstraint[]) {
	return _from_pattern(patternType.from_exists, cls, class_type, alias, conditions, store, from, options, cs) as IFromExistsPattern;
}

function exists_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, options: IPatternOptions, cs: IConstraint[]) {
	return _object_pattern(patternType.exists, cls, class_type, alias, conditions, store, options, cs) as IExistsPattern;
}

function parsePattern_exists(condition: ICondition, cs: IConstraint[]): [IPattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_exists_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] },
				cs
			)
		];
	} else {
		return [
			exists_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] },
				cs
			)
		];
	}
}

function from_pattern(cls: string, class_type: any, alias: string, conditions: ICondition, store: Hash, from: ICondition, options: IPatternOptions, cs: IConstraint[]) {
	return _from_pattern(patternType.from, cls, class_type, alias, conditions, store, from, options, cs);
}

function parsePattern_def(condition: ICondition, cs: IConstraint[]): [IFromPattern | IObjectPattern] {
	if (typeof condition === 'function') {
		return [condition] as any;
	}
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] },
				cs
			)
		];
	} else {
		return [
			object_pattern(
				condition[0][0] as string,
				getParamType(condition[0][1], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] },
				cs
			)
		];
	}
}

export default function pattern(condition: ICondition, cs: IConstraint[]): IPattern[] {
	switch (condition[0] as string) {
		case 'or':
			return parsePattern_or(condition, cs);
		case 'not':
			return parsePattern_not(condition, cs);
		case 'exists':
			return parsePattern_exists(condition, cs);
		default:
			return parsePattern_def(condition, cs);
	}
}
