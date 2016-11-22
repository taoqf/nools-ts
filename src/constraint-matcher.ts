import flattenDeep from 'lodash-ts/flattenDeep';
import isArray from 'lodash-ts/isArray';
import { ICondition, IPatternOptions } from './interfaces';
import { removeDups } from './lang';

function getProps(val: (string | string[])[]): string[] {
	const arr: (string | string[])[] = val.map((val) => {
		return isArray(val) ? isArray(val[0]) ? getProps(val) : val.reverse().join(".") : val;
	});
	return flattenDeep(arr).filter((v) => {
		return !!v;
	});
}

function removeDuplicates<T>(arr: T[]) {
	const ret: T[] = [];
	if (arr && arr.length) {
		arr.forEach((it) => {
			if (ret.indexOf(it) != -1) {
				ret.push(it);
			}
		});
	}
	return ret;
}

export function getIdentifiers(rule: ICondition) {
	let ret: string[] = [];
	const rule2 = rule[2];

	if (rule2 === "identifier") {
		//its an identifier so stop
		return [rule[0]] as string[];
	} else if (rule2 === "function") {
		ret = ret.concat(getIdentifiers(rule[0] as ICondition)).concat(getIdentifiers(rule[1] as ICondition));
	} else if (rule2 !== "string" &&
		rule2 !== "number" &&
		rule2 !== "boolean" &&
		rule2 !== "regexp" &&
		rule2 !== "unary" &&
		rule2 !== "unary") {
		//its an expression so keep going
		if (rule2 === "prop") {
			ret = ret.concat(getIdentifiers(rule[0] as ICondition));
			if (rule[1]) {
				let propChain = rule[1];
				//go through the member constiables and collect any identifiers that may be in functions
				while (isArray(propChain)) {
					if (propChain[2] === "function") {
						ret = ret.concat(getIdentifiers(propChain[1] as ICondition));
						break;
					} else {
						propChain = propChain[1];
					}
				}
			}

		} else {
			if (rule[0]) {
				ret = ret.concat(getIdentifiers(rule[0] as ICondition));
			}
			if (rule[1]) {
				ret = ret.concat(getIdentifiers(rule[1] as ICondition));
			}
		}
	}
	//remove dups and return
	return removeDups(ret);
}

export function toJs(rule: ICondition, scope: Map<string, any>, alias: string, equality = false, wrap?: (src: string) => string) {
	/*jshint evil:true*/
	const js = parse(rule);
	scope = scope || new Map<string, any>();
	const consts = getIdentifiers(rule);
	// const closureconsts = ["const indexOf = definedFuncs.indexOf; const hasOwnProperty = Object.prototype.hasOwnProperty;"];
	const closureconsts = consts.filter((v) => {
		return scope.has(v);
	}).map((v) => {
		return `const ${v}=scope.get('${v}');`;
	});
	const funcconsts = consts.filter((v) => {
		return !scope.has(v);
	}).map((v) => {
		if (equality || v !== alias) {
			return `const ${v}=fact.get('${v}');`;
		} else if (v === alias) {
			return `const ${v}=hash.get('${v}');`;
		} else {
			return ``;
		}
	});
	const closureBody = closureconsts.join("") + "return function" + (!equality ? "(fact, hash){" : "(fact){") + funcconsts.join("") + " return " + (wrap ? wrap(js) : js) + ";}";
	return new Function("scope", closureBody)(scope);
}

export function getMatcher(rule: ICondition, options = {} as IPatternOptions, equality = false) {
	return toJs(rule, options.scope, options.alias, equality, function (src) {
		return `!!(${src})`;
	});
}

function __getProperties(rule: ICondition) {
	let ret: (string[] | string)[] = [];
	if (rule) {
		const rule2 = rule[2];
		if (!rule2) {
			return ret;
		}
		if (rule2 !== "prop" &&
			rule2 !== "identifier" &&
			rule2 !== "string" &&
			rule2 !== "number" &&
			rule2 !== "boolean" &&
			rule2 !== "regexp" &&
			rule2 !== "unary" &&
			rule2 !== "unary") {
			ret[0] = __getProperties(rule[0] as ICondition) as string[];
			ret[1] = __getProperties(rule[1] as ICondition) as string[];
		} else if (rule2 === "identifier") {
			//at the bottom
			ret = [rule[0]];
		} else {
			ret = __getProperties(rule[1] as ICondition).concat(__getProperties(rule[0] as ICondition));
		}
	}
	return ret;
}

export function getIndexableProperties(rule: ICondition): string[] {
	if (rule[2] === "composite") {
		return getIndexableProperties(rule[0] as ICondition);
	} else if (/^(\w+(\['[^']*'])*) *([!=]==?|[<>]=?) (\w+(\['[^']*'])*)$/.test(parse(rule))) {
		return flattenDeep(getProps(__getProperties(rule)));
	} else {
		return [];
	}
}

function equal(c1: any, c2: any) {
	let ret = false;
	if (c1 === c2) {
		ret = true;
	} else {
		if (c1[2] === c2[2]) {
			if (["string", "number", "boolean", "regexp", "identifier", "null"].indexOf(c1[2]) !== -1) {
				ret = c1[0] === c2[0];
			} else if (c1[2] === "unary" || c1[2] === "logicalNot") {
				ret = equal(c1[0], c2[0]);
			} else {
				ret = equal(c1[0], c2[0]) && equal(c1[1], c2[1]);
			}
		}
	}
	return ret;
}

function composite(lhs: any) {
	return parse(lhs);
}

function and(lhs: any, rhs: any) {
	return ["(", parse(lhs), "&&", parse(rhs), ")"].join(" ");
}

function or(lhs: any, rhs: any) {
	return ["(", parse(lhs), "||", parse(rhs), ")"].join(" ");
}

function unary(lhs: any): any {
	return -1 * (parse(lhs) as any);
}

function plus(lhs: any, rhs: any) {
	return [parse(lhs), "+", parse(rhs)].join(" ");
}
function minus(lhs: any, rhs: any) {
	return [parse(lhs), "-", parse(rhs)].join(" ");
}

function mult(lhs: any, rhs: any) {
	return [parse(lhs), "*", parse(rhs)].join(" ");
}

function div(lhs: any, rhs: any) {
	return [parse(lhs), "/", parse(rhs)].join(" ");
}

function mod(lhs: any, rhs: any) {
	return [parse(lhs), "%", parse(rhs)].join(" ");
}

function lt(lhs: any, rhs: any) {
	return [parse(lhs), "<", parse(rhs)].join(" ");
}
function gt(lhs: any, rhs: any) {
	return [parse(lhs), ">", parse(rhs)].join(" ");
}
function lte(lhs: any, rhs: any) {
	return [parse(lhs), "<=", parse(rhs)].join(" ");
}
function gte(lhs: any, rhs: any) {
	return [parse(lhs), ">=", parse(rhs)].join(" ");
}
function like(lhs: any, rhs: any) {
	return [parse(rhs), ".test(", parse(lhs), ")"].join("");
}
function notLike(lhs: any, rhs: any) {
	return ["!", parse(rhs), ".test(", parse(lhs), ")"].join("");
}
function eq(lhs: any, rhs: any) {
	return [parse(lhs), "==", parse(rhs)].join(" ");
}

function seq(lhs: any, rhs: any) {
	return [parse(lhs), "===", parse(rhs)].join(" ");
}

function neq(lhs: any, rhs: any) {
	return [parse(lhs), "!=", parse(rhs)].join(" ");
}

function sneq(lhs: any, rhs: any) {
	return [parse(lhs), "!==", parse(rhs)].join(" ");
}

function _in(lhs: any, rhs: any) {
	return ["(indexOf(", parse(rhs), ",", parse(lhs), ")) != -1"].join("");
}

function notIn(lhs: any, rhs: any) {
	return ["(indexOf(", parse(rhs), ",", parse(lhs), ")) == -1"].join("");
}

function _arguments(lhs: any, rhs: any) {
	const ret: string[] = [];
	if (lhs) {
		ret.push(parse(lhs));
	}
	if (rhs) {
		ret.push(parse(rhs));
	}
	return ret.join(",");
}

function array(lhs: any) {
	const args: string[] = [];
	if (lhs) {
		const args = parse(lhs);
		if (isArray(args)) {
			return args;
		} else {
			return ["[", args, "]"].join("");
		}
	}
	return ["[", args.join(","), "]"].join("");
}

function _function(lhs: any, rhs: any) {
	const args = parse(rhs);
	return [parse(lhs), "(", args, ")"].join("");
}

function _string(lhs: any) {
	return "'" + lhs + "'";
}

function _number(lhs: any) {
	return lhs;
}

function _boolean(lhs: any) {
	return lhs;
}

function regexp(lhs: any) {
	return lhs;
}

function identifier(lhs: any) {
	return lhs;
}

function _null() {
	return "null";
}

function logicalNot(lhs: any) {
	return ["!(", parse(lhs), ")"].join("");
}

function prop(name: any, prop: any) {
	if (prop[2] === "function") {
		return [parse(name), parse(prop)].join(".");
	} else {
		return [parse(name), "['", parse(prop), "']"].join("");
	}
}

function propLookup(name: any, prop: any) {
	if (prop[2] === "function") {
		return [parse(name), parse(prop)].join(".");
	} else {
		return [parse(name), "[", parse(prop), "]"].join("");
	}
}

function parse(rule: ICondition): string {
	const op = rule[2];
	const lhs = rule[0];
	const rhs = rule[1];
	switch (op) {
		case 'composite':
			return composite(lhs);
		case 'and':
			return and(lhs, rhs);
		case 'or':
			return or(lhs, rhs);
		case 'prop':
			return prop(lhs, rhs);
		case 'propLookup':
			return propLookup(lhs, rhs);
		case 'unary':
			return unary(lhs);
		case 'plus':
			return plus(lhs, rhs);
		case 'minus':
			return minus(lhs, rhs);
		case 'mult':
			return mult(lhs, rhs);
		case 'div':
			return div(lhs, rhs);
		case 'mod':
			return mod(lhs, rhs);
		case 'lt':
			return lt(lhs, rhs);
		case 'gt':
			return gt(lhs, rhs);
		case 'lte':
			return lte(lhs, rhs);
		case 'gte':
			return gte(lhs, rhs);
		case 'like':
			return like(lhs, rhs);
		case 'notLike':
			return notLike(lhs, rhs);
		case 'eq':
			return eq(lhs, rhs);
		case 'seq':
			return seq(lhs, rhs);
		case 'neq':
			return neq(lhs, rhs);
		case 'sneq':
			return sneq(lhs, rhs);
		case 'in':
			return _in(lhs, rhs);
		case 'notIn':
			return notIn(lhs, rhs);
		case 'arguments':
			return _arguments(lhs, rhs);
		case 'array':
			return array(lhs);
		case 'function':
			return _function(lhs, rhs);
		case 'string':
			return _string(lhs);
		case 'number':
			return _number(lhs);
		case 'boolean':
			return _boolean(lhs);
		case 'regexp':
			return regexp(lhs);
		case 'identifier':
			return identifier(lhs);
		case 'null':
			return _null();
		case 'logicalNot':
			return logicalNot(lhs);
		default:
			throw new Error(`can not find method.${op}`);
	}
	// return this[rule[2]](rule[0], rule[1]);
}

export function getSourceMatcher(rule: ICondition, options = {} as IPatternOptions, equality: boolean) {
	return toJs(rule, options.scope, options.alias, equality, function (src) {
		return src;
	});
}
