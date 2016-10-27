import Tree, {ITreeNode} from './tree';

const nil: ITreeNode<any> = { level: 0, data: null };

function makeNode<T>(data: T, level: number): ITreeNode<T> {
	return {
		data: data,
		level: level,
		left: nil,
		right: nil
	}
}

function skew<T>(root: ITreeNode<T>) {
	if (root.level !== 0 && root.left.level === root.level) {
		const save = root.left;
		root.left = save.right;
		save.right = root;
		root = save;
	}
	return root;
}

function split<T>(root: ITreeNode<T>) {
	if (root.level !== 0 && root.right.right.level === root.level) {
		const save = root.right;
		root.right = save.left;
		save.left = root;
		root = save;
		root.level++;
	}
	return root;
}

function insert<T>(root: ITreeNode<T>, data: T, compare: (v1: T, v2: T) => number) {
	if (root === nil) {
		root = makeNode(data, 1);
	}
	else {
		const dir = compare(data, root.data) === -1 ? "left" : "right";
		root[dir] = insert(root[dir] as ITreeNode<T>, data, compare);
		root = skew(root);
		root = split(root);
	}
	return root;
}

function remove<T>(root: ITreeNode<T>, data: T, compare: (v1: T, v2: T) => number) {
	let rLeft: ITreeNode<T>, rRight: ITreeNode<T>;
	if (root !== nil) {
		const cmp = compare(data, root.data);
		if (cmp === 0) {
			rLeft = root.left, rRight = root.right;
			if (rLeft !== nil && rRight !== nil) {
				let heir = rLeft;
				while (heir.right !== nil) {
					heir = heir.right;
				}
				root.data = heir.data;
				root.left = remove(rLeft, heir.data, compare);
			} else {
				root = rLeft === nil ? root.right : root.left;
			}
		} else {
			const dir = cmp === -1 ? "left" : "right";
			root[dir] = remove(root[dir] as ITreeNode<T>, data, compare);
		}
	}
	if (root !== nil) {
		const rLevel = root.level;
		const rLeftLevel = root.left.level, rRightLevel = root.right.level;
		if (rLeftLevel < rLevel - 1 || rRightLevel < rLevel - 1) {
			if (rRightLevel > --root.level) {
				root.right.level = root.level;
			}
			root = skew(root);
			root = split(root);
		}
	}
	return root;
}

export default class AnderssonTree<T> extends Tree<T>{
	isEmpty() {
		return this.__root === nil || super.isEmpty();
	}

	insert(data: T) {
		if (!this.__root) {
			this.__root = nil;
		}
		this.__root = insert(this.__root, data, this.compare);
	}

	remove(data: T) {
		this.__root = remove(this.__root, data, this.compare);
	}


	traverseWithCondition(node: ITreeNode<T>, order?: string, callback?: (data: T) => boolean) {
		const cont = true;
		if (node !== nil) {
			return super.traverseWithCondition(node, order, callback);
		}
		return cont;
	}


	traverse(node: ITreeNode<T>) {
		if (node !== nil) {
			super.traverse(node);
		}
	}

	contains(value: T) {
		if (this.__root !== nil) {
			return super.contains(value);
		}
		return false;
	}

	__printNode(node: ITreeNode<T>, level: number) {
		const str: string[] = [];
		if (!node || !node.data) {
			str.push('\t'.repeat(level));
			str.push("~");
			console.log(str.join(""));
		} else {
			this.__printNode(node.right, level + 1);
			str.push('\t'.repeat(level));
			str.push(node.data + ":" + node.level + "\n");
			console.log(str.join(""));
			this.__printNode(node.left, level + 1);
		}
	}
}