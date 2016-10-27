import Node from './node';
import Constraint from '../constraint/constraint';

export default class AlphaNode extends Node {
	protected constraint: Constraint;
	protected constraintAssert: (it: any, fh?: any) => boolean;
	constructor(constraint: Constraint) {
		super();
		this.constraint = constraint;
		this.constraintAssert = (it: any, fh?: any) => {
			return this.constraint.assert(it, fh);
		};
	}

	toString() {
		return "AlphaNode " + this.__count;
	}

	equal(constraint: AlphaNode) {
		return this.constraint.equal(constraint.constraint);
	}
}