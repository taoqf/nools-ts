import EventEmitter from './EventEmitter';
import isFunction from 'lodash-ts/isFunction';
import { IInsert } from './interfaces';
import Flow from './flow';
import AVLTree from './leafy/avl-tree';
import { ITerminalNode } from './nodes';
import Context from './context';

interface IFactHash extends Map<string, IInsert | Context> {
}

interface IAgendaRule {
	[name: string]: {
		tree: AVLTree<IInsert>;
		factTable: IFactHash;
	};
}

function fh_create(): IFactHash {
	return new Map<string, IInsert | Context>();
}

function fh_remove(fh: IFactHash, v: Context | IInsert) {
	const hashCode = v.hashCode;
	const memory = fh;
	const ret = memory.get(hashCode);
	if (ret) {
		memory.delete(hashCode);
	}
	return ret;
}

function fh_insert(fh: IFactHash, insert: IInsert) {
	const hashCode = insert.hashCode;
	const memory = fh;
	if (memory.has(hashCode)) {
		throw new Error("Activation already in agenda " + insert.rule.n + " agenda");
	}
	memory.set(hashCode, insert);
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

	register(node: ITerminalNode) {
		const agendaGroup = node.r.g;
		this.rules[node.n] = { tree: new AVLTree(this.comparator), factTable: fh_create() };
		if (agendaGroup) {
			this.addAgendaGroup(agendaGroup);
		}
		return node;
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
			this.emit("fire", activation.rule.n, activation.match.factHash);
			return activation.rule.fire(this.flow, activation.match);
		} else {
			//return false if activation not fired
			return new Promise((resolve, reject) => {
				resolve();
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
		fh_remove(rule.factTable, v);
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

	modify(node: ITerminalNode, context: IInsert) {
		this.retract(node, context);
		this.insert(node, context);
	}

	retract(node: ITerminalNode, retract: Context | IInsert) {
		const rule = this.rules[node.n];
		retract.rule = node;
		const activation = fh_remove(rule.factTable, retract);
		if (activation) {
			this.getAgendaGroup(node.r.g).remove(activation as IInsert);
			rule.tree.remove(activation as IInsert);
		}
	}

	insert(node: ITerminalNode, insert: IInsert) {
		const rule = this.rules[node.n], nodeRule = node.r, agendaGroup = nodeRule.g;
		rule.tree.insert(insert);
		this.getAgendaGroup(agendaGroup).insert(insert);
		if (agendaGroup) {
			if (nodeRule.af) {
				this.setFocus(agendaGroup);
			}
		}

		fh_insert(rule.factTable, insert);
	}

	dispose() {
		for (const [name, agenda] of this.agendaGroups) {
			agenda.clear();
		}
		const rules = this.rules;
		for (const i in rules) {
			rules[i].tree.clear();
			rules[i].factTable = fh_create();
		}
		this.rules = {};
	}
}
