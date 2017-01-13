import { IInsert, IRule } from './interfaces';
import { IRootNode } from './nodes';
import WorkingMemory from './working-memory';
import AgendaTree from './agenda';
import EventEmitter from './EventEmitter';

import { dispose, assertFact, retractFact, modifyFact, containsRule } from './nodes/root-node';
import ExecutionStrategy from './execution-strategy';
import build_nodes from './runtime/nodes';

export default class Flow extends EventEmitter {
	// conflictResolutionStrategy: (a, b) => number;
	private workingMemory = new WorkingMemory();
	public agenda: AgendaTree;
	public data: IRootNode;
	private executionStrategy: ExecutionStrategy;
	constructor(data: IRootNode, conflictResolutionStrategy: (a: IInsert, b: IInsert) => number, defined: Map<string, any>, scope: Map<string, any>) {
		super();
		this.agenda = new AgendaTree(this, conflictResolutionStrategy);
		this.agenda.on("fire", (...args: any[]) => {
			this.emit('fire', ...args);
		});
		this.agenda.on("focused", (...args: any[]) => {
			this.emit('focused', ...args);
		});
		this.data = build_nodes(data, this.agenda, defined, scope);
	}

	getFacts(Type: any) {
		return Type ? this.workingMemory.getFactsByType(Type) : this.workingMemory.getFacts();
	}

	getFact(Type: any) {
		const ret = this.getFacts(Type);
		return ret && ret[0];
	}

	focus(focused: string) {
		this.agenda.setFocus(focused);
		return this;
	}

	halt() {
		this.executionStrategy.halt();
		return this;
	}

	dispose() {
		this.workingMemory.dispose();
		this.agenda.dispose();
		dispose(this.data);
	}

	assert(fact: any) {
		assertFact(this.data, this.workingMemory.assertFact(fact), this.workingMemory);
		this.emit("assert", fact);
		return fact;
	}

	// This method is called to remove an existing fact from working memory
	retract(fact: any) {
		//fact = this.workingMemory.getFact(fact);
		retractFact(this.data, this.workingMemory.retractFact(fact), this.workingMemory);
		this.emit("retract", fact);
		return fact;
	}

	// This method is called to alter an existing fact.  It is essentially a
	// retract followed by an assert.
	modify(fact: any) {
		//fact = this.workingMemory.getFact(fact);
		modifyFact(this.data, this.workingMemory.modifyFact(fact), this.workingMemory);
		this.emit("modify", fact);
		return fact;
	}

	containsRule(name: string) {
		return containsRule(this.data, name);
	}

	matchUntilHalt() {
		this.executionStrategy = new ExecutionStrategy(this, true);
		return this.executionStrategy.execute();
	}

	match() {
		this.executionStrategy = new ExecutionStrategy(this);
		return this.executionStrategy.execute();
	}
}