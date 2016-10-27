import Node from './node';
import LeftMemory from './misc/left-memory';
import RightMemory from './misc/right-memory';
import Context from '../context';
import Fact from '../facts/fact';
import {ITuple} from './misc/tuple-entry';

export default class BetaNode extends Node {

	nodeType = "BetaNode";

	leftMemory: { [hasCode: string]: ITuple } = {};
	rightMemory: { [hasCode: string]: ITuple } = {};
	leftTuples = new LeftMemory();
	rightTuples = new RightMemory();

	// __propagate(method, context: Context) {
	// 	const entrySet = this.__entrySet, i = entrySet.length, entry, outNode;
	// 	while (--i > -1) {
	// 		entry = entrySet[i];
	// 		outNode = entry.key;
	// 		outNode[method](context);
	// 	}
	// }

	propagateAssert(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.assert(context);
		}
	}

	propagateRetract(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.retract(context);
		}
	}
	propagateModify(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.modify(context);
		}
	}

	dispose() {
		this.leftMemory = {};
		this.rightMemory = {};
		this.leftTuples.clear();
		this.rightTuples.clear();
	}

	disposeLeft(fact: Fact) {
		this.leftMemory = {};
		this.leftTuples.clear();
		this.propagateDispose(fact);
	}

	disposeRight(fact: Fact) {
		this.rightMemory = {};
		this.rightTuples.clear();
		this.propagateDispose(fact);
	}

	hashCode() {
		return this.nodeType + " " + this.__count;
	}

	toString() {
		return this.nodeType + " " + this.__count;
	}

	retractLeft(context: Context) {
		context = this.removeFromLeftMemory(context).data;
		const rightMatches = context.rightMatches;
		const hashCodes = Object.keys(rightMatches);
		hashCodes.forEach((hashCode) => {
			this.propagateRetract(rightMatches[hashCode].clone());
		});
	}

	retractRight(context: Context) {
		context = this.removeFromRightMemory(context).data;
		const leftMatches = context.leftMatches;
		const hashCodes = Object.keys(leftMatches);
		hashCodes.forEach((hashCode) => {
			this.propagateRetract(leftMatches[hashCode].clone());
		});
	}

	assertLeft(context: Context) {
		this.__addToLeftMemory(context);
		const rm = this.rightTuples.getRightMemory(context);
		rm.forEach((m) => {
			this.propagateFromLeft(context, m.data);
		});
	}

	assertRight(context: Context) {
		this.__addToRightMemory(context);
		const lm = this.leftTuples.getLeftMemory(context);
		lm.forEach((m) => {
			this.propagateFromRight(context, m.data);
		});
	}

	modifyLeft(context: Context) {
		const previousContext = this.removeFromLeftMemory(context).data;
		this.__addToLeftMemory(context);
		const rm = this.rightTuples.getRightMemory(context);
		if (!rm.length) {
			this.propagateRetractModifyFromLeft(previousContext);
		} else {
			const rightMatches = previousContext.rightMatches;
			rm.forEach((m) => {
				this.propagateAssertModifyFromLeft(context, rightMatches, m.data);
			});
		}
	}

	modifyRight(context: Context) {
		const previousContext = this.removeFromRightMemory(context).data;
		this.__addToRightMemory(context);
		const lm = this.leftTuples.getLeftMemory(context);
		if (!lm.length) {
			this.propagateRetractModifyFromRight(previousContext);
		} else {
			const leftMatches = previousContext.leftMatches;
			lm.forEach((m) => {
				this.propagateAssertModifyFromRight(context, leftMatches, m.data);
			});
		}
	}

	propagateFromLeft(context: Context, rc: Context) {
		this.propagateAssert(this.__addToMemoryMatches(rc, context, context.clone(null, null, context.match.merge(rc.match))));
	}

	propagateFromRight(context: Context, lc: Context) {
		this.propagateAssert(this.__addToMemoryMatches(context, lc, lc.clone(null, null, lc.match.merge(context.match))));
	}

	propagateRetractModifyFromLeft(context: Context) {
		const rightMatches = context.rightMatches;
		const hashCodes = Object.keys(rightMatches);
		hashCodes.forEach((hc) => {
			this.propagateRetract(rightMatches[hc].clone());
		});
	}

	propagateRetractModifyFromRight(context: Context) {
		const leftMatches = context.leftMatches;
		const hashCodes = Object.keys(leftMatches);
		hashCodes.forEach((hc) => {
			this.propagateRetract(leftMatches[hc].clone());
		});
	}

	propagateAssertModifyFromLeft(context: Context, rightMatches: {
		[id: string]: Context;
	}, rm: Context) {
		const factId = rm.hashCode;
		if (factId in rightMatches) {
			this.propagateModify(this.__addToMemoryMatches(rm, context, context.clone(null, null, context.match.merge(rm.match))));
		} else {
			this.propagateFromLeft(context, rm);
		}
	}

	propagateAssertModifyFromRight(context: Context, leftMatches: {
		[id: string]: Context;
	}, lm: Context) {
		const factId = lm.hashCode;
		if (factId in leftMatches) {
			this.propagateModify(this.__addToMemoryMatches(context, lm, context.clone(null, null, lm.match.merge(context.match))));
		} else {
			this.propagateFromRight(context, lm);
		}
	}

	removeFromRightMemory(context: Context) {
		const hashCode = context.hashCode;
		const tuple = this.rightMemory[hashCode] || null;
		const tuples = this.rightTuples;
		if (tuple) {
			const leftMemory = this.leftMemory;
			const ret = tuple.data;
			const leftMatches = ret.leftMatches;
			tuples.remove(tuple);
			const hashCodes = Object.keys(leftMatches);
			hashCodes.forEach((hc) => {
				delete leftMemory[hc].data.rightMatches[hashCode];
			});
			delete this.rightMemory[hashCode];
		}
		return tuple;
	}

	removeFromLeftMemory(context: Context) {
		const hashCode = context.hashCode;
		const tuple = this.leftMemory[hashCode] || null;
		if (tuple) {
			const rightMemory = this.rightMemory;
			const rightMatches = tuple.data.rightMatches;
			this.leftTuples.remove(tuple);
			const hashCodes = Object.keys(rightMatches)
			hashCodes.forEach((hc) => {
				delete rightMemory[hc].data.leftMatches[hashCode];
			});
			delete this.leftMemory[hashCode];
		}
		return tuple;
	}

	// getRightMemoryMatches(context: Context) {
	// 	const lm = this.leftMemory[context.hashCode], ret = {};
	// 	if (lm) {
	// 		return lm.rightMatches;
	// 	}
	// 	return ret;
	// }

	__addToMemoryMatches(rightContext: Context, leftContext: Context, createdContext: Context) {
		const rightFactId = rightContext.hashCode,
			rm = this.rightMemory[rightFactId],
			leftFactId = leftContext.hashCode;
		if (rm) {
			const data = rm.data;
			if (leftFactId in data.leftMatches) {
				throw new Error("Duplicate left fact entry");
			}
			data.leftMatches[leftFactId] = createdContext;
		}
		const lm = this.leftMemory[leftFactId];
		if (lm) {
			const data = lm.data;
			if (rightFactId in data.rightMatches) {
				throw new Error("Duplicate right fact entry");
			}
			data.rightMatches[rightFactId] = createdContext;
		}
		return createdContext;
	}

	__addToRightMemory(context: Context) {
		const hashCode = context.hashCode, rm = this.rightMemory;
		if (hashCode in rm) {
			return false;
		}
		rm[hashCode] = this.rightTuples.push(context);
		context.leftMatches = {};
		return true;
	}


	__addToLeftMemory(context: Context) {
		const hashCode = context.hashCode, lm = this.leftMemory;
		if (hashCode in lm) {
			return false;
		}
		lm[hashCode] = this.leftTuples.push(context);
		context.rightMatches = {};
		return true;
	}
}