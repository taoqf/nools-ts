function compare(a: number, b: number) {
	let ret = 0;
	if (a > b) {
		return 1;
	} else if (a < b) {
		return -1;
	} else if (!b) {
		return 1;
	}
	return ret;
}

function isUndefinedOrNull(val: any) {
	return val === undefined || val === null;
}

export type Dir = 'left' | 'right';

export interface ITreeNode<T> {
	data: T;
	parent?: ITreeNode<T>;
	left?: ITreeNode<T>;
	right?: ITreeNode<T>;
	level?: number;
	balance?: number;
	red?: boolean;
	[dir: string]: ITreeNode<T> | T | number | boolean;
}

const PRE_ORDER = "pre_order";
const IN_ORDER = "in_order";
const POST_ORDER = "post_order";
const REVERSE_ORDER = "reverse_order";

export default class Tree<T> {
	protected __root: ITreeNode<T> = null;
	constructor(cmp?: (a: T, b: T) => number) {
		cmp && (this.compare = cmp);
	}
	public compare = compare as any as (a: T, b: T) => number;
	get_root() {
		return this.__root;
	}
	set_root(root: ITreeNode<T>) {
		this.__root = root;
	}
	insert(data: T) {
		throw new Error("Not Implemented");
	}

	remove(data: T) {
		throw new Error("Not Implemented");
	}

	clear() {
		this.__root = null;
	}

	isEmpty() {
		return !(this.__root);
	}

	print() {
		this.__printNode(this.__root, 0);
	}
	/**
	 * Prints a node
	 * @param node node to print
	 * @param level the current level the node is at, Used for formatting
	 */
	__printNode(node: ITreeNode<T>, level: number) {
		//console.log(level);
		const str: string[] = [];
		if (isUndefinedOrNull(node)) {
			str.push('\t'.repeat(level));
			str.push("~");
			console.log(str.join(""));
		} else {
			this.__printNode(node.right, level + 1);
			str.push('\t'.repeat(level));
			str.push(node.data + "\n");
			console.log(str.join(""));
			this.__printNode(node.left, level + 1);
		}
	}

	forEach(cb: (data: T, tree: Tree<T>) => void, order: string) {
		if (typeof cb !== "function") {
			throw new TypeError();
		}
		order = order || IN_ORDER;
		this.traverse(this.__root, order, (node) => {
			cb(node, this);
		});
	}

	traverse(node: ITreeNode<T>, order?: string, callback?: (data: T) => void) {
		if (node) {
			order = order || PRE_ORDER;
			if (order === PRE_ORDER) {
				callback(node.data);
				this.traverse(node.left, order, callback);
				this.traverse(node.right, order, callback);
			} else if (order === IN_ORDER) {
				this.traverse(node.left, order, callback);
				callback(node.data);
				this.traverse(node.right, order, callback);
			} else if (order === POST_ORDER) {
				this.traverse(node.left, order, callback);
				this.traverse(node.right, order, callback);
				callback(node.data);
			} else if (order === REVERSE_ORDER) {
				this.traverse(node.right, order, callback);
				callback(node.data);
				this.traverse(node.left, order, callback);
			}
		}
	}

	traverseWithCondition(node: ITreeNode<T>, order?: string, callback?: (data: T) => boolean): boolean {
		let cont = true;
		if (node) {
			order = order || PRE_ORDER;
			if (order === PRE_ORDER) {
				cont = callback(node.data);
				if (cont) {
					cont = this.traverseWithCondition(node.left, order, callback);
					if (cont) {
						cont = this.traverseWithCondition(node.right, order, callback);
					}

				}
			} else if (order === IN_ORDER) {
				cont = this.traverseWithCondition(node.left, order, callback);
				if (cont) {
					cont = callback(node.data);
					if (cont) {
						cont = this.traverseWithCondition(node.right, order, callback);
					}
				}
			} else if (order === POST_ORDER) {
				cont = this.traverseWithCondition(node.left, order, callback);
				if (cont) {
					if (cont) {
						cont = this.traverseWithCondition(node.right, order, callback);
					}
					if (cont) {
						cont = callback(node.data);
					}
				}
			} else if (order === REVERSE_ORDER) {
				cont = this.traverseWithCondition(node.right, order, callback);
				if (cont) {
					cont = callback(node.data);
					if (cont) {
						cont = this.traverseWithCondition(node.left, order, callback);
					}
				}
			}
		}
		return cont;
	}

	map(cb: (data: T, tree: Tree<T>) => T, order: string) {
		if (typeof cb !== "function") {
			throw new TypeError();
		}

		order = order || IN_ORDER;
		const ret = new Tree<T>();
		this.traverse(this.__root, order, (node) => {
			ret.insert(cb(node, this));
		});
		return ret;
	}

	filter(cb: (data: T, tree: Tree<T>) => boolean, order: string) {
		if (typeof cb !== "function") {
			throw new TypeError();
		}

		order = order || IN_ORDER;
		const ret = new Tree<T>();
		this.traverse(this.__root, order, (node) => {
			if (cb(node, this)) {
				ret.insert(node);
			}
		});
		return ret;
	}
	some(cb: (data: T, tree: Tree<T>) => boolean, order: string) {
		if (typeof cb !== "function") {
			throw new TypeError();
		}

		order = order || IN_ORDER;
		let ret = false;
		this.traverseWithCondition(this.__root, order, (node) => {
			ret = cb(node, this);
			return !ret;
		});
		return ret;
	}
	every(cb: (data: T, tree: Tree<T>) => boolean, order: string) {
		if (typeof cb !== "function") {
			throw new TypeError();
		}
		order = order || IN_ORDER;
		let ret = false;
		this.traverseWithCondition(this.__root, order, (node) => {
			ret = cb(node, this);
			return ret;
		});
		return ret;
	}

	toArray(order?: string) {
		order = order || IN_ORDER;
		const arr: T[] = [];
		this.traverse(this.__root, order, function (node) {
			arr.push(node);
		});
		return arr;
	}

	reduce(fun: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, accumulator?: T, order?: string): T;
	reduce<U>(fun: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, accumulator?: U, order?: string): U;
	reduce(fun: any, accumulator: any, order: any) {
		const arr = this.toArray(order);
		return arr.reduce(fun, accumulator);
	}

	reduceRight(fun: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, accumulator?: T, order?: string): T;

	reduceRight<U>(fun: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => T, accumulator?: U, order?: string): U;
	reduceRight(fun: any, accumulator: any, order: any) {
		const arr = this.toArray(order);
		return arr.reduceRight(fun, accumulator);
	}


	contains(value: T) {
		let ret = false;
		let root = this.__root;
		while (root !== null) {
			const cmp = this.compare(value, root.data);
			if (cmp) {
				root = cmp === -1 ? root.left : root.right;
			} else {
				ret = true;
				root = null;
			}
		}
		return ret;
	}

	find(value: T) {
		let ret: T;
		let root = this.__root;
		while (root) {
			const cmp = this.compare(value, root.data);
			if (cmp) {
				root = cmp === -1 ? root.left : root.right;
			} else {
				ret = root.data;
				break;
			}
		}
		return ret;
	}

	findLessThan(value: T, exclusive?: boolean) {
		//find a better way!!!!
		const ret: T[] = [];
		const compare = this.compare;
		this.traverseWithCondition(this.__root, IN_ORDER, function (v) {
			const cmp = compare(value, v);
			if ((!exclusive && cmp === 0) || cmp === 1) {
				ret.push(v);
				return true;
			} else {
				return false;
			}
		});
		return ret;
	}


	findGreaterThan(value: T, exclusive?: boolean) {
		//find a better way!!!!
		const ret: T[] = [];
		const compare = this.compare;
		this.traverse(this.__root, REVERSE_ORDER, function (v) {
			const cmp = compare(value, v);
			if ((!exclusive && cmp === 0) || cmp === -1) {
				ret.push(v);
				return true;
			} else {
				return false;
			}
		});
		return ret;
	}
}