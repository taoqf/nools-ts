import {IContext, IRuleContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ITrueConstraint, ICompileOptions, ICondition} from '../interfaces';
import Container from '../flow-container';
import {createDefined, createFunction, modifiers} from './common';

import mixin from 'lodash-ts/mixin';
import isEmpty from 'lodash-ts/isEmpty';
import isHash from 'lodash-ts/isHash';
import isObject from 'lodash-ts/isObject';
import parseConstraint from '../parser/constraint';
import {removeDups} from '../lang';
import {getIdentifiers} from '../constraint-matcher';
import {createRule} from '../rule';

const __resolveRule = function (rule: INomalConstraint | IFromstraint, defined: { [name: string]: any }, name: string) {
	const condition = [] as any[], alias = rule[1];
	// const condition = [] as [any, string, string, string], alias = rule[1];
	let constraint = rule[2], refs = rule[3];
	if (isHash(constraint)) {
		refs = constraint;
		constraint = null;
	}
	let definedClass = rule[0];
	if (definedClass && !!(definedClass = defined[definedClass])) {
		condition.push(definedClass);
	} else {
		throw new Error("Invalid class " + rule[0] + " for rule " + name);
	}
	condition.push(alias, constraint, refs);
	let identifiers = [alias];
	if (constraint) {
		identifiers = identifiers.concat(getIdentifiers(parseConstraint(constraint)));
	}
	if (isObject(refs)) {
		const idents: string[] = [];
		for (const ident of refs) {
			idents.push(ident);
		}
		return [identifiers, condition, idents];
	}
	return [identifiers, condition];
}

function parseRule(rule: ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint, defined: { [name: string]: any }, name: string) {
	if (rule.length) {
		let conditions: any[][] = [];
		let identifiers: string[] = [];
		const r0 = rule[0];	// OAV
		if (r0 === "not" || r0 === "exists") {
			rule.shift();
			const [i, c, r] = __resolveRule(rule as INomalConstraint | IFromstraint, defined, name);
			identifiers = identifiers.concat(i as string[]);
			if (r) {
				// r is a string[]???
				const idents = r.filter((ident) => {
					return identifiers.indexOf(ident) == -1;
				});
				if (idents.length) {
					identifiers = identifiers.concat(idents);
				}
			}
			const cond = c[0] as string[];
			cond.unshift(r0);
			conditions.push(cond);
		} else if (r0 === "or") {
			const conds = [r0];
			rule.shift();
			const [i, c] = parseRule(rule[1] as ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint, defined, name);
			conditions.push(c);
			conditions = conditions.concat(c);
			identifiers = identifiers.concat(i as string[]);
			// rule.forEach(function (cond) {
			// 	const [i, c] = parseRule(cond, defined, name);
			// 	conditions.push(c);
			// 	identifiers = identifiers.concat(i);
			// });
			conditions.push(conds);
		} else {
			const [i, c, r] = __resolveRule(rule as INomalConstraint | IFromstraint, defined, name);
			conditions.push(c as any[]);
			identifiers = identifiers.concat(i as string[]);
			if (r) {
				// r is a string[]???
				const idents = r.filter((ident) => {
					return identifiers.indexOf(ident) == -1;
				});
				if (idents.length) {
					identifiers = identifiers.concat(idents);
				}
			}
			identifiers = removeDups(identifiers);
		}
		return [identifiers, conditions];
	}
	return [];
}

/**
 * @private
 * Parses an action from a rule definition
 * @param {String} action the body of the action to execute
 * @param {Array} identifiers array of identifiers collected
 * @param {Object} defined an object of defined
 * @param scope
 * @return {Object}
 */
function parseAction(action: string, identifiers: string[], defined: { [name: string]: any }, scope: { [name: string]: any }) {
	const declares: string[] = [];
	identifiers.forEach(function (i) {
		if (action.indexOf(i) !== -1) {
			declares.push(`let ${i} = facts.get("${i}");`);
		}
	});
	Object.keys(defined).forEach(function (i) {
		if (action.indexOf(i) !== -1) {
			declares.push(`let ${i} = defined.${i};`);
		}
	});

	Object.keys(scope).forEach(function (i) {
		if (action.indexOf(i) !== -1) {
			declares.push(`let ${i} = scope.${i};`);
		}
	});
	modifiers.forEach(function (i) {
		if (action.indexOf(i) !== -1) {
			declares.push(`if(!${i}){ let ${i}= flow.${i};}`);
		}
	});
	const params = ["facts", 'flow'];
	if (/next\(.*\)/.test(action)) {
		params.push("next");
	}
	action = declares.join("") + action;
	try {
		return new Function("defined, scope", "return " + new Function(params.join(","), action).toString())(defined, scope);
	} catch (e) {
		throw new Error("Invalid action : " + action + "\n" + e.message);
	}
}

function createRuleFromObject(obj: IRuleContext, defined: { [name: string]: any }, scope: { [name: string]: any }) {
	const name = obj.name;
	if (isEmpty(obj)) {
		throw new Error("Rule is empty");
	}
	const options = obj.options || {};
	options.scope = scope;
	let constraints = obj.constraints || [], l = constraints.length;
	if (!l) {
		constraints = ["true"] as any;	// todo:::: This is not in the right format.
	}
	const action = obj.action;
	if (action === undefined) {
		throw new Error("No action was defined for rule " + name);
	}
	let conditions: ICondition[] = [];
	let identifiers: string[] = [];
	constraints.forEach(function (rule) {
		const [i, c] = parseRule(rule, defined, name);
		conditions = conditions.concat(c as ICondition[]);
		identifiers = identifiers.concat(i as string[]);
	});
	return createRule(name, options, conditions, parseAction(action, identifiers as string[], defined, scope));
}

export function compile(context: IContext, options: ICompileOptions) {
	const name = options.name;
	//if !name throw an error
	if (!name) {
		throw new Error("Name must be present in JSON or options");
	}
	const flow = new Container(name);
	const defined = mixin({ Array: Array, String: String, Number: Number, Boolean: Boolean, RegExp: RegExp, Date: Date, Object: Object }, options.define || {});
	if (typeof Buffer !== "undefined") {
		defined['Buffer'] = Buffer;
	}
	const scope = mixin({ console: console }, options.scope);
	//add the anything added to the scope as a property
	context.scope.forEach(function (s) {
		scope[s.name] = true;
	});
	//add any defined classes in the parsed context to defined
	context.define.forEach(function (d) {
		defined[d.name] = createDefined(d, defined, scope);
	});

	//expose any defined classes to the flow.
	for (const name in defined) {
		const cls = defined[name];
		flow.addDefined(name, cls);
	}

	let scopeNames: string[] = [];
	for (const scope of context.scope) {
		scopeNames.push(scope.name);
	}
	scopeNames = scopeNames.concat(Object.keys(scope));

	const definedNames = Object.keys(defined).map(function (s) {
		return s;
	});
	context.scope.forEach(function (s) {
		scope[s.name] = createFunction(s.body, defined, scope, scopeNames, definedNames);
	});
	const rules = context.rules;
	if (rules.length) {
		rules.forEach(function (rule) {
			flow.addRules(createRuleFromObject(rule, defined, scope));
		});
	}
	// if (cb) {
	//     cb.call(flow, flow);
	// }
	return flow;
};