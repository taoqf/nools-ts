import mixin from 'lodash-ts/mixin';
import { INode, alphaNodeType, create_node } from './node';
import { IConstraint } from '../constraint';

export interface IAlphaNode extends INode {
	constraint: IConstraint;
	constraintAssert(it: any, fh?: any): boolean;	// todo: need to be removed.
	equal(constraint: IAlphaNode): boolean;
}

export function create(type: alphaNodeType, constraint: IConstraint): IAlphaNode {
	return mixin(create_node(type), {
		constraint: constraint,
		constraintAssert: constraint.assert,
		equal(other: IAlphaNode) {
			return constraint.equal(other.constraint);
		}
	});
}
