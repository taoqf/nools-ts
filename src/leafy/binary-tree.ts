import Tree, {ITreeNode} from './tree';

export default class BinaryTree<T> extends Tree<T>{
	insert(data: T) {
		if (!this.__root) {
			this.__root = {
				data: data,
				parent: null,
				left: null,
				right: null
			};
			return this.__root;
		}
		const compare = this.compare;
		let root = this.__root;
		while (root !== null) {
			const cmp = compare(data, root.data);
			if (cmp) {
				const leaf = (cmp === -1) ? "left" : "right";
				const next = root[leaf] as ITreeNode<T>;
				if (!next) {
					return (root[leaf] = { data: data, parent: root, left: null, right: null });
				} else {
					root = next;
				}
			} else {
				return;
			}
		}
	}
	remove(data: T) {
		if (this.__root !== null) {
			const head = { right: this.__root } as any as ITreeNode<T>;
			let it = head;
			let p: ITreeNode<T>, f: ITreeNode<T> = null;
			let dir = "right";
			while (it[dir] !== null) {
				p = it;
				it = it[dir] as ITreeNode<T>;
				const cmp = this.compare(data, it.data);
				if (!cmp) {
					f = it;
				}
				dir = (cmp === -1 ? "left" : "right");
			}
			if (f !== null) {
				f.data = it.data;
				p[p.right === it ? "right" : "left"] = it[it.left === null ? "right" : "left"];
			}
			this.__root = head.right;
		}
	}
}