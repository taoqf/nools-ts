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
import { IContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ITrueConstraint, ICondition, IPatternOptions, IPattern, IObjectPattern, IFromPattern, ICompositePattern } from './interfaces';
import { getIdentifiers } from './constraint-matcher';
import Constraint from './constraint/constraint';
import ObjectConstraint from './constraint/object-constraint';
import ReferenceEqualityConstraint from './constraint/reference-equality-constraint';
import EqualityConstraint from './constraint/equality-constraint';
import CustomConstraint from './constraint/custom-constraint';
import FromConstraint from './constraint/from-constraint';
import ReferenceInequalityConstraint from './constraint/reference-inequality-constraint';
import InequalityConstraint from './constraint/inequality-constraint';
import ComparisonConstraint from './constraint/comparison-constraint';
import ReferenceGTConstraint from './constraint/reference-gt-constraint';
import ReferenceGTEConstraint from './constraint/reference-gte-constraint';
import ReferenceLTConstraint from './constraint/reference-lt-constraint';
import ReferenceLTEConstraint from './constraint/reference-lte-constraint';
import ReferenceConstraint from './constraint/reference-constraint';
import TrueConstraint from './constraint/true-constraint';
import HashConstraint from './constraint/hash-constraint';
import InitialFact from './facts/initial';
import baseParseConstraint from './parser/constraint';

export enum enumPatternType {
	composite,
	object,
	exists,
	from,
	from_exists,
	from_not,
	initial_fact,
	not
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

function toConstraints(constraint: ICondition, options: {
	alias: string;
} & IPatternOptions) {
	if (typeof constraint === 'function') {
		return [new CustomConstraint(constraint as any, options)];
	}
	//constraint.split("&&")
	let ret: any[] = [];
	const alias = options.alias;
	const scope = options.scope || {};
	const rule2 = constraint[2];

	if (rule2 === "and") {
		ret = ret.concat(toConstraints(constraint[0] as any, options)).concat(toConstraints(constraint[1] as any, options));
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
		const isReference = getIdentifiers(constraint).some((i) => {
			return i !== alias && !(i in definedFuncs) && !(i in scope);
		});
		switch (rule2) {
			case "eq":
				ret.push(isReference ? new ReferenceEqualityConstraint(constraint, options) : new EqualityConstraint(constraint, options));
				break;
			case "seq":
				ret.push(isReference ? new ReferenceEqualityConstraint(constraint, options) : new EqualityConstraint(constraint, options));
				break;
			case "neq":
				ret.push(isReference ? new ReferenceInequalityConstraint(constraint, options) : new InequalityConstraint(constraint, options));
				break;
			case "sneq":
				ret.push(isReference ? new ReferenceInequalityConstraint(constraint, options) : new InequalityConstraint(constraint, options));
				break;
			case "gt":
				ret.push(isReference ? new ReferenceGTConstraint(constraint, options) : new ComparisonConstraint(constraint, options));
				break;
			case "gte":
				ret.push(isReference ? new ReferenceGTEConstraint(constraint, options) : new ComparisonConstraint(constraint, options));
				break;
			case "lt":
				ret.push(isReference ? new ReferenceLTConstraint(constraint, options) : new ComparisonConstraint(constraint, options));
				break;
			case "lte":
				ret.push(isReference ? new ReferenceLTEConstraint(constraint, options) : new ComparisonConstraint(constraint, options));
				break;
			default:
				ret.push(isReference ? new ReferenceConstraint(constraint, options) : new ComparisonConstraint(constraint, options));
		}
	}
	return ret;
}

let id = 0;
function object_pattern(type: enumPatternType, class_type: any, alias: string, conditions: ICondition, store = {}, options = {} as IPatternOptions): IObjectPattern {
	// this.conditions = conditions;
	let constraints = [new ObjectConstraint(class_type)];
	const constrnts = toConstraints(conditions, mixin({ alias: alias }, options));
	if (constrnts.length) {
		constraints = constraints.concat(constrnts);
	} else {
		const cnstrnt = new TrueConstraint();
		constraints.push(cnstrnt);
	}
	if (store && !isEmpty(store)) {
		const atm = new HashConstraint(store);
		constraints.push(atm);
	}

	constraints.forEach((constraint) => {
		constraint.set_alias(alias);
	});
	return {
		type: type,
		id: ++id,
		class_type: class_type,
		alias: alias,
		pattern: options.pattern,
		constraints: constraints
	};
}

export function initial_fact_pattern() {
	return object_pattern(enumPatternType.initial_fact, InitialFact, "__i__", [] as any, {});
}

function from_pattern(type: enumPatternType, class_type: any, alias: string, conditions: ICondition, store: any, from: ICondition, options?: IPatternOptions): IFromPattern {
	return mixin(object_pattern(type, class_type, alias, conditions, store, options), {
		from: new FromConstraint(from, options)
	});
}

export function composite_pattern(left: IPattern, right: IPattern): ICompositePattern {
	return {
		type: enumPatternType.composite,
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

function parsePattern_or(condition: ICondition): IPattern[] {
	condition.shift();
	return flattenDeep(condition.map((cond: ICondition) => {
		cond.scope = (condition as any).scope;
		return pattern(cond);
	}));
}

function parseConstraint(constraint: string) {
	if (typeof constraint === 'function') {
		// No parsing is needed for constraint functions
		return constraint as any as ICondition;
	}
	return baseParseConstraint(constraint);
}

function parsePattern_not(condition: ICondition): [IPattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_pattern(
				enumPatternType.from_not,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] as string }
			)
		];
	} else {
		return [
			object_pattern(
				enumPatternType.not,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] as string }
			)
		];
	}
}

function parsePattern_exists(condition: ICondition): [IPattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_pattern(
				enumPatternType.from_exists,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	} else {
		return [
			object_pattern(
				enumPatternType.exists,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	}
}

function parsePattern_def(condition: ICondition): [IPattern] {
	if (typeof condition === 'function') {
		return [condition] as any;
	}
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			from_pattern(
				enumPatternType.from,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				parseConstraint(condition[4].from),
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	} else {
		return [
			object_pattern(
				enumPatternType.object,
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	}
}

export default function pattern(condition: ICondition): IPattern[] {
	switch (condition[0] as string) {
		case 'or':
			return parsePattern_or(condition);
		case 'not':
			return parsePattern_not(condition);
		case 'exists':
			return parsePattern_exists(condition);
		default:
			return parsePattern_def(condition);
	}
}
