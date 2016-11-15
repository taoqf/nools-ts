import instanceOf from 'lodash-ts/isinstanceof';
import conflictResolution from './conflict';
import Flow from './flow';
import { IInsert, IRuleContextOptions, ICondition } from './interfaces';
import Rule, { createRule } from './rule';
import InitialFact from './facts/initial';

const flows = new Map<string, FlowContainer>();

export default class FlowContainer {
	private name: string;
	private __rules: Rule[] = [];
	private __defined = new Map<string, any>();
	private conflictResolutionStrategy: (a: IInsert, b: IInsert) => number;
	constructor(name: string) {
		this.name = name;
		// this.cb = cb;
		this.conflictResolutionStrategy = conflictResolution;
		// if (cb) {
		// 	cb.call(this, this);
		// }
		if (!flows.has(name)) {
			flows.set(name, this);
		} else {
			throw new Error("Flow with " + name + " already defined");
		}
	}

	addRules(rules: Rule[]) {
		this.__rules = this.__rules.concat(rules);
	}

	getDefined(name: string) {
		const ret = this.__defined.get(name.toLowerCase());
		if (!ret) {
			throw new Error(name + " flow class is not defined");
		}
		return ret;
	}

	addDefined(name: string, cls: any) {
		//normalize
		this.__defined.set(name.toLowerCase(), cls);
		return cls;
	}

	rule(name: string, options: IRuleContextOptions, conditions: ICondition[], cb: Function) {
		this.__rules = this.__rules.concat(createRule(name, options, conditions, cb));
		return this;
	}

	getSession(...facts: any[]) {
		const flow = new Flow(this.name, this.conflictResolutionStrategy);
		this.__rules.forEach((rule) => {
			flow.rule(rule);
		});
		flow.assert(new InitialFact());
		facts.forEach((fact) => {
			flow.assert(fact);
		});
		return flow;
	}

	containsRule(name: string) {
		return this.__rules.some((rule) => {
			return rule.name === name;
		});
	}

	static getFlow(name: string) {
		return flows.get(name);
	}

	static hasFlow(name: string) {
		return flows.has(name);
	}

	static deleteFlow(name: string | FlowContainer) {
		if (instanceOf(name, FlowContainer)) {
			name = (name as FlowContainer).name;
		}
		flows.delete(name as string);
		return FlowContainer;
	}

	static deleteFlows() {
		for (const name in flows) {
			if (name in flows) {
				flows.delete(name);
			}
		}
		return FlowContainer;
	}

	static create(name: string) {
		return new FlowContainer(name);
	}
}