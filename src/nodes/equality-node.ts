import mixin from 'lodash-ts/mixin';
import { IConstraint } from '../constraint';
import Context from '../context';
import { IAlphaNode, create as create_alpha } from './alpha-node';
import { propagate_assert, propagate_modify, propagate_retract } from './node';

export interface IEqualityNode extends IAlphaNode {
	memory: Map<string, boolean>;
}

export function create(constraint: IConstraint): IEqualityNode {
	return mixin(create_alpha('equality', constraint), {
		memory: new Map<string, boolean>()
	});
}

export function assert(node: IEqualityNode, context: Context) {
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		propagate_assert(node, context);
	}
}

export function modify(node: IEqualityNode, context: Context) {
	const hashCode = context.pathsHash;
	const memory = node.memory
	const wasMatch = memory.get(hashCode);
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		if (wasMatch) {
			propagate_modify(node, context);
		} else {
			propagate_assert(node, context);
		}
	} else if (wasMatch) {
		propagate_retract(node, context);
	}
}

export function retract(node: IEqualityNode, context: Context) {
	const hashCode = context.pathsHash;
	const memory = node.memory;
	if (memory.get(hashCode)) {
		propagate_retract(node, context);
	}
	memory.delete(hashCode);
}
