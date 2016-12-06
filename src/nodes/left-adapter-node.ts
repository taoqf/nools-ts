import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { IAdapterNode } from './adapter-node';
import { base_assert_left, base_modify_left, base_retract_left } from './node';

function __propagatePathsAssertLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert_left(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsAssertLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert_left(outNode, context);
	}
}

export function assert(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsAssertLeft(node, context);
	} else {
		__propagateNoPathsAssertLeft(node, context);
	}
}

function __propagatePathsModifyLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify_left(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsModifyLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify_left(outNode, context);
	}
}

export function modify(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsModifyLeft(node, context);
	} else {
		__propagateNoPathsModifyLeft(node, context);
	}
}

function __propagatePathsRetractLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract_left(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsRetractLeft(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract_left(outNode, context);
	}
}

export function retract(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsRetractLeft(node, context);
	} else {
		__propagateNoPathsRetractLeft(node, context);
	}
}