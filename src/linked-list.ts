
export interface ILinkNode<T> {
	data?: T;
	prev?: ILinkNode<T>;
	next?: ILinkNode<T>;
}

export default class LinkedList<T> {
	head: ILinkNode<T> = null;
	tail: ILinkNode<T> = null;
	length = 0;

	push(data: T) {
		const tail = this.tail, head = this.head, node: ILinkNode<T> = { data: data, prev: tail, next: null };
		if (tail) {
			this.tail.next = node;
		}
		this.tail = node;
		if (!head) {
			this.head = node;
		}
		this.length++;
		return node;
	}

	remove(node: ILinkNode<T>) {
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
		//node.data = node.prev = node.next = null;
		this.length--;
	}


	forEach(cb: (data: T) => void) {
		let head: ILinkNode<T> = { next: this.head };
		while ((head = head.next)) {
			cb(head.data);
		}
	}

	toArray() {
		let head: ILinkNode<T> = { next: this.head }, ret: T[] = [];
		while ((head = head.next)) {
			// ret.push(head);		// todo need test
			ret.push(head.data);
		}
		return ret;
	}

	removeByData(data: T) {
		let head: ILinkNode<T> = { next: this.head };
		while ((head = head.next)) {
			if (head.data === data) {
				this.remove(head);
				break;
			}
		}
	}

	getByData(data: T) {
		let head: ILinkNode<T> = { next: this.head };
		while ((head = head.next)) {
			if (head.data === data) {
				return head;
			}
		}
	}

	clear() {
		this.head = this.tail = null;
		this.length = 0;
	}
}
