import {ITreeNode} from '../../leafy/tree';
import AVLTree from '../../leafy/avl-tree';
import TupleEntry, {ITuple} from './tuple-entry';

export interface IEntry {
	key: number;
	value?: TupleEntry;
}

function compare(ea: ITreeData, eb: ITreeData) {
	/*jshint eqeqeq: false*/
	const a = ea.key;
	const b = eb.key;
	let ret: number;
	if (a == b) {
		ret = 0;
	} else if (a > b) {
		ret = 1;
	} else if (a < b) {
		ret = -1;
	} else {
		ret = 1;
	}
	return ret;
}

function compareGT(v1: ITreeData, v2: ITreeData) {
	return compare(v1, v2) === 1;
}
function compareGTE(v1: ITreeData, v2: ITreeData) {
	return compare(v1, v2) !== -1;
}

function compareLT(v1: ITreeData, v2: ITreeData) {
	return compare(v1, v2) === -1;
}
function compareLTE(v1: ITreeData, v2: ITreeData) {
	return compare(v1, v2) !== 1;
}

const STACK: ITreeNode<ITreeData>[] = [];
const VALUE: ITreeData = { key: null };
function traverseInOrder(tree: Table, key: IEntry, comparator: (v1: ITreeData, v2: ITreeData) => boolean) {
	VALUE.key = key;
	const ret: ITuple[] = [];
	let i = 0, current = tree.get_root(), v: ITreeData;
	while (true) {
		if (current) {
			current = (STACK[i++] = current).left;
		} else {
			if (i > 0) {
				v = (current = STACK[--i]).data;
				if (comparator(v, VALUE)) {
					ret.push(...v.value.tuples);
					current = current.right;
				} else {
					break;
				}
			} else {
				break;
			}
		}
	}
	STACK.length = 0;
	return ret;
}

function traverseReverseOrder(tree: Table, key: IEntry, comparator: (v1: ITreeData, v2: ITreeData) => boolean) {
	VALUE.key = key;
	const ret: ITuple[] = [];
	let i = 0, current = tree.get_root();
	while (true) {
		if (current) {
			current = (STACK[i++] = current).right;
		} else {
			if (i > 0) {
				const v = (current = STACK[--i]).data;
				if (comparator(v, VALUE)) {
					ret.push(...v.value.tuples);
					current = current.left;
				} else {
					break;
				}
			} else {
				break;
			}
		}
	}
	STACK.length = 0;
	return ret;
}

export interface ITreeData {
	key: IEntry,
	value?: TupleEntry
}

export default class Table extends AVLTree<ITreeData>{
	protected hasGTCache = false;
	protected hasGTECache = false;
	protected hasLTCache = false;
	protected hasLTECache = false;
	protected gtCache = new Map<IEntry, ITuple[]>();
	protected gteCache = new Map<IEntry, ITuple[]>();
	protected ltCache = new Map<IEntry, ITuple[]>();
	protected lteCache = new Map<IEntry, ITuple[]>();
	constructor() {
		super(compare);
	}
	clearCache() {
		this.hasGTCache && this.gtCache.clear() && (this.hasGTCache = false);
		this.hasGTECache && this.gteCache.clear() && (this.hasGTECache = false);
		this.hasLTCache && this.ltCache.clear() && (this.hasLTCache = false);
		this.hasLTECache && this.lteCache.clear() && (this.hasLTECache = false);
	}

	contains_by_key(key: IEntry) {
		return this.contains({ key: key });
	}

	set(key: IEntry, value: TupleEntry) {
		this.insert({ key: key, value: value });
		this.clearCache();
	}

	get(key: IEntry) {
		const ret = this.find({ key: key });
		return ret && ret.value;
	}

	remove_by_key(key: IEntry) {
		this.clearCache();
		return this.remove({ key: key });
	}

	findGT(key: IEntry) {
		let ret = this.gtCache.get(key);
		if (!ret) {
			this.hasGTCache = true;
			this.gtCache.set(key, (ret = traverseReverseOrder(this, key, compareGT)));
		}
		return ret;
	}

	findGTE(key: IEntry) {
		let ret = this.gteCache.get(key);
		if (!ret) {
			this.hasGTECache = true;
			this.gteCache.set(key, (ret = traverseReverseOrder(this, key, compareGTE)));
		}
		return ret;
	}

	findLT(key: IEntry) {
		let ret = this.ltCache.get(key);
		if (!ret) {
			this.hasLTCache = true;
			this.ltCache.set(key, (ret = traverseInOrder(this, key, compareLT)));
		}
		return ret;
	}

	findLTE(key: IEntry) {
		let ret = this.lteCache.get(key);
		if (!ret) {
			this.hasLTECache = true;
			this.lteCache.set(key, (ret = traverseInOrder(this, key, compareLTE)));
		}
		return ret;
	}
}