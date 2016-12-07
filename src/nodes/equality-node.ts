import mixin from 'lodash-ts/mixin';
import { IConstraint } from '../constraint';
import Context from '../context';
import { IAlphaNode, create as create_alpha } from './alpha-node';
import { INode, propagate_assert, propagate_modify, propagate_retract } from './node';

export interface IEqualityNode extends IAlphaNode {
	memory: Map<string, boolean>;
}

export function create(constraint: IConstraint): IEqualityNode {
	return mixin(create_alpha('equality', constraint), {
		memory: new Map<string, boolean>()
	});
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IEqualityNode;
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		propagate_assert(nodes, n, context);
	}
}

export function modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IEqualityNode;
	const hashCode = context.pathsHash;
	const memory = node.memory
	const wasMatch = memory.get(hashCode);
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		if (wasMatch) {
			propagate_modify(nodes, n, context);
		} else {
			propagate_assert(nodes, n, context);
		}
	} else if (wasMatch) {
		propagate_retract(nodes, n, context);
	}
}

export function retract(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IEqualityNode;
	const hashCode = context.pathsHash;
	const memory = node.memory;
	if (memory.get(hashCode)) {
		propagate_retract(nodes, n, context);
	}
	memory.delete(hashCode);
}
