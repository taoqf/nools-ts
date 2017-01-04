import instanceOf from 'lodash-ts/isinstanceof';
import conflictResolution from './conflict';
import Flow from './flow';
import { IInsert, IRuleContextOptions, ICondition, IRule } from './interfaces';
import { IRootNode } from './nodes';
import InitialFact from './facts/initial';

export default class FlowContainer {
	private __rules: IRule[] = [];
	private __defined = new Map<string, any>();
	private root_nodes: IRootNode;
	private conflictResolutionStrategy: (a: IInsert, b: IInsert) => number;
	private defined: Map<string, any>;
	private scope: Map<string, any>;
	constructor(root_node: IRootNode, defined: Map<string, any>, scope: Map<string, any>) {
		this.defined = defined;
		this.scope = scope;
		this.root_nodes = root_node;
		// this.cb = cb;
		this.conflictResolutionStrategy = conflictResolution;
		// if (cb) {
		// 	cb.call(this, this);
		// }
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

	getSession(...facts: any[]) {
		const flow = new Flow(this.root_nodes, this.conflictResolutionStrategy, this.defined, this.scope);
		flow.assert(new InitialFact());
		facts.forEach((fact) => {
			flow.assert(fact);
		});
		return flow;
	}

	containsRule(name: string) {
		return this.__rules.some((rule) => {
			return rule.n === name;
		});
	}
}
