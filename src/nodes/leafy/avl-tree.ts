import Tree, { ITreeNode } from './tree';

const abs = Math.abs;

function makeNode<T>(data: T): ITreeNode<T> {
	return {
		data: data,
		balance: 0,
		left: null,
		right: null
	};
}

function rotateSingle<T>(root: ITreeNode<T>, dir: string, otherDir: string) {
	const save = root[otherDir] as ITreeNode<T>;
	root[otherDir] = save[dir];
	save[dir] = root;
	return save;
}


function rotateDouble<T>(root: ITreeNode<T>, dir: string, otherDir: string) {
	root[otherDir] = rotateSingle(root[otherDir] as ITreeNode<T>, otherDir, dir);
	return rotateSingle(root, dir, otherDir);
}

function adjustBalance<T>(root: ITreeNode<T>, dir: string, balance: number) {
	const otherDir = dir === "left" ? "right" : "left";
	const n = root[dir] as ITreeNode<T>, nn = n[otherDir] as ITreeNode<T>;
	if (nn.balance === 0) {
		root.balance = n.balance = 0;
	} else if (nn.balance === balance) {
		root.balance = -balance;
		n.balance = 0;
	} else { /* nn.balance == -bal */
		root.balance = 0;
		n.balance = balance;
	}
	nn.balance = 0;
}

function insertAdjustBalance<T>(root: ITreeNode<T>, dir: string) {
	const otherDir = dir === "left" ? "right" : "left";

	const n = root[dir] as ITreeNode<T>;
	const bal = dir === "right" ? -1 : +1;

	if (n.balance === bal) {
		root.balance = n.balance = 0;
		root = rotateSingle(root, otherDir, dir);
	} else {
		adjustBalance(root, dir, bal);
		root = rotateDouble(root, otherDir, dir);
	}

	return root;

}

function removeAdjustBalance<T>(root: ITreeNode<T>, dir: string, done: { done: boolean }) {
	const otherDir = dir === "left" ? "right" : "left";
	const n = root[otherDir] as ITreeNode<T>;
	const bal = dir === "right" ? -1 : 1;
	if (n.balance === -bal) {
		root.balance = n.balance = 0;
		root = rotateSingle(root, dir, otherDir);
	} else if (n.balance === bal) {
		adjustBalance(root, otherDir, -bal);
		root = rotateDouble(root, dir, otherDir);
	} else { /* n.balance == 0 */
		root.balance = -bal;
		n.balance = bal;
		root = rotateSingle(root, dir, otherDir);
		done.done = true;
	}
	return root;
}

export default class AVLTree<T> extends Tree<T> {
	insert(data: T): void {
		const tree = this;
		const cmp = this.compare;
		/* Empty tree case */
		const root = tree.__root;
		if (root === null || root === undefined) {
			tree.__root = makeNode(data);
		} else {
			const upd: string[] = [], up: ITreeNode<T>[] = [];
			let it = root, top = 0, dir: string;
			while (true) {
				dir = upd[top] = cmp(data, it.data) === -1 ? "left" : "right";
				up[top++] = it;
				if (!it[dir]) {
					it[dir] = makeNode(data);
					break;
				}
				it = it[dir] as ITreeNode<T>;
			}
			if (!it[dir]) {
				return null;
			}
			while (--top >= 0) {
				up[top].balance += upd[top] === "right" ? -1 : 1;
				if (up[top].balance === 0) {
					break;
				} else if (abs(up[top].balance) > 1) {
					up[top] = insertAdjustBalance(up[top], upd[top]);
					if (top !== 0) {
						up[top - 1][upd[top - 1]] = up[top];
					} else {
						tree.__root = up[0];
					}
					break;
				}
			}
		}
	}

	remove(data: T) {
		const tree = this;
		const cmp = this.compare;

		const root = tree.__root;
		if (root !== null && root !== undefined) {
			const up: ITreeNode<T>[] = [], upd: string[] = [], done = { done: false };
			let it = root, top = 0, dir: string, compare: number;
			while (true) {
				if (!it) {
					return;
				} else if ((compare = cmp(data, it.data)) === 0) {
					break;
				}
				dir = upd[top] = compare === -1 ? "left" : "right";
				up[top++] = it;
				it = it[dir] as ITreeNode<T>;
			}
			const l = it.left, r = it.right;
			if (!l || !r) {
				dir = !l ? "right" : "left";
				if (top !== 0) {
					up[top - 1][upd[top - 1]] = it[dir];
				} else {
					tree.__root = it[dir] as ITreeNode<T>;
				}
			} else {
				let heir = l;
				upd[top] = "left";
				up[top++] = it;
				while (heir.right) {
					upd[top] = "right";
					up[top++] = heir;
					heir = heir.right;
				}
				it.data = heir.data;
				up[top - 1][up[top - 1] === it ? "left" : "right"] = heir.left;
			}
			while (--top >= 0 && !done.done) {
				up[top].balance += upd[top] === "left" ? -1 : +1;
				const balance = abs(up[top].balance);
				if (balance === 1) {
					break;
				} else if (balance > 1) {
					up[top] = removeAdjustBalance(up[top], upd[top], done);
					if (top !== 0) {
						up[top - 1][upd[top - 1]] = up[top];
					} else {
						tree.__root = up[0];
					}
				}
			}
		}
	}

	__printNode(node: ITreeNode<T>, level: number) {
		const str: string[] = [];
		if (!node) {
			str.push('\t'.repeat(level));
			str.push("~");
			console.log(str.join(""));
		} else {
			this.__printNode(node.right as ITreeNode<T>, level + 1);
			str.push('\t'.repeat(level));
			str.push(node.data + ":" + node.balance + "\n");
			console.log(str.join(""));
			this.__printNode(node.left as ITreeNode<T>, level + 1);
		}
	}
}