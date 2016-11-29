import Node from './node';
import { IConstraint } from '../constraint';

export default class AlphaNode extends Node {
	protected constraint: IConstraint;
	protected constraintAssert: (it: any, fh?: any) => boolean;
	constructor(constraint: IConstraint) {
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