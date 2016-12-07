import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { INode, IAdapterNode } from '../nodes';
import { base_assert_left, base_modify_left, base_retract_left } from './node';
import WorkingMemory from '../working-memory';

function __propagatePathsAssertLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert_left(nodes, outNode, context.clone(null, continuingPaths, null), wm);
		}
	}
}

function __propagateNoPathsAssertLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert_left(nodes, outNode, context, wm);
	}
}

export function assert(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	if (context.paths) {
		__propagatePathsAssertLeft(nodes, n, context, wm);
	} else {
		__propagateNoPathsAssertLeft(nodes, n, context, wm);
	}
}

function __propagatePathsModifyLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify_left(nodes, outNode, context.clone(null, continuingPaths, null), wm);
		}
	}
}

function __propagateNoPathsModifyLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify_left(nodes, outNode, context, wm);
	}
}

export function modify(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	if (context.paths) {
		__propagatePathsModifyLeft(nodes, n, context, wm);
	} else {
		__propagateNoPathsModifyLeft(nodes, n, context, wm);
	}
}

function __propagatePathsRetractLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract_left(nodes, outNode, context.clone(null, continuingPaths, null), wm);
		}
	}
}

function __propagateNoPathsRetractLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract_left(nodes, outNode, context, wm);
	}
}

export function retract(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	if (context.paths) {
		__propagatePathsRetractLeft(nodes, n, context, wm);
	} else {
		__propagateNoPathsRetractLeft(nodes, n, context, wm);
	}
}