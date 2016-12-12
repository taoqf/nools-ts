import isEmpty from 'lodash-ts/isEmpty';
import isHash from 'lodash-ts/isHash';
import isObject from 'lodash-ts/isObject';
import isMap from 'lodash-ts/isMap';
import keys from 'lodash-ts/keys';

import { IContext, IRuleContext, ISimpleConstraint, INomalConstraint, INotConstraint, IFromstraint, IOrConstraint, ICompileOptions, ICondition, IRule } from '../interfaces';
import { removeDups, to_map } from '../lang';
import { get_defines, createDefined, createFunction } from '../compile';
import { getIdentifiers } from '../constraint-matcher';
import parseConstraint from './parser/constraint';
import { createRule } from './rule';

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
		condition.push([rule[0], definedClass]);
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
		for (const j in refs as any) {
			const ident = (refs as any)[j];
			if (identifiers.indexOf(ident) === -1) {
				idents.push(ident);
			}
		}
		return [identifiers, condition, idents];
	}
	return [identifiers, condition];
}

function parseConditions(constraint: ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint, defined: Map<string, any>, name: string): [string[], any[]] {
	if (constraint.length) {
		let conditions: any[][] = [];
		let identifiers: string[] = [];
		const r0 = constraint[0];
		if (r0 === "not" || r0 === "exists") {
			constraint.shift();
			const [i, c, r] = __resolveRule(constraint as INomalConstraint | IFromstraint, defined, name);
			identifiers = identifiers.concat(i as string[]);
			if (r) {
				const idents = r.filter((ident) => {
					return identifiers.indexOf(ident) == -1;
				});
				if (idents.length) {
					identifiers = identifiers.concat(idents);
				}
			}
			c.unshift(r0);
			conditions.push(c);
		} else if (r0 === "or") {
			let conds: any[] = [r0];
			constraint.shift();
			(constraint as IOrConstraint).forEach((cond) => {
				const [i, c] = parseConditions(cond as ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint, defined, name);
				conds = conds.concat(c);
				identifiers = identifiers.concat(i as string[]);
			});
			conditions.push(conds);
		} else {
			const [i, c, r] = __resolveRule(constraint as INomalConstraint | IFromstraint, defined, name);
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
	return [[], []];
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

const modifiers = ["assert", "modify", "retract", "emit", "halt", "focus", "getFacts"];

function parseAction(action: string, identifiers: string[], defined: Map<string, any>, scope: Map<string, any>) {
	const append_declares = get_append_declares(action);

	const declares = append_declares(identifiers, 'facts')
		.concat(append_declares(keys(defined), 'defined'))
		.concat(append_declares(keys(scope), 'scope'));

	modifiers.forEach((i) => {
		if (action.indexOf(i) !== -1) {
			declares.push(`const ${i}=(...args)=>{flow.${i}(...args)};`);
		}
	});
	action = declares.join("") + action;
	return action.trim();
}

function createRuleFromObject(obj: IRuleContext, defined: Map<string, any>, scope: Map<string, any>) {
	const name = obj.name;
	if (isEmpty(obj)) {
		throw new Error("Rule is empty");
	}
	const options = obj.options || {};
	options.scope = scope;
	let constraints = obj.constraints || [], l = constraints.length;
	if (!l) {
		constraints = [['initialfact', '__o__']];
	}
	const action = obj.action;
	if (action === undefined) {
		throw new Error("No action was defined for rule " + name);
	}
	let conditions: ICondition[] = [];
	let identifiers: string[] = [];
	constraints.forEach((constraint) => {
		const [i, c] = parseConditions(constraint, defined, name);
		conditions = conditions.concat(c);
		identifiers = identifiers.concat(i);
	});
	return createRule(name, options, conditions, parseAction(action, identifiers, defined, scope));
}

export default function parse(context: IContext, options: ICompileOptions) {
	const name = options.name;
	//if !name throw an error
	if (!name) {
		throw new Error("Name must be present in JSON or options");
	}
	const defines = get_defines(options.define);
	const scope = to_map(options.scope);
	//add the anything added to the scope as a property
	// context.scope.forEach((s) => {
	// 	scope.set(s.name, true);
	// });
	//add any defined classes in the parsed context to defined
	context.define.forEach((d) => {
		defines.set(d.name, createDefined(d, defines, scope));
	});

	context.scope.forEach((s) => {
		scope.set(s.name, createFunction(s.body, defines, scope));
	});
	const rules = context.rules;
	return rules.reverse().reduce((rules, rule) => {
		return rules.concat(createRuleFromObject(rule, defines, scope));
	}, [] as IRule[]);
};
