import Context from '../context';
import { INode, IEqualityNode } from '../nodes';
import { propagate_assert, propagate_modify, propagate_retract } from './node';
import WorkingMemory from '../working-memory';

export function assert(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IEqualityNode;
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		propagate_assert(nodes, n, context, wm);
	}
}

export function modify(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IEqualityNode;
	const hashCode = context.pathsHash;
	const memory = node.memory
	const wasMatch = memory.get(hashCode);
	const isMatch = node.constraintAssert(context.factHash);
	node.memory.set(context.pathsHash, isMatch);
	if (isMatch) {
		if (wasMatch) {
			propagate_modify(nodes, n, context, wm);
		} else {
			propagate_assert(nodes, n, context, wm);
		}
	} else if (wasMatch) {
		propagate_retract(nodes, n, context, wm);
	}
}

export function retract(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IEqualityNode;
	const hashCode = context.pathsHash;
	const memory = node.memory;
	if (memory.get(hashCode)) {
		propagate_retract(nodes, n, context, wm);
	}
	memory.delete(hashCode);
}
