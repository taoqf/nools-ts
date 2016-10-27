
let id = 0;
export default class Fact {
	object: any;
	recency = 0;
	id = id++;
	constructor(obj?: any) {
		this.object = obj;
	}
	equals(fact: any) {
		return fact === this.object;
	}

	hashCode() {
		return this.id;
	}
}
