import Context from '../context';
import { INode, IBetaNode } from '../nodes';
import { base_assert, base_modify, base_retract, propagate_dispose } from './node';
import WorkingMemory from '../working-memory';

export function dispose(nodes: INode[], n: number, context?: Context) {
	const node = nodes[n] as IBetaNode;
	node.leftMemory = {};
	node.rightMemory = {};
	node.leftTuples.clear();
	node.rightTuples.clear();
}

// export function dispose_left(nodes: INode[], n: number, context: Context) {
// 	node.leftMemory = {};
// 	node.leftTuples.clear();
// 	propagate_dispose(node, context);
// }

// export function dispose_right(nodes: INode[], n: number, context: Context) {
// 	node.rightMemory = {};
// 	node.rightTuples.clear();
// 	propagate_dispose(node, context);
// }

export function assert(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IBetaNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_assert(nodes, outNode, context, wm);
	}
}

export function modify(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IBetaNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_modify(nodes, outNode, context, wm);
	}
}

export function retract(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IBetaNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_retract(nodes, outNode, context, wm);
	}
}

export function __addToLeftMemory(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IBetaNode;
	const hashCode = context.hashCode, lm = node.leftMemory;
	if (hashCode in lm) {
		return false;
	}
	lm[hashCode] = node.leftTuples.push(context);
	context.rightMatches = {};
	return true;
}

export function __addToMemoryMatches(nodes: INode[], n: number, rightContext: Context, leftContext: Context, createdContext: Context) {
	const node = nodes[n] as IBetaNode;
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

export function propagateFromLeft(nodes: INode[], n: number, context: Context, rc: Context, wm: WorkingMemory) {
	assert(nodes, n, __addToMemoryMatches(nodes, n, rc, context, context.clone(null, null, context.match.merge(rc.match))), wm);
}

export function assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToLeftMemory(nodes, n, context);
	const node = nodes[n] as IBetaNode;
	const rm = node.rightTuples.getRightMemory(context);
	rm.forEach((m) => {
		propagateFromLeft(nodes, n, context, m.data, wm);
	});
}

export function __addToRightMemory(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IBetaNode;
	const hashCode = context.hashCode, rm = node.rightMemory;
	if (hashCode in rm) {
		return false;
	}
	rm[hashCode] = node.rightTuples.push(context);
	context.leftMatches = {};
	return true;
}

function propagateFromRight(nodes: INode[], n: number, context: Context, lc: Context, wm: WorkingMemory) {
	assert(nodes, n, __addToMemoryMatches(nodes, n, context, lc, lc.clone(null, null, lc.match.merge(context.match))), wm);
}

export function assert_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToRightMemory(nodes, n, context);
	const node = nodes[n] as IBetaNode;
	const lm = node.leftTuples.getLeftMemory(context);
	lm.forEach((m) => {
		propagateFromRight(nodes, n, context, m.data, wm);
	});
}

export function removeFromLeftMemory(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IBetaNode;
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

export function propagateRetractModifyFromLeft(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const rightMatches = context.rightMatches;
	const hashCodes = Object.keys(rightMatches);
	hashCodes.forEach((hc) => {
		retract(nodes, n, rightMatches[hc].clone(), wm);
	});
}

function propagateAssertModifyFromLeft(nodes: INode[], n: number, context: Context, rightMatches: {
	[id: string]: Context;
}, rm: Context, wm: WorkingMemory) {
	const factId = rm.hashCode;
	if (factId in rightMatches) {
		modify(nodes, n, __addToMemoryMatches(nodes, n, rm, context, context.clone(null, null, context.match.merge(rm.match))), wm);
	} else {
		propagateFromLeft(nodes, n, context, rm, wm);
	}
}

export function modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const previousContext = removeFromLeftMemory(nodes, n, context).data;
	__addToLeftMemory(nodes, n, context);
	const node = nodes[n] as IBetaNode;
	const rm = node.rightTuples.getRightMemory(context);
	if (!rm.length) {
		propagateRetractModifyFromLeft(nodes, n, previousContext, wm);
	} else {
		const rightMatches = previousContext.rightMatches;
		rm.forEach((m) => {
			propagateAssertModifyFromLeft(nodes, n, context, rightMatches, m.data, wm);
		});
	}
}

export function removeFromRightMemory(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IBetaNode;
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

export function propagateRetractModifyFromRight(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const leftMatches = context.leftMatches;
	const hashCodes = Object.keys(leftMatches);
	hashCodes.forEach((hc) => {
		retract(nodes, n, leftMatches[hc].clone(), wm);
	});
}

function propagateAssertModifyFromRight(nodes: INode[], n: number, context: Context, leftMatches: {
	[id: string]: Context;
}, lm: Context, wm: WorkingMemory) {
	const factId = lm.hashCode;
	if (factId in leftMatches) {
		modify(nodes, n, __addToMemoryMatches(nodes, n, context, lm, context.clone(null, null, lm.match.merge(context.match))), wm);
	} else {
		propagateFromRight(nodes, n, context, lm, wm);
	}
}

export function modify_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const previousContext = removeFromRightMemory(nodes, n, context).data;
	__addToRightMemory(nodes, n, context);
	const node = nodes[n] as IBetaNode;
	const lm = node.leftTuples.getLeftMemory(context);
	if (!lm.length) {
		propagateRetractModifyFromRight(nodes, n, previousContext, wm);
	} else {
		const leftMatches = previousContext.leftMatches;
		lm.forEach((m) => {
			propagateAssertModifyFromRight(nodes, n, context, leftMatches, m.data, wm);
		});
	}
}

export function retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	context = removeFromLeftMemory(nodes, n, context).data;
	const rightMatches = context.rightMatches;
	const hashCodes = Object.keys(rightMatches);
	hashCodes.forEach((hashCode) => {
		retract(nodes, n, rightMatches[hashCode].clone(), wm);
	});
}

export function retract_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	context = removeFromRightMemory(nodes, n, context).data;
	const leftMatches = context.leftMatches;
	const hashCodes = Object.keys(leftMatches);
	hashCodes.forEach((hashCode) => {
		retract(nodes, n, leftMatches[hashCode].clone(), wm);
	});
}
