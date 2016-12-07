import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { IAdapterNode } from './adapter-node';
import { INode, base_assert_left, base_modify_left, base_retract_left } from './node';

function __propagatePathsAssertLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert_left(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsAssertLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert_left(nodes, outNode, context);
	}
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	if (context.paths) {
		__propagatePathsAssertLeft(nodes, n, context);
	} else {
		__propagateNoPathsAssertLeft(nodes, n, context);
	}
}

function __propagatePathsModifyLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify_left(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsModifyLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify_left(nodes, outNode, context);
	}
}

export function modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	if (context.paths) {
		__propagatePathsModifyLeft(nodes, n, context);
	} else {
		__propagateNoPathsModifyLeft(nodes, n, context);
	}
}

function __propagatePathsRetractLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract_left(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsRetractLeft(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract_left(nodes, outNode, context);
	}
}

export function retract(nodes: INode[], n: number, context: Context) {
	if (context.paths) {
		__propagatePathsRetractLeft(nodes, n, context);
	} else {
		__propagateNoPathsRetractLeft(nodes, n, context);
	}
}