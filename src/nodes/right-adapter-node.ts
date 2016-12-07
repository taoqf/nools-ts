import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { IAdapterNode } from './adapter-node';
import { INode, base_assert_right, base_modify_right, base_retract_right } from './node';

function __propagatePathsAssertRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert_right(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsAssertRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert_right(nodes, outNode, context);
	}
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	if (context.paths) {
		__propagatePathsAssertRight(nodes, n, context);
	} else {
		__propagateNoPathsAssertRight(nodes, n, context);
	}
}

function __propagatePathsModifyRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify_right(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsModifyRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify_right(nodes, outNode, context);
	}
}
export function modify(nodes: INode[], n: number, context: Context) {
	if (context.paths) {
		__propagatePathsModifyRight(nodes, n, context);
	} else {
		__propagateNoPathsModifyRight(nodes, n, context);
	}
}


function __propagatePathsRetractRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract_right(nodes, outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsRetractRight(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAdapterNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract_right(nodes, outNode, context);
	}
}

export function retract(nodes: INode[], n: number, context: Context) {
	if (context.paths) {
		__propagatePathsRetractRight(nodes, n, context);
	} else {
		__propagateNoPathsRetractRight(nodes, n, context);
	}
}
