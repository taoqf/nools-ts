import Pattern from './pattern';
import Constraint from '../constraint/constraint';

let id = 0;
export default class CompositePattern extends Pattern {
	public id = id++;
	public leftPattern: Pattern;
	public rightPattern: Pattern;
	constructor(left: Pattern, right: Pattern) {
		super();
		this.id = id++;
		this.leftPattern = left;
		this.rightPattern = right;
	}

	getSpecificity() {
		return this.rightPattern.getSpecificity() + this.leftPattern.getSpecificity();
	}

	hashCode() {
		return [this.leftPattern.hashCode(), this.rightPattern.hashCode()].join(":");
	}

	get_constraints(): Constraint[] {
		return this.leftPattern.constraints.concat(this.rightPattern.constraints);
	}
}