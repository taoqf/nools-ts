import Fact from './facts/fact';
import InitialFact from './facts/initial';
import LinkedList, {ILinkNode} from './linked-list';

export default class WorkingMemory {
	recency = 0;
	facts = new LinkedList<Fact>();

	dispose() {
		this.facts.clear();
	}

	getFacts() {
		let head = { next: this.facts.head } as ILinkNode<Fact>;
		const ret: any[] = [];
		let val: any;
		while ((head = head.next)) {
			if (!((val = head.data.object) instanceof InitialFact)) {
				ret.push(val);
			}
		}
		return ret;
	}

	getFactsByType(Type: any) {
		let head = { next: this.facts.head } as ILinkNode<Fact>;
		const ret: any[] = [];
		while ((head = head.next)) {
			const val = head.data.object;
			if (!(val instanceof InitialFact) && (val instanceof Type || val.constructor === Type)) {
				ret.push(val);
			}
		}
		return ret;
	}

	getFactHandle(o: any) {
		let head = { next: this.facts.head } as ILinkNode<Fact>;
		while ((head = head.next)) {
			const existingFact = head.data;
			if (existingFact.equals(o)) {
				return existingFact;
			}
		}
		const ret = new Fact(o);
		ret.recency = this.recency++;
		//this.facts.push(ret);
		return ret;
	}

	modifyFact(fact: any) {
		let head = { next: this.facts.head } as ILinkNode<Fact>;
		while ((head = head.next)) {
			const existingFact = head.data;
			if (existingFact.equals(fact)) {
				existingFact.recency = this.recency++;
				return existingFact;
			}
		}
		//if we made it here we did not find the fact
		throw new Error("the fact to modify does not exist");
	}

	assertFact(fact: any) {
		const ret = new Fact(fact);
		ret.recency = this.recency++;
		this.facts.push(ret);
		return ret;
	}

	retractFact(fact: any) {
		const facts = this.facts;
		let head = { next: facts.head } as ILinkNode<Fact>;
		while ((head = head.next)) {
			const existingFact = head.data;
			if (existingFact.equals(fact)) {
				facts.remove(head);
				return existingFact;
			}
		}
		//if we made it here we did not find the fact
		throw new Error("the fact to remove does not exist");


	}
}