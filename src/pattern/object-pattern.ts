import isNumber from 'lodash-ts/isNumber';
import isEmpty from 'lodash-ts/isEmpty';
import mixin from 'lodash-ts/mixin';
import Pattern from './pattern';
import { IContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ITrueConstraint, ICondition, IPatternOptions } from '../interfaces';
import { getIdentifiers } from '../constraint-matcher';
import Constraint from '../constraint/constraint';
import ObjectConstraint from '../constraint/object-constraint';
import ReferenceEqualityConstraint from '../constraint/reference-equality-constraint';
import EqualityConstraint from '../constraint/equality-constraint';
import CustomConstraint from '../constraint/custom-constraint';
import ReferenceInequalityConstraint from '../constraint/reference-inequality-constraint';
import InequalityConstraint from '../constraint/inequality-constraint';
import ComparisonConstraint from '../constraint/comparison-constraint';
import ReferenceGTConstraint from '../constraint/reference-gt-constraint';
import ReferenceGTEConstraint from '../constraint/reference-gte-constraint';
import ReferenceLTConstraint from '../constraint/reference-lt-constraint';
import ReferenceLTEConstraint from '../constraint/reference-lte-constraint';
import ReferenceConstraint from '../constraint/reference-constraint';
import TrueConstraint from '../constraint/true-constraint';
import HashConstraint from '../constraint/hash-constraint';

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
export default class ObjectPattern extends Pattern {
	public id = id++;
	protected type: any;	// Any Constructor of any Class
	public alias: string;
	protected conditions: ICondition;
	protected pattern: string;
	public constraints: ObjectConstraint[];
	constructor(type: any, alias: string, conditions: ICondition, store = {}, options = {} as IPatternOptions) {
		super();
		this.type = type;
		this.alias = alias;
		this.conditions = conditions;
		this.pattern = options.pattern;
		let constraints = [new ObjectConstraint(type)];
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
		this.constraints = constraints;
	}

	getSpecificity() {
		return this.constraints.filter((c) => {
			return c instanceof EqualityConstraint;
		}).length;
	}

	hasConstraint(type: any) {
		return this.constraints.some((c) => {
			return c instanceof type;
		});
	}

	hashCode() {
		return [this.type, this.alias, JSON.stringify(this.conditions)].join(":");
	}

	toString() {
		return JSON.stringify(this.conditions);
	}
}