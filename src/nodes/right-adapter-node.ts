import intersection from 'lodash-ts/intersection';
import Context from '../context';
import { IAdapterNode } from './adapter-node';
import { base_assert_right, base_modify_right, base_retract_right } from './node';

function __propagatePathsAssertRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_assert_right(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsAssertRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert_right(outNode, context);
	}
}

export function assert(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsAssertRight(node, context);
	} else {
		__propagateNoPathsAssertRight(node, context);
	}
}

function __propagatePathsModifyRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_modify_right(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsModifyRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify_right(outNode, context);
	}
}
export function modify(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsModifyRight(node, context);
	} else {
		__propagateNoPathsModifyRight(node, context);
	}
}


function __propagatePathsRetractRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		const continuingPaths = intersection(paths, context.paths);
		if (continuingPaths.length) {
			base_retract_right(outNode, context.clone(null, continuingPaths, null));
		}
	}
}

function __propagateNoPathsRetractRight(node: IAdapterNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract_right(outNode, context);
	}
}

export function retract(node: IAdapterNode, context: Context) {
	if (context.paths) {
		__propagatePathsRetractRight(node, context);
	} else {
		__propagateNoPathsRetractRight(node, context);
	}
}
