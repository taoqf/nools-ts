import { IInsert } from './interfaces';
import WorkingMemory from './working-memory';
import AgendaTree from './agenda';
import EventEmitter from './EventEmitter';
import { IRootNode, create_root_node, dispose, assertFact, retractFact, modifyFact, assertRule, containsRule } from './nodes/root-node';
import { IRule } from './rule';
import ExecutionStrategy from './execution-strategy';

export default class Flow extends EventEmitter {
	private name: string;
	// conflictResolutionStrategy: (a, b) => number;
	private workingMemory = new WorkingMemory();
	public agenda: AgendaTree;
	public rootNode: IRootNode;
	private executionStrategy: ExecutionStrategy;
	constructor(name: string, conflictResolutionStrategy: (a: IInsert, b: IInsert) => number) {
		super();
		// this.env = null;
		this.name = name;
		// this.__rules = {};
		// this.conflictResolutionStrategy = conflictResolutionStrategy;
		this.agenda = new AgendaTree(this, conflictResolutionStrategy);
		this.agenda.on("fire", (...args: any[]) => {
			this.emit('fire', ...args);
		});
		this.agenda.on("focused", (...args: any[]) => {
			this.emit('focused', ...args);
		});
		this.rootNode = create_root_node();
		// extd.bindAll(this, "halt", "assert", "retract", "modify", "focus",
		// 	"emit", "getFacts", "getFact");
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
		dispose(this.rootNode);
	}

	assert(fact: any) {
		assertFact(this.rootNode, this.workingMemory.assertFact(fact));
		this.emit("assert", fact);
		return fact;
	}

	// This method is called to remove an existing fact from working memory
	retract(fact: any) {
		//fact = this.workingMemory.getFact(fact);
		retractFact(this.rootNode, this.workingMemory.retractFact(fact));
		this.emit("retract", fact);
		return fact;
	}

	// This method is called to alter an existing fact.  It is essentially a
	// retract followed by an assert.
	modify(fact: any) {
		//fact = this.workingMemory.getFact(fact);
		modifyFact(this.rootNode, this.workingMemory.modifyFact(fact));
		this.emit("modify", fact);
		return fact;
	}

	containsRule(name: string) {
		return containsRule(this.rootNode, name);
	}

	rule(rule: IRule) {
		assertRule(this.rootNode, rule, this.workingMemory, this.agenda);
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