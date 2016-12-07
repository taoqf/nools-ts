import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { INode, joinNodeType } from './node';
import { IBetaNode, _create_beta_node, __addToLeftMemory, assert, __addToMemoryMatches, modify, retract, __addToRightMemory, removeFromLeftMemory, propagateRetractModifyFromLeft, removeFromRightMemory, propagateRetractModifyFromRight } from './beta-node';
import { IJoinReferenceNode, create_join_reference_node } from './join-reference-node';

export interface IJoinNode extends IBetaNode {
	constraint: IJoinReferenceNode;
}

export function _create_join_node(type: joinNodeType): IJoinNode {
	const node = _create_beta_node(type);
	const constraint = create_join_reference_node(node.leftTuples, node.rightTuples);
	return mixin(node, {
		constraint: constraint
	});
}

export function create(): IJoinNode {
	return _create_join_node('join');
}

function propagateFromLeft(nodes: INode[], n: number, context: Context, rm: Context) {
	const node = nodes[n] as IJoinNode;
	const mr = node.constraint.match(context, rm);
	if (mr.isMatch) {
		assert(nodes, n, __addToMemoryMatches(nodes, n, rm, context, context.clone(null, null, mr)));
	}
	// return this;
}

export function assert_left(nodes: INode[], n: number, context: Context) {
	__addToLeftMemory(nodes, n, context);
	const node = nodes[n] as IJoinNode;
	const rm = node.rightTuples.getRightMemory(context);
	rm.forEach((m) => {
		propagateFromLeft(nodes, n, context, m.data);
	});
}

function propagateFromRight(nodes: INode[], n: number, context: Context, lm: Context) {
	const node = nodes[n] as IJoinNode;
	const mr = node.constraint.match(lm, context);
	if (mr.isMatch) {
		assert(nodes, n, __addToMemoryMatches(nodes, n, context, lm, context.clone(null, null, mr)));
	}
	// return node;
}

export function assert_right(nodes: INode[], n: number, context: Context) {
	__addToRightMemory(nodes, n, context);
	const node = nodes[n] as IJoinNode;
	const lm = node.leftTuples.getLeftMemory(context);
	lm.forEach((m) => {
		propagateFromRight(nodes, n, context, m.data);
	});
}

function propagateAssertModifyFromLeft(nodes: INode[], n: number, context: Context, rightMatches: { [factid: string]: Context }, rm: Context) {
	const node = nodes[n] as IJoinNode;
	const factId = rm.hashCode;
	if (factId in rightMatches) {
		const mr = node.constraint.match(context, rm);
		const mrIsMatch = mr.isMatch;
		if (!mrIsMatch) {
			retract(nodes, n, rightMatches[factId].clone());
		} else {
			modify(nodes, n, __addToMemoryMatches(nodes, n, rm, context, context.clone(null, null, mr)));
		}
	} else {
		propagateFromLeft(nodes, n, context, rm);
	}
}

export function modify_left(nodes: INode[], n: number, context: Context) {
	const previousContext = removeFromLeftMemory(nodes, n, context).data;
	__addToLeftMemory(nodes, n, context);
	const node = nodes[n] as IJoinNode;
	const rm = node.rightTuples.getRightMemory(context);
	if (!rm.length) {
		propagateRetractModifyFromLeft(nodes, n, previousContext);
	} else {
		const rightMatches = previousContext.rightMatches;
		rm.forEach((m) => {
			propagateAssertModifyFromLeft(nodes, n, context, rightMatches, m.data);
		});
	}
}

function propagateAssertModifyFromRight(nodes: INode[], n: number, context: Context, leftMatches: { [factid: string]: Context }, lm: Context) {
	const factId = lm.hashCode;
	if (factId in leftMatches) {
		const node = nodes[n] as IJoinNode;
		const mr = node.constraint.match(lm, context);
		const mrIsMatch = mr.isMatch;
		if (!mrIsMatch) {
			retract(nodes, n, leftMatches[factId].clone());
		} else {
			modify(nodes, n, __addToMemoryMatches(nodes, n, context, lm, context.clone(null, null, mr)));
		}
	} else {
		propagateFromRight(nodes, n, context, lm);
	}
}

export function modify_right(nodes: INode[], n: number, context: Context) {
	const previousContext = removeFromRightMemory(nodes, n, context).data;
	__addToRightMemory(nodes, n, context);
	const node = nodes[n] as IJoinNode;
	const lm = node.leftTuples.getLeftMemory(context);
	if (!lm.length) {
		propagateRetractModifyFromRight(nodes, n, previousContext);
	} else {
		const leftMatches = previousContext.leftMatches;
		lm.forEach((m) => {
			propagateAssertModifyFromRight(nodes, n, context, leftMatches, m.data);
		});
	}
}
