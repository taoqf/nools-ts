import TupleEntry, {ITuple} from './tuple-entry';
import Table, {IEntry} from './table';
import {plucker} from '../../lang';
import Context from '../../context';
import getMemory from './get-memory';
import Fact from '../../facts/fact';

export interface IIndex {
	[0]: string;
	[1]: string;
	[2]: (factHash: Map<string, Fact>) => IEntry;
	[3]: (factHash: Map<string, Fact>) => IEntry;
	[4]: string;
}

let id = 0;
export default class Memory {
	public length = 0;
	public head: ITuple = null;
	public tail: ITuple = null;
	protected indexes: IIndex[] = [];
	protected tables = new TupleEntry(null, new Table(), false);

	push(data: Context) {
		const tail = this.tail, head = this.head, node: ITuple = { data: data, tuples: [], hashCode: id++, prev: tail, next: null };
		if (tail) {
			this.tail.next = node;
		}
		this.tail = node;
		if (!head) {
			this.head = node;
		}
		this.length++;
		this.__index(node);
		this.tables.addNode(node);
		return node;
	}

	remove(node: ITuple) {
		if (node.prev) {
			node.prev.next = node.next;
		} else {
			this.head = node.next;
		}
		if (node.next) {
			node.next.prev = node.prev;
		} else {
			this.tail = node.prev;
		}
		this.tables.removeNode(node);
		this.__removeFromIndex(node);
		this.length--;
	}

	forEach(cb: (ctx: Context) => void) {
		let head = { next: this.head } as ITuple;
		while ((head = head.next)) {
			cb(head.data);
		}
	}

	toArray() {
		return this.tables.tuples.slice();
	}

	clear() {
		this.head = this.tail = null;
		this.length = 0;
		this.clearIndexes();
	}

	clearIndexes() {
		this.tables.reset();
		this.indexes.length = 0;
	}

	__index(node: ITuple) {
		const data = node.data,
			factHash = data.factHash,
			indexes = this.indexes,
			l = indexes.length;
		let entry = this.tables;
		let i = -1;
		let tuples: TupleEntry;
		let currEntry: Table;
		let prevLookup: Table;
		while (++i < l) {
			const index = indexes[i];
			const val = index[2](factHash);
			const path = index[0];
			let tables = entry.tables;
			if (!tables.has(path)) {
				tables.set(path, new Table());
			}
			if (!(tuples = (currEntry = tables.get(path)).get(val))) {
				// tuples = new TupleEntry(val, currEntry, true);
				tuples = new TupleEntry(val as any, currEntry, true);	// todo: what's the type of val????
				currEntry.set(val, tuples);
			}
			if (currEntry !== prevLookup) {
				node.tuples.push(tuples.addNode(node));
			}
			prevLookup = currEntry;
			if (index[4] === "eq") {
				entry = tuples;
			}
		}
	}

	__removeFromIndex(node: ITuple) {
		const tuples = node.tuples;
		let i = tuples.length;
		while (--i >= 0) {
			tuples[i].removeNode(node);
		}
		node.tuples.length = 0;
	}

	getMemory(tuple: Context) {
		let ret: ITuple[];
		if (!this.length) {
			ret = [];
		} else {
			ret = getMemory(this.tables, tuple.factHash, this.indexes);
		}
		return ret;
	}

	__createIndexTree() {
		const table = this.tables.reset();
		const indexes = this.indexes;
		table.set(indexes[0][0], new Table());
	}


	addIndex(primary: string, lookup: string, op: string) {
		this.indexes.push([primary, lookup, plucker(primary), plucker(lookup), op || "eq"]);
		this.indexes.sort(function (a, b) {
			const aOp = a[4], bOp = b[4];
			return aOp === bOp ? 0 : aOp > bOp ? 1 : aOp === bOp ? 0 : -1;
		});
		this.__createIndexTree();

	}
}