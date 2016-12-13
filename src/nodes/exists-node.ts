import Context from '../context';
import { ITuple } from './misc/tuple-entry';
import LinkedList, { ILinkNode } from '../linked-list';
import { INode, IExistsNode } from '../nodes';
import { removeFromLeftMemory, assert, modify, retract, __addToLeftMemory, removeFromRightMemory, __addToRightMemory } from './beta-node';
import { removeFromLeftBlockedMemory, __cloneContext, addToLeftBlockedMemory } from './not-node';
import WorkingMemory from '../working-memory';
import {memory_get} from './misc/memory';

function blockedContext(nodes: INode[], n: number, leftContext: Context, rightContext: Context, wm: WorkingMemory) {
	const node = nodes[n] as IExistsNode;
	leftContext.blocker = rightContext;
	removeFromLeftMemory(nodes, n, leftContext);
	addToLeftBlockedMemory(nodes, n, rightContext.blocking.push(leftContext));
	assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
}

function notBlockedContext(nodes: INode[], n: number, leftContext: Context, propagate: boolean, wm: WorkingMemory) {
	__addToLeftMemory(nodes, n, leftContext);
	propagate && retract(nodes, n, __cloneContext(nodes, n, leftContext), wm);
}

function propagateFromLeft(nodes: INode[], n: number, leftContext: Context, wm: WorkingMemory) {
	notBlockedContext(nodes, n, leftContext, false, wm);
}

function blockFromAssertLeft(nodes: INode[], n: number, leftContext: Context, rightContext: Context, wm: WorkingMemory) {
	blockedContext(nodes, n, leftContext, rightContext, wm);
}

export function assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IExistsNode;
	const values = memory_get(node.rightTuples, context);
	const thisConstraint = node.constraint;
	if (context && values.every((value) => {
		const rc = value.data;
		if (thisConstraint.isMatch(context, rc)) {
			blockFromAssertLeft(nodes, n, context, rc, wm);
			return false;
		} else {
			return true;
		}
	})) {
		propagateFromLeft(nodes, n, context, wm);
	}
}

function blockFromAssertRight(nodes: INode[], n: number, leftContext: Context, rightContext: Context, wm: WorkingMemory) {
	blockedContext(nodes, n, leftContext, rightContext, wm);
}

export function assert_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToRightMemory(nodes, n, context);
	context.blocking = new LinkedList<Context>();
	const node = nodes[n] as IExistsNode;
	const fl = memory_get(node.leftTuples, context).slice();	// todo: why do we need call slice?
	const thisConstraint = node.constraint;
	fl.forEach((l) => {
		const leftContext = l.data;
		if (thisConstraint.isMatch(leftContext, context)) {
			blockFromAssertRight(nodes, n, leftContext, context, wm);
		}
	});
}

export function modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as IExistsNode;
	const thisConstraint = node.constraint;
	const rightTuples = node.rightTuples;
	let isBlocked = false;
	const tuple = removeFromLeftMemory(nodes, n, context);
	let leftContext: Context;
	if (!tuple) {
		//blocked before
		const tuple = removeFromLeftBlockedMemory(nodes, n, context);
		isBlocked = true;
		leftContext = tuple && tuple.data;
	} else {
		leftContext = tuple.data;
	}
	if (leftContext) {
		let blocker: ITuple;
		if (leftContext && leftContext.blocker) {
			//we were blocked before so only check nodes previous to our blocker
			blocker = node.rightMemory[leftContext.blocker.hashCode];
		}
		// let node: ITuple;
		if (blocker) {
			const rc = blocker.data;
			if (thisConstraint.isMatch(context, rc)) {
				//propogate as a modify or assert
				!isBlocked ? assert(nodes, n, __cloneContext(nodes, n, leftContext), wm) : modify(nodes, n, __cloneContext(nodes, n, leftContext), wm);
				context.blocker = rc;
				addToLeftBlockedMemory(nodes, n, rc.blocking.push(context));
				context = null;
			}
			// if (context) {
			// 	node = { next: blocker.next } as ITuple;
			// }
			// } else {
			// 	node = { next: rightTuples.head } as ITuple;
		}
		if (context && rightTuples.length) {
			let tuple = { next: rightTuples.head } as ITuple;
			//we were propagated before
			while ((tuple = tuple.next)) {
				const rc = tuple.data;
				if (thisConstraint.isMatch(context, rc)) {
					//we cant be proagated so retract previous

					//we were asserted before so retract
					!isBlocked ? assert(nodes, n, __cloneContext(nodes, n, leftContext), wm) : modify(nodes, n, __cloneContext(nodes, n, leftContext), wm);

					addToLeftBlockedMemory(nodes, n, rc.blocking.push(context));
					context.blocker = rc;
					context = null;
					break;
				}
			}
		}
		if (context) {
			//we can still be propogated
			__addToLeftMemory(nodes, n, context);
			if (isBlocked) {
				//we were blocked so retract
				retract(nodes, n, __cloneContext(nodes, n, context), wm);
			}

		}
	} else {
		throw new Error();
	}
}

export function modify_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const tuple = removeFromRightMemory(nodes, n, context);
	if (tuple) {
		const node = nodes[n] as IExistsNode;
		const rightContext = tuple.data;
		const thisConstraint = node.constraint;
		const leftTuples = node.leftTuples;
		const leftTuplesLength = leftTuples.length;
		const blocking = rightContext.blocking;
		// const leftContext;
		// const node;
		__addToRightMemory(nodes, n, context);
		context.blocking = new LinkedList<Context>();
		if (leftTuplesLength || blocking.length) {
			if (blocking.length) {
				// const rc;
				//check old blocked contexts
				//check if the same contexts blocked before are still blocked
				let blockingNode = { next: blocking.head } as ITuple;
				while ((blockingNode = blockingNode.next)) {
					let leftContext = blockingNode.data;
					leftContext.blocker = null;
					if (thisConstraint.isMatch(leftContext, context)) {
						leftContext.blocker = context;
						addToLeftBlockedMemory(nodes, n, context.blocking.push(leftContext));
						assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
						leftContext = null;
					} else {
						//we arent blocked anymore
						leftContext.blocker = null;
						let tpl = tuple;
						while ((tpl = tpl.next)) {
							const rc = tpl.data;
							if (thisConstraint.isMatch(leftContext, rc)) {
								leftContext.blocker = rc;
								addToLeftBlockedMemory(nodes, n, rc.blocking.push(leftContext));
								assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
								leftContext = null;
								break;
							}
						}
						if (leftContext) {
							__addToLeftMemory(nodes, n, leftContext);
						}
					}
				}
			}

			if (leftTuplesLength) {
				//check currently left tuples in memory
				let tuple = { next: leftTuples.head } as ITuple;
				while ((tuple = tuple.next)) {
					const leftContext = tuple.data;
					if (thisConstraint.isMatch(leftContext, context)) {
						assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
						removeFromLeftMemory(nodes, n, leftContext);
						addToLeftBlockedMemory(nodes, n, context.blocking.push(leftContext));
						leftContext.blocker = context;
					}
				}
			}
		}
	} else {
		throw new Error();
	}
}

export function retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	if (!removeFromLeftMemory(nodes, n, context)) {
		const ctx = removeFromLeftBlockedMemory(nodes, n, context);
		if (ctx) {
			retract(nodes, n, __cloneContext(nodes, n, ctx.data), wm);
		} else {
			throw new Error();
		}
	}
}

export function retract_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromRightMemory(nodes, n, context),
		rightContext = ctx.data,
		blocking = rightContext.blocking;
	if (blocking.length) {
		//if we are blocking left contexts
		// const leftContext,
		const node = nodes[n] as IExistsNode;
		const thisConstraint = node.constraint;
		let blockingNode = { next: blocking.head } as ILinkNode<Context>;
		//  rc;
		while ((blockingNode = blockingNode.next)) {
			const leftContext = blockingNode.data;
			removeFromLeftBlockedMemory(nodes, n, leftContext);
			const rm = memory_get(node.rightTuples, leftContext);
			if (leftContext && rm.every((m) => {
				const rc = m.data;
				if (thisConstraint.isMatch(leftContext, rc)) {
					blockedContext(nodes, n, leftContext, rc, wm);
					return false;
				} else {
					return true;
				}
			})) {
				notBlockedContext(nodes, n, leftContext, true, wm);
			}
		}
		blocking.clear();
	}

}
