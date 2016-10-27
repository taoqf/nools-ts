import {IIndex} from './memory';
import TupleEntry, {ITuple} from './tuple-entry';
import Fact from '../../facts/fact';
import Table, {IEntry} from './table';

const EMPTY_ARRAY: ITuple[] = [];
let NOT_POSSIBLES_HASH: { [hashCode: string]: boolean } = {};
let POSSIBLES_HASH: { [hashCode: string]: boolean } = {};
let NPL = 0;
let PL = 0;

function mergePossibleTuples(ret: ITuple[], a: ITuple[], l: number) {
	let val: ITuple, j = 0, i = -1;
	if (PL < l) {
		while (PL && ++i < l) {
			if (POSSIBLES_HASH[(val = a[i]).hashCode]) {
				ret[j++] = val;
				PL--;
			}
		}
	} else {
		ret.push(...a);
	}
	PL = 0;
	POSSIBLES_HASH = {};
}

function mergeNotPossibleTuples(ret: ITuple[], a: ITuple[], l: number) {
	let val: ITuple, j = 0, i = -1;
	if (NPL < l) {
		while (++i < l) {
			if (!NPL) {
				ret[j++] = a[i];
			} else if (!NOT_POSSIBLES_HASH[(val = a[i]).hashCode]) {
				ret[j++] = val;
			} else {
				NPL--;
			}
		}
	}
	NPL = 0;
	NOT_POSSIBLES_HASH = {};
}

function mergeBothTuples(ret: ITuple[], a: ITuple[], l: number) {
	if (PL === l) {
		// mergeNotPossibles(ret, a, l);
		mergeNotPossibles(ret, l);
	} else if (NPL < l) {
		a.filter((tuple) => {
			const hashCode = tuple.hashCode;
			return !NOT_POSSIBLES_HASH[hashCode] && POSSIBLES_HASH[hashCode];
		}).forEach((tuple) => {
			ret.push(tuple);
		});
	}
	NPL = 0;
	NOT_POSSIBLES_HASH = {};
	PL = 0;
	POSSIBLES_HASH = {};
}

function mergePossiblesAndNotPossibles(a: ITuple[], l: number) {
	let ret: ITuple[] = EMPTY_ARRAY;
	if (l) {
		if (NPL || PL) {
			ret = [];
			if (!NPL) {
				mergePossibleTuples(ret, a, l);
			} else if (!PL) {
				mergeNotPossibleTuples(ret, a, l);
			} else {
				mergeBothTuples(ret, a, l);
			}
		} else {
			ret = a;
		}
	}
	return ret;
}

function getRangeTuples(op: string, currEntry: Table, val: IEntry) {
	let ret: ITuple[];
	if (op === "gt") {
		ret = currEntry.findGT(val);
	} else if (op === "gte") {
		ret = currEntry.findGTE(val);
	} else if (op === "lt") {
		ret = currEntry.findLT(val);
	} else if (op === "lte") {
		ret = currEntry.findLTE(val);
	}
	return ret;
}

function mergeNotPossibles(tuples: ITuple[], tl: number) {
	if (tl) {
		let j = -1;
		while (++j < tl) {
			const hashCode = tuples[j].hashCode;
			if (!NOT_POSSIBLES_HASH[hashCode]) {
				NOT_POSSIBLES_HASH[hashCode] = true;
				NPL++;
			}
		}
	}
}

function mergePossibles(tuples: ITuple[], tl: number) {
	if (tl) {
		let j = -1;
		while (++j < tl) {
			const hashCode = tuples[j].hashCode;
			if (!POSSIBLES_HASH[hashCode]) {
				POSSIBLES_HASH[hashCode] = true;
				PL++;
			}
		}
	}
}

export default function getMemory(entry: TupleEntry, factHash: Map<string, Fact>, indexes: IIndex[]) {
	const l = indexes.length;
	let intersected = false;
	let tables = entry.tables;
	let ret = entry.tuples;
	let i = -1;
	let rl = ret.length;
	let tl: number;
	while (++i < l && rl) {
		const index = indexes[i];
		const val = index[3](factHash);
		const op = index[4];
		const currEntry = tables.get(index[0]);
		let tuples: ITuple[];	// todo: = []?
		if (op === "eq" || op === "seq") {
			const nextEntry = currEntry.get(val);
			if (nextEntry) {
				rl = (ret = (entry = nextEntry).tuples).length;
				tables = nextEntry.tables;
			} else {
				rl = (ret = EMPTY_ARRAY).length;
			}
		} else if (op === "neq" || op === "sneq") {
			const nextEntry = currEntry.get(val);
			if (nextEntry) {
				tl = (tuples = nextEntry.tuples).length;
				mergeNotPossibles(tuples, tl);
			}
		} else if (!intersected) {
			rl = (ret = getRangeTuples(op, currEntry, val)).length;
			intersected = true;
		} else if ((tl = (tuples = getRangeTuples(op, currEntry, val)).length)) {
			mergePossibles(tuples, tl);
		} else {
			ret = tuples;
			rl = tl;
		}
	}
	return mergePossiblesAndNotPossibles(ret, rl);
}