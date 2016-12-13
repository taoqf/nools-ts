import TupleEntry, { ITuple } from './tuple-entry';
import Table, { IEntry } from './table';
import { plucker } from '../../lang';
import Context from '../../context';
import get_memory from './get-memory';
import Fact from '../../facts/fact';

export interface IIndex {
	[0]: string;
	[1]: string;
	[2]: (factHash: Map<string, Fact>) => IEntry;
	[3]: (factHash: Map<string, Fact>) => IEntry;
	[4]: string;
}

let id = 0;

export interface IMemory {
	length: number;
	head: ITuple;
	tail: ITuple;
	indexes: IIndex[];
	tables: TupleEntry;
}

export default function Memory(): IMemory {
	return {
		length: 0,
		head: null,
		tail: null,
		indexes: [],
		tables: new TupleEntry(null, new Table(), false)
	};
}

export function memory_push(m: IMemory, data: Context) {
	const tail = m.tail, head = m.head, node: ITuple = { data: data, tuples: [], hashCode: id++, prev: tail, next: null };
	if (tail) {
		m.tail.next = node;
	}
	m.tail = node;
	if (!head) {
		m.head = node;
	}
	m.length++;
	__index(m, node);
	m.tables.addNode(node);
	return node;
}

export function memory_remove(m: IMemory, node: ITuple) {
	if (node.prev) {
		node.prev.next = node.next;
	} else {
		m.head = node.next;
	}
	if (node.next) {
		node.next.prev = node.prev;
	} else {
		m.tail = node.prev;
	}
	m.tables.removeNode(node);
	__removeFromIndex(m, node);
	m.length--;
}

// function forEach(m: IMemory, cb: (ctx: Context) => void) {
// 	let head = { next: m.head } as ITuple;
// 	while ((head = head.next)) {
// 		cb(head.data);
// 	}
// }

// function toArray(m: IMemory) {
// 	return m.tables.tuples.slice();
// }

export function memory_clear(m: IMemory) {
	m.head = m.tail = null;
	m.length = 0;
	clearIndexes(m);
}

function clearIndexes(m: IMemory) {
	m.tables.reset();
	m.indexes.length = 0;
}

function __index(m: IMemory, node: ITuple) {
	const data = node.data,
		factHash = data.factHash,
		indexes = m.indexes,
		l = indexes.length;
	let entry = m.tables;
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

function __removeFromIndex(m: IMemory, node: ITuple) {
	const tuples = node.tuples;
	let i = tuples.length;
	while (--i >= 0) {
		tuples[i].removeNode(node);
	}
	node.tuples.length = 0;
}

export function memory_get(m: IMemory, tuple: Context) {
	let ret: ITuple[];
	if (!m.length) {
		ret = [];
	} else {
		ret = get_memory(m.tables, tuple.factHash, m.indexes);
	}
	return ret;
}

function __createIndexTree(m: IMemory) {
	const table = m.tables.reset();
	const indexes = m.indexes;
	table.set(indexes[0][0], new Table());
}

export function addIndex(m: IMemory, primary: string, lookup: string, op: string) {
	m.indexes.push([primary, lookup, plucker(primary), plucker(lookup), op || "eq"]);
	m.indexes.sort(function (a, b) {
		const aOp = a[4], bOp = b[4];
		return aOp === bOp ? 0 : aOp > bOp ? 1 : aOp === bOp ? 0 : -1;
	});
	__createIndexTree(m);
}