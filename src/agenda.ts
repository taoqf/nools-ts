import EventEmitter from './EventEmitter';
import LinkedList from './linked-list';
import isFunction from 'lodash-ts/isFunction';
import { IInsert } from './interfaces';
import Flow from './flow';
import AVLTree from './nodes/leafy/avl-tree';
import TerminalNode from './nodes/terminal-node';
import Context from './context';

class FactHash {
	memory = new Map<string, IInsert | Context>();
	memoryValues = new LinkedList<IInsert>();

	clear() {
		this.memoryValues.clear();
		this.memory = new Map<string, IInsert>();
	}

	remove(v: Context | IInsert) {
		const hashCode = v.hashCode;
		const memory = this.memory;
		const ret = memory.get(hashCode);
		if (ret) {
			this.memoryValues.remove(ret);
			memory.delete(hashCode);
		}
		return ret;
	}

	insert(insert: IInsert) {
		const hashCode = insert.hashCode;
		if (this.memory.has(hashCode)) {
			throw new Error("Activation already in agenda " + insert.rule.name + " agenda");
		}
		this.memory.set(hashCode, insert);
		this.memoryValues.push(insert);
	}
}


interface IAgendaRule {
	[name: string]: {
		tree: AVLTree<IInsert>;
		factTable: FactHash;
	};
}

const DEFAULT_AGENDA_GROUP = "main";

export default class AgendaTree extends EventEmitter {
	private flow: Flow;
	private comparator: (a: IInsert, b: IInsert) => number;
	private agendaGroupStack = [DEFAULT_AGENDA_GROUP];
	private agendaGroups = new Map<string, AVLTree<IInsert>>();
	private rules = {} as IAgendaRule;
	constructor(flow: Flow, conflictResolution: (a: IInsert, b: IInsert) => number) {
		super();
		this.flow = flow;
		this.comparator = conflictResolution;
		this.setFocus(DEFAULT_AGENDA_GROUP).addAgendaGroup(DEFAULT_AGENDA_GROUP);
	}

	addAgendaGroup(groupName: string) {
		if (!this.agendaGroups.has(groupName)) {
			this.agendaGroups.set(groupName, new AVLTree(this.comparator));
		}
	}

	getAgendaGroup(groupName: string) {
		return this.agendaGroups.get(groupName || DEFAULT_AGENDA_GROUP);
	}

	setFocus(agendaGroup: string) {
		if (agendaGroup !== this.getFocused() && this.agendaGroups.has(agendaGroup)) {
			this.agendaGroupStack.push(agendaGroup);
			this.emit("focused", agendaGroup);
		}
		return this;
	}

	getFocused() {
		const ags = this.agendaGroupStack;
		return ags[ags.length - 1];
	}

	getFocusedAgenda() {
		return this.agendaGroups.get(this.getFocused());
	}

	register(node: TerminalNode) {
		const agendaGroup = node.rule.agendaGroup;
		this.rules[node.name] = { tree: new AVLTree(this.comparator), factTable: new FactHash() };
		if (agendaGroup) {
			this.addAgendaGroup(agendaGroup);
		}
	}

	isEmpty() {
		const agendaGroupStack = this.agendaGroupStack;
		let changed = false;
		while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
			agendaGroupStack.pop();
			changed = true;
		}
		if (changed) {
			this.emit("focused", this.getFocused());
		}
		return this.getFocusedAgenda().isEmpty();
	}

	fireNext(): Promise<any> {
		const agendaGroupStack = this.agendaGroupStack;
		while (this.getFocusedAgenda().isEmpty() && this.getFocused() !== DEFAULT_AGENDA_GROUP) {
			agendaGroupStack.pop();
		}
		if (!this.getFocusedAgenda().isEmpty()) {
			const activation = this.pop();
			this.emit("fire", activation.rule.name, activation.match.factHash);
			return activation.rule.fire(this.flow, activation.match);
		} else {
			//return false if activation not fired
			return new Promise((resolve, reject) => {
				reject(false);
			});
		}
	}

	pop() {
		const tree = this.getFocusedAgenda();
		let root = tree.get_root();
		while (root.right) {
			root = root.right;
		}
		const v = root.data;
		tree.remove(v);
		const rule = this.rules[v.name];
		rule.tree.remove(v);
		rule.factTable.remove(v);
		return v;
	}

	peek() {
		const tree = this.getFocusedAgenda();
		let root = tree.get_root();
		while (root.right) {
			root = root.right;
		}
		return root.data;
	}

	modify(node: TerminalNode, context: IInsert) {
		this.retract(node, context);
		this.insert(node, context);
	}

	retract(node: TerminalNode, retract: Context | IInsert) {
		const rule = this.rules[node.name];
		retract.rule = node;
		const activation = rule.factTable.remove(retract);
		if (activation) {
			this.getAgendaGroup(node.rule.agendaGroup).remove(activation as IInsert);
			rule.tree.remove(activation as IInsert);
		}
	}

	insert(node: TerminalNode, insert: IInsert) {
		const rule = this.rules[node.name], nodeRule = node.rule, agendaGroup = nodeRule.agendaGroup;
		rule.tree.insert(insert);
		this.getAgendaGroup(agendaGroup).insert(insert);
		if (agendaGroup) {
			if (nodeRule.autoFocus) {
				this.setFocus(agendaGroup);
			}
		}

		rule.factTable.insert(insert);
	}

	dispose() {
		for (const [name, agenda] of this.agendaGroups) {
			agenda.clear();
		}
		const rules = this.rules;
		for (const i in rules) {
			rules[i].tree.clear();
			rules[i].factTable.clear();
		}
		this.rules = {};
	}
}
