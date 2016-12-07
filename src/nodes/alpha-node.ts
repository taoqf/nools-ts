import mixin from 'lodash-ts/mixin';
import { IAlphaNode, alphaNodeType} from '../nodes';
import { create_node } from './node';
import { IConstraint } from '../constraint';

export function create(type: alphaNodeType, constraint: IConstraint): IAlphaNode {
	return mixin(create_node(type), {
		constraint: constraint,
		constraintAssert: constraint.assert,
		equal(other: IAlphaNode) {
			return constraint.equal(other.constraint);
		}
	});
}
