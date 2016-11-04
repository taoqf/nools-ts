import flattenDeep from 'lodash-ts/flattenDeep';
import isBoolean from 'lodash-ts/isBoolean';
import isHash from 'lodash-ts/isHash';
import isString from 'lodash-ts/isString';
import isArray from 'lodash-ts/isArray';
import isFunction from 'lodash-ts/isFunction';
import isEqual from 'lodash-ts/isEqual';
import { IRuleContextOptions, ICondition } from './interfaces';
import CompositePattern from './pattern/composite-pattern';
import Pattern from './pattern/pattern';
import FromPattern from './pattern/from-pattern';
import FromNotPattern from './pattern/from-not-pattern';
import FromExistsPattern from './pattern/from-exists-pattern';
import ExistsPattern from './pattern/exists-pattern';
import NotPattern from './pattern/not-pattern';
import ObjectPattern from './pattern/object-pattern';
import baseParseConstraint from './parser/constraint';
import Flow from './flow';
import { Match } from './context';

export default class Rule {
	public name: string;
	public agendaGroup: string;
	public priority: number;
	public autoFocus: boolean;
	private cb: Function;
	public pattern: Pattern;
	constructor(name: string, options: {
		agendaGroup?: string;
		autoFocus?: boolean;
		priority?: number;
		salience?: number;
	}, pattern: Pattern, cb: Function) {
		this.name = name;
		this.pattern = pattern;
		this.cb = cb;
		if (options.agendaGroup) {
			this.agendaGroup = options.agendaGroup;
			this.autoFocus = isBoolean(options.autoFocus) ? options.autoFocus : false;
		}
		this.priority = options.priority || options.salience || 0;
	}

	fire(flow: Flow, match: Match) {
		const cb = this.cb;
		return new Promise((resolve) => {
			resolve(cb.call(flow, match.factHash, flow));
		});
	}
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

function parsePattern_or(condition: ICondition): Pattern[] {
	condition.shift();
	return flattenDeep(condition.map(function (cond: ICondition) {
		cond.scope = (condition as any).scope;
		return parsePattern(cond);
	}));
}

function parseConstraint(constraint: string) {
	if (typeof constraint === 'function') {
		// No parsing is needed for constraint functions
		return constraint as any as ICondition;
	}
	return baseParseConstraint(constraint);
}

function parsePattern_not(condition: ICondition): [Pattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			new FromNotPattern(
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
			new NotPattern(
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] as string }
			)
		];
	}
}

function parsePattern_exists(condition: ICondition): [Pattern] {
	condition.shift();
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			new FromExistsPattern(
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
			new ExistsPattern(
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	}
}

function parsePattern_def(condition: ICondition): [Pattern] {
	if (typeof condition === 'function') {
		return [condition] as any;
	}
	condition = normailizeConstraint(condition);
	if (condition[4] && condition[4].from) {
		return [
			new FromPattern(
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
			new ObjectPattern(
				getParamType(condition[0], condition.scope),
				condition[1] as string || "m",
				parseConstraint(condition[2] || "true"),
				condition[3] || {},
				{ scope: condition.scope, pattern: condition[2] }
			)
		];
	}
}

function parsePattern(condition: ICondition): Pattern[] {
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

export function createRule(name: string, options: IRuleContextOptions, conditions: ICondition[], cb: Function) {
	let isRules = conditions.every(function (cond) {
		return isArray(cond);
	});
	if (isRules && conditions.length === 1) {
		conditions = conditions[0];
		isRules = false;
	}
	let rules: Rule[] = [];
	const scope = options.scope || new Map<string, any>();
	(conditions as any).scope = scope;
	if (isRules) {
		const patterns: Pattern[][] = [];
		function _mergePatterns(patt: Pattern | Pattern[], i: number) {
			// [pattern], [pattern], ...  in arrays of length 1
			// we wish to build a single array in order of lhs progression
			if (isArray(patt)) {
				if ((patt as Pattern[]).length === 1) {
					patt = (patt as Pattern[])[0];
					i = 0;
				}
				else {
					throw new Error('invalid pattern structure');
				}
			}
			if (!patterns[i]) {
				patterns[i] = i === 0 ? [] : patterns[i - 1].slice();
				//remove dup
				if (i !== 0) {
					patterns[i].pop();
				}
				patterns[i].push(patt as Pattern);
			} else {
				patterns.forEach(function (p) {
					p.push(patt as Pattern);
				});
			}
		}
		conditions.forEach((condition) => {
			condition.scope = scope;
			parsePattern(condition).forEach(_mergePatterns);
		});
		rules = patterns.map(function (patterns) {
			const compPat = patterns.filter((patt, idx) => {
				return idx > 0;
			}).reduce((compPat, patt) => {
				return new CompositePattern(compPat, patt);
			}, patterns[0]);
			return new Rule(name, options, compPat, cb);
		});
	} else {
		rules = parsePattern(conditions as any).map(function (cond) {
			return new Rule(name, options, cond, cb);
		});
	}
	return rules;
}
