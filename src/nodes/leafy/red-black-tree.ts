import Tree, {ITreeNode} from './tree';

const RED = "RED", BLACK = "BLACK";
function isRed<T>(node: ITreeNode<T>) {
	return node !== null && node.red;
};

function makeNode<T>(data: T): ITreeNode<T> {
	return {
		data: data,
		red: true,
		left: null,
		right: null
	};
}

function insert<T>(root: ITreeNode<T>, data: T, compare: (a: T, b: T) => number) {
	if (!root) {
		return makeNode(data);

	} else {
		const cmp = compare(data, root.data);
		if (cmp) {
			const dir = cmp === -1 ? "left" : "right";
			const otherDir = dir === "left" ? "right" : "left";
			root[dir] = insert(root[dir] as ITreeNode<T>, data, compare);
			let node = root[dir] as ITreeNode<T>;

			if (isRed(node)) {

				const sibling = root[otherDir] as ITreeNode<T>;
				if (isRed(sibling)) {
					/* Case 1 */
					root.red = true;
					node.red = false;
					sibling.red = false;
				} else {

					if (isRed(node[dir] as ITreeNode<T>)) {

						root = rotateSingle(root, otherDir);
					} else if (isRed(node[otherDir] as ITreeNode<T>)) {

						root = rotateDouble(root, otherDir);
					}
				}

			}
		}
	}
	return root;
};

function rotateSingle<T>(root: ITreeNode<T>, dir: string) {
	const otherDir = dir === "left" ? "right" : "left";
	const save = root[otherDir] as ITreeNode<T>;
	root[otherDir] = save[dir];
	save[dir] = root;
	root.red = true;
	save.red = false;
	return save;
};

function rotateDouble<T>(root: ITreeNode<T>, dir: string) {
	const otherDir = dir === "left" ? "right" : "left";
	root[otherDir] = rotateSingle(root[otherDir] as ITreeNode<T>, otherDir);
	return rotateSingle(root, dir);
};


function remove<T>(root: ITreeNode<T>, data: T, done: { done: boolean }, compare: (a: T, b: T) => number) {
	if (!root) {
		done.done = true;
	} else {
		let dir: string;
		if (compare(data, root.data) === 0) {
			if (!root.left || !root.right) {
				const save = root[!root.left ? "right" : "left"] as ITreeNode<T>;
				/* Case 0 */
				if (isRed(root)) {
					done.done = true;
				} else if (isRed(save)) {
					save.red = false;
					done.done = true;
				}
				return save;
			}
			else {
				let heir = root.right;
				let p: ITreeNode<T>;
				while (heir.left !== null) {
					p = heir;
					heir = heir.left;
				}
				if (p) {
					p.left = null;
				}
				root.data = heir.data;
				data = heir.data;
			}
		}
		dir = compare(data, root.data) === -1 ? "left" : "right";
		root[dir] = remove(root[dir] as ITreeNode<T>, data, done, compare);
		if (!done.done) {
			root = removeBalance(root, dir, done);
		}
	}
	return root;
};

function removeBalance<T>(root: ITreeNode<T>, dir: string, done: { done: boolean }) {
	const notDir = dir === "left" ? "right" : "left";
	let p = root;
	let s = p[notDir] as ITreeNode<T>;
	if (isRed(s)) {
		root = rotateSingle(root, dir);
		s = p[notDir] as ITreeNode<T>;
	}
	if (s !== null) {
		if (!isRed(s.left) && !isRed(s.right)) {
			if (isRed(p)) {
				done.done = true;
			}
			p.red = false;
			s.red = true;
		} else {
			const save = p.red, newRoot = (root === p);
			p = (isRed(s[notDir] as ITreeNode<T>) ? rotateSingle : rotateDouble)(p, dir);
			p.red = save;
			p.left.red = p.right.red = false;
			if (newRoot) {
				root = p;
			} else {
				root[dir] = p;
			}
			done.done = true;
		}
	}
	return root;
};


export default class RedBlackTree<T> extends Tree<T>{

	insert(data: T) {
		this.__root = insert(this.__root, data, this.compare);
		this.__root.red = false;
	}

	remove(data: T) {
		const done = { done: false };
		const root = remove(this.__root, data, done, this.compare);
		if (root !== null) {
			root.red = false;
		}
		this.__root = root;
		return data;
	}
	__printNode(node: ITreeNode<T>, level: number) {
		//console.log(level);
		const str: string[] = [];
		if (!node) {
			str.push('\t'.repeat(level));
			str.push("~");
			console.log(str.join(""));
		} else {
			this.__printNode(node.right, level + 1);
			str.push('\t'.repeat(level));
			str.push((node.red ? RED : BLACK) + ":" + node.data + "\n");
			console.log(str.join(""));
			this.__printNode(node.left, level + 1);
		}
	}
}