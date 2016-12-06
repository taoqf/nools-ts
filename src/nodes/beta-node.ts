import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { INode, betaNodeType, create_node, base_assert, base_modify, base_retract, propagate_dispose } from './node';
import { ITuple } from './misc/tuple-entry';
import LeftMemory from './misc/left-memory';
import RightMemory from './misc/right-memory';

export interface IBetaNode extends INode {
	leftMemory: { [hasCode: string]: ITuple };
	rightMemory: { [hasCode: string]: ITuple };
	leftTuples: LeftMemory;
	rightTuples: RightMemory;
}

export function _create_beta_node(type: betaNodeType): IBetaNode {
	return mixin(create_node(type), {
		leftMemory: {},
		rightMemory: {},
		leftTuples: new LeftMemory(),
		rightTuples: new RightMemory()
	});
}

export function create(): IBetaNode {
	return _create_beta_node('beta');
}

export function dispose(node: IBetaNode, context?: Context) {
	node.leftMemory = {};
	node.rightMemory = {};
	node.leftTuples.clear();
	node.rightTuples.clear();
}

// export function dispose_left(node: IBetaNode, context: Context) {
// 	node.leftMemory = {};
// 	node.leftTuples.clear();
// 	propagate_dispose(node, context);
// }

// export function dispose_right(node: IBetaNode, context: Context) {
// 	node.rightMemory = {};
// 	node.rightTuples.clear();
// 	propagate_dispose(node, context);
// }

export function assert(node: IBetaNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert(outNode, context);
	}
}

export function modify(node: IBetaNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify(outNode, context);
	}
}

export function retract(node: IBetaNode, context: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract(outNode, context);
	}
}

export function __addToLeftMemory(node: IBetaNode, context: Context) {
	const hashCode = context.hashCode, lm = node.leftMemory;
	if (hashCode in lm) {
		return false;
	}
	lm[hashCode] = node.leftTuples.push(context);
	context.rightMatches = {};
	return true;
}

export function __addToMemoryMatches(node: IBetaNode, rightContext: Context, leftContext: Context, createdContext: Context) {
	const rightFactId = rightContext.hashCode,
		rm = node.rightMemory[rightFactId],
		leftFactId = leftContext.hashCode;
	if (rm) {
		const data = rm.data;
		if (leftFactId in data.leftMatches) {
			throw new Error("Duplicate left fact entry");
		}
		data.leftMatches[leftFactId] = createdContext;
	}
	const lm = node.leftMemory[leftFactId];
	if (lm) {
		const data = lm.data;
		if (rightFactId in data.rightMatches) {
			throw new Error("Duplicate right fact entry");
		}
		data.rightMatches[rightFactId] = createdContext;
	}
	return createdContext;
}

export function propagateFromLeft(node: IBetaNode, context: Context, rc: Context) {
	assert(node, __addToMemoryMatches(node, rc, context, context.clone(null, null, context.match.merge(rc.match))));
}

export function assert_left(node: IBetaNode, context: Context) {
	__addToLeftMemory(node, context);
	const rm = node.rightTuples.getRightMemory(context);
	rm.forEach((m) => {
		propagateFromLeft(node, context, m.data);
	});
}

export function __addToRightMemory(node: IBetaNode, context: Context) {
	const hashCode = context.hashCode, rm = node.rightMemory;
	if (hashCode in rm) {
		return false;
	}
	rm[hashCode] = node.rightTuples.push(context);
	context.leftMatches = {};
	return true;
}

function propagateFromRight(node: IBetaNode, context: Context, lc: Context) {
	assert(node, __addToMemoryMatches(node, context, lc, lc.clone(null, null, lc.match.merge(context.match))));
}

export function assert_right(node: IBetaNode, context: Context) {
	__addToRightMemory(node, context);
	const lm = node.leftTuples.getLeftMemory(context);
	lm.forEach((m) => {
		propagateFromRight(node, context, m.data);
	});
}

export function removeFromLeftMemory(node: IBetaNode, context: Context) {
	const hashCode = context.hashCode;
	const tuple = node.leftMemory[hashCode] || null;
	if (tuple) {
		const rightMemory = node.rightMemory;
		const rightMatches = tuple.data.rightMatches;
		node.leftTuples.remove(tuple);
		const hashCodes = Object.keys(rightMatches)
		hashCodes.forEach((hc) => {
			delete rightMemory[hc].data.leftMatches[hashCode];
		});
		delete node.leftMemory[hashCode];
	}
	return tuple;
}

export function propagateRetractModifyFromLeft(node: IBetaNode, context: Context) {
	const rightMatches = context.rightMatches;
	const hashCodes = Object.keys(rightMatches);
	hashCodes.forEach((hc) => {
		retract(node, rightMatches[hc].clone());
	});
}

function propagateAssertModifyFromLeft(node: IBetaNode, context: Context, rightMatches: {
	[id: string]: Context;
}, rm: Context) {
	const factId = rm.hashCode;
	if (factId in rightMatches) {
		modify(node, __addToMemoryMatches(node, rm, context, context.clone(null, null, context.match.merge(rm.match))));
	} else {
		propagateFromLeft(node, context, rm);
	}
}

export function modify_left(node: IBetaNode, context: Context) {
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

export function removeFromRightMemory(node: IBetaNode, context: Context) {
	const hashCode = context.hashCode;
	const tuple = node.rightMemory[hashCode] || null;
	const tuples = node.rightTuples;
	if (tuple) {
		const leftMemory = node.leftMemory;
		const ret = tuple.data;
		const leftMatches = ret.leftMatches;
		tuples.remove(tuple);
		const hashCodes = Object.keys(leftMatches);
		hashCodes.forEach((hc) => {
			delete leftMemory[hc].data.rightMatches[hashCode];
		});
		delete node.rightMemory[hashCode];
	}
	return tuple;
}

export function propagateRetractModifyFromRight(node: IBetaNode, context: Context) {
	const leftMatches = context.leftMatches;
	const hashCodes = Object.keys(leftMatches);
	hashCodes.forEach((hc) => {
		retract(node, leftMatches[hc].clone());
	});
}

function propagateAssertModifyFromRight(node: IBetaNode, context: Context, leftMatches: {
	[id: string]: Context;
}, lm: Context) {
	const factId = lm.hashCode;
	if (factId in leftMatches) {
		modify(node, __addToMemoryMatches(node, context, lm, context.clone(null, null, lm.match.merge(context.match))));
	} else {
		propagateFromRight(node, context, lm);
	}
}

export function modify_right(node: IBetaNode, context: Context) {
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

export function retract_left(node: IBetaNode, context: Context) {
	context = removeFromLeftMemory(node, context).data;
	const rightMatches = context.rightMatches;
	const hashCodes = Object.keys(rightMatches);
	hashCodes.forEach((hashCode) => {
		retract(node, rightMatches[hashCode].clone());
	});
}

export function retract_right(node: IBetaNode, context: Context) {
	context = removeFromRightMemory(node, context).data;
	const leftMatches = context.leftMatches;
	const hashCodes = Object.keys(leftMatches);
	hashCodes.forEach((hashCode) => {
		retract(node, leftMatches[hashCode].clone());
	});
}
