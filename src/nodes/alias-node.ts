import Context from '../context';
import { INode, IAliasNode } from '../nodes';
import { propagate_assert, propagate_modify, propagate_retract } from './node';
import WorkingMemory from '../working-memory';

export function assert(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAliasNode;
	return propagate_assert(nodes, n, context.set(node.alias, context.fact.object), wm);
}

export function modify(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAliasNode;
	return propagate_modify(nodes, n, context.set(node.alias, context.fact.object), wm);
}

export function retract(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAliasNode;
	return propagate_retract(nodes, n, context.set(node.alias, context.fact.object), wm);
}
