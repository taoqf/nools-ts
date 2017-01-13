import conflictResolution from './conflict';
import Flow from './flow';
import { IRootNode } from './nodes';
import { IInsert } from './interfaces';
import InitialFact from './facts/initial';

export default class FlowContainer {
	private __defined = new Map<string, any>();
	private root: IRootNode;
	private conflictResolutionStrategy: (a: IInsert, b: IInsert) => number;
	private defined: Map<string, any>;
	private scope: Map<string, any>;
	constructor(data: IRootNode, defined: Map<string, any>, scope: Map<string, any>) {
		this.defined = defined;
		this.scope = scope;
		this.root = data;
		this.conflictResolutionStrategy = conflictResolution;
	}

	getDefined(name: string) {
		const ret = this.__defined.get(name);
		if (!ret) {
			throw new Error(name + " flow class is not defined");
		}
		return ret;
	}

	addDefined(name: string, cls: any) {
		// normalize
		this.__defined.set(name, cls);
		return cls;
	}

	getSession(...facts: any[]) {
		const flow = new Flow(this.root, this.conflictResolutionStrategy, this.defined, this.scope);
		flow.assert(new InitialFact());
		facts.forEach((fact) => {
			flow.assert(fact);
		});
		return flow;
	}
}
