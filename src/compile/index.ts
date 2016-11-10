import { IContext, IConstraintContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ITrueConstraint, ICompileOptions, ICondition } from '../interfaces';
import Container from '../flow-container';
import { createDefined, createFunction } from './common';

import isEmpty from 'lodash-ts/isEmpty';
import isHash from 'lodash-ts/isHash';
import isObject from 'lodash-ts/isObject';
import parseConstraint from '../parser/constraint';
import { removeDups } from '../lang';
import { getIdentifiers } from '../constraint-matcher';
import { createRule } from '../rule';
import keys from 'lodash-ts/keys';

const __resolveRule = function (rule: INomalConstraint | IFromstraint, defined: Map<string, any>, name: string) {
	const condition = [] as any[], alias = rule[1];
	// const condition = [] as [any, string, string, string], alias = rule[1];
	let constraint = rule[2], refs = rule[3];
	if (isHash(constraint)) {
		refs = constraint;
		constraint = null;
	}
	let definedClass = rule[0];
	if (definedClass && !!(definedClass = defined.get(definedClass))) {
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

function parseRule(rule: ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint, defined: Map<string, any>, name: string) {
	if (rule.length) {
		let conditions: any[][] = [];
		let identifiers: string[] = [];
		const r0 = rule[0];	// OAV
		if (r0 === "not" || r0 === "exists") {
			rule.shift();
			const [i, c, r] = __resolveRule(rule as INomalConstraint | IFromstraint, defined, name);
			identifiers = identifiers.concat(i as string[]);
			if (r) {
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
			// rule.forEach((cond) => {
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

function get_append_declares(action: string) {
	const vars = new Set<string>();
	return function (arr: string[], scope: string) {
		return arr.filter((v) => {
			return action.indexOf(v) !== -1;
		}).map((v: string) => {
			if (vars.has(v)) {
				return `${scope}.has('${v}') && (${v} = ${scope}.get('${v}'));`;
			} else {
				vars.add(v);
				return `let ${v} = ${scope}.get('${v}');`;
			}
		});
	}
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
function parseAction(action: string, identifiers: string[], defined: Map<string, any>, scope: Map<string, any>) {
	const append_declares = get_append_declares(action);

	const declares = append_declares(identifiers, 'facts')
		.concat(append_declares(keys(defined), 'defined'))
		.concat(append_declares(keys(scope), 'scope'));

	// modifiers.forEach((i) => {
	// 	if (action.indexOf(i) !== -1) {
	// 		declares.push(`if(!${i}){ let ${i}= flow.${i};}`);
	// 	}
	// });
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

function createRuleFromObject(obj: IConstraintContext, defined: Map<string, any>, scope: Map<string, any>) {
	const name = obj.name;
	if (isEmpty(obj)) {
		throw new Error("Rule is empty");
	}
	const options = obj.options || {};
	options.scope = scope;
	let constraints = obj.constraints || [], l = constraints.length;
	if (!l) {
		constraints = [["true"]] as ITrueConstraint[];	// todo:::: This is not in the right format.
	}
	const action = obj.action;
	if (action === undefined) {
		throw new Error("No action was defined for rule " + name);
	}
	let conditions: ICondition[] = [];
	let identifiers: string[] = [];
	constraints.forEach((rule) => {
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
	const defined = options.define || new Map<string, any>();
	defined.set('Array', Array);
	defined.set('array', Array);
	defined.set('String', String);
	defined.set('string', String);
	defined.set('Number', Number);
	defined.set('number', Number);
	defined.set('Boolean', Boolean);
	defined.set('boolean', Boolean);
	defined.set('RegExp', RegExp);
	defined.set('regexp', RegExp);
	defined.set('reg', RegExp);
	defined.set('Date', Date);
	defined.set('date', Date);
	defined.set('Object', Object);
	defined.set('object', Object);
	if (typeof Buffer !== "undefined") {
		defined.set('Buffer', Buffer);
		defined.set('buffer', Buffer);
	}
	const scope = options.scope || new Map<string, any>();
	//add the anything added to the scope as a property
	// context.scope.forEach((s) => {
	// 	scope.set(s.name, true);
	// });
	//add any defined classes in the parsed context to defined
	context.define.forEach((d) => {
		defined.set(d.name, createDefined(d, defined, scope));
	});

	//expose any defined classes to the flow.
	for (const [name, cls] of defined) {
		flow.addDefined(name, cls);
	}

	context.scope.forEach((s) => {
		scope.set(s.name, createFunction(s.body, defined, scope));
	});
	const rules = context.constraints;
	if (rules.length) {
		rules.forEach((rule) => {
			flow.addRules(createRuleFromObject(rule, defined, scope));
		});
	}
	// if (cb) {
	//     cb.call(flow, flow);
	// }
	return flow;
};