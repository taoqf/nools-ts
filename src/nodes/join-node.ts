import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { joinNodeType } from './node';
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

function propagateFromLeft(node: IJoinNode, context: Context, rm: Context) {
	const mr = node.constraint.match(context, rm);
	if (mr.isMatch) {
		assert(node, __addToMemoryMatches(node, rm, context, context.clone(null, null, mr)));
	}
	// return this;
}

export function assert_left(node: IJoinNode, context: Context) {
	__addToLeftMemory(node, context);
	const rm = node.rightTuples.getRightMemory(context);
	rm.forEach((m) => {
		propagateFromLeft(node, context, m.data);
	});
}

function propagateFromRight(node: IJoinNode, context: Context, lm: Context) {
	const mr = node.constraint.match(lm, context);
	if (mr.isMatch) {
		assert(node, __addToMemoryMatches(node, context, lm, context.clone(null, null, mr)));
	}
	// return node;
}

export function assert_right(node: IJoinNode, context: Context) {
	__addToRightMemory(node, context);
	const lm = node.leftTuples.getLeftMemory(context);
	lm.forEach((m) => {
		propagateFromRight(node, context, m.data);
	});
}

function propagateAssertModifyFromLeft(node: IJoinNode, context: Context, rightMatches: { [factid: string]: Context }, rm: Context) {
	const factId = rm.hashCode;
	if (factId in rightMatches) {
		const mr = node.constraint.match(context, rm);
		const mrIsMatch = mr.isMatch;
		if (!mrIsMatch) {
			retract(node, rightMatches[factId].clone());
		} else {
			modify(node, __addToMemoryMatches(node, rm, context, context.clone(null, null, mr)));
		}
	} else {
		propagateFromLeft(node, context, rm);
	}
}

export function modify_left(node: IJoinNode, context: Context) {
	const previousContext = removeFromLeftMemory(node, context).data;
	__addToLeftMemory(node, context);
	const rm = node.rightTuples.getRightMemory(context);
	if (!rm.length) {
		propagateRetractModifyFromLeft(node, previousContext);
	} else {
		const rightMatches = previousContext.rightMatches;
		rm.forEach((m) => {
			propagateAssertModifyFromLeft(node, context, rightMatches, m.data);
		});
	}
}

function propagateAssertModifyFromRight(node: IJoinNode, context: Context, leftMatches: { [factid: string]: Context }, lm: Context) {
	const factId = lm.hashCode;
	if (factId in leftMatches) {
		const mr = node.constraint.match(lm, context);
		const mrIsMatch = mr.isMatch;
		if (!mrIsMatch) {
			retract(node, leftMatches[factId].clone());
		} else {
			modify(node, __addToMemoryMatches(node, context, lm, context.clone(null, null, mr)));
		}
	} else {
		propagateFromRight(node, context, lm);
	}
}

export function modify_right(node: IJoinNode, context: Context) {
	const previousContext = removeFromRightMemory(node, context).data;
	__addToRightMemory(node, context);
	const lm = node.leftTuples.getLeftMemory(context);
	if (!lm.length) {
		propagateRetractModifyFromRight(node, previousContext);
	} else {
		const leftMatches = previousContext.leftMatches;
		lm.forEach((m) => {
			propagateAssertModifyFromRight(node, context, leftMatches, m.data);
		});
	}
}
