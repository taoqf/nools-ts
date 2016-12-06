import Context from '../context';
import { ITuple } from './misc/tuple-entry';
import LinkedList, { ILinkNode } from '../linked-list';
import { removeFromLeftMemory, assert, modify, retract, __addToLeftMemory, removeFromRightMemory, __addToRightMemory } from './beta-node';
import { INotNode, _create_not_node, removeFromLeftBlockedMemory, __cloneContext, addToLeftBlockedMemory } from './not-node';

export interface IExistsNode extends INotNode {
}

export function create(): IExistsNode {
	return _create_not_node('exists');
}

function blockedContext(node: IExistsNode, leftContext: Context, rightContext: Context) {
	leftContext.blocker = rightContext;
	removeFromLeftMemory(node, leftContext);
	addToLeftBlockedMemory(node, rightContext.blocking.push(leftContext));
	assert(node, __cloneContext(node, leftContext));
}

function notBlockedContext(node: IExistsNode, leftContext: Context, propagate: boolean) {
	__addToLeftMemory(node, leftContext);
	propagate && retract(node, __cloneContext(node, leftContext));
}

function propagateFromLeft(node: IExistsNode, leftContext: Context) {
	notBlockedContext(node, leftContext, false);
}

function blockFromAssertLeft(node: IExistsNode, leftContext: Context, rightContext: Context) {
	blockedContext(node, leftContext, rightContext);
}

export function assert_left(node: IExistsNode, context: Context) {
	const values = node.rightTuples.getRightMemory(context);
	const thisConstraint = node.constraint;
	if (context && values.every((value) => {
		const rc = value.data;
		if (thisConstraint.isMatch(context, rc)) {
			blockFromAssertLeft(node, context, rc);
			return false;
		} else {
			return true;
		}
	})) {
		propagateFromLeft(node, context);
	}
}

function blockFromAssertRight(node: IExistsNode, leftContext: Context, rightContext: Context) {
	blockedContext(node, leftContext, rightContext);
}

export function assert_right(node: IExistsNode, context: Context) {
	__addToRightMemory(node, context);
	context.blocking = new LinkedList<Context>();
	const fl = node.leftTuples.getLeftMemory(context).slice();	// todo: why do we need call slice?
	const thisConstraint = node.constraint;
	fl.forEach((l) => {
		const leftContext = l.data;
		if (thisConstraint.isMatch(leftContext, context)) {
			blockFromAssertRight(node, leftContext, context);
		}
	});
}

export function modify_left(node: IExistsNode, context: Context) {
	const thisConstraint = node.constraint;
	const rightTuples = node.rightTuples;
	let isBlocked = false;
	const tuple = removeFromLeftMemory(node, context);
	let leftContext: Context;
	if (!tuple) {
		//blocked before
		const tuple = removeFromLeftBlockedMemory(node, context);
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
				!isBlocked ? assert(node, __cloneContext(node, leftContext)) : modify(node, __cloneContext(node, leftContext));
				context.blocker = rc;
				addToLeftBlockedMemory(node, rc.blocking.push(context));
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
					!isBlocked ? assert(node, __cloneContext(node, leftContext)) : modify(node, __cloneContext(node, leftContext));

					addToLeftBlockedMemory(node, rc.blocking.push(context));
					context.blocker = rc;
					context = null;
					break;
				}
			}
		}
		if (context) {
			//we can still be propogated
			__addToLeftMemory(node, context);
			if (isBlocked) {
				//we were blocked so retract
				retract(node, __cloneContext(node, context));
			}

		}
	} else {
		throw new Error();
	}
}

export function modify_right(node: IExistsNode, context: Context) {
	const tuple = removeFromRightMemory(node, context);
	if (tuple) {
		const rightContext = tuple.data;
		const thisConstraint = node.constraint;
		const leftTuples = node.leftTuples;
		const leftTuplesLength = leftTuples.length;
		const blocking = rightContext.blocking;
		// const leftContext;
		// const node;
		__addToRightMemory(node, context);
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
						addToLeftBlockedMemory(node, context.blocking.push(leftContext));
						assert(node, __cloneContext(node, leftContext));
						leftContext = null;
					} else {
						//we arent blocked anymore
						leftContext.blocker = null;
						let tpl = tuple;
						while ((tpl = tpl.next)) {
							const rc = tpl.data;
							if (thisConstraint.isMatch(leftContext, rc)) {
								leftContext.blocker = rc;
								addToLeftBlockedMemory(node, rc.blocking.push(leftContext));
								assert(node, __cloneContext(node, leftContext));
								leftContext = null;
								break;
							}
						}
						if (leftContext) {
							__addToLeftMemory(node, leftContext);
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
						assert(node, __cloneContext(node, leftContext));
						removeFromLeftMemory(node, leftContext);
						addToLeftBlockedMemory(node, context.blocking.push(leftContext));
						leftContext.blocker = context;
					}
				}
			}
		}
	} else {
		throw new Error();
	}
}

export function retract_left(node: IExistsNode, context: Context) {
	if (!removeFromLeftMemory(node, context)) {
		const ctx = removeFromLeftBlockedMemory(node, context);
		if (ctx) {
			retract(node, __cloneContext(node, ctx.data));
		} else {
			throw new Error();
		}
	}
}

export function retract_right(node: IExistsNode, context: Context) {
	const ctx = removeFromRightMemory(node, context),
		rightContext = ctx.data,
		blocking = rightContext.blocking;
	if (blocking.length) {
		//if we are blocking left contexts
		// const leftContext,
		const thisConstraint = node.constraint;
		let blockingNode = { next: blocking.head } as ILinkNode<Context>;
		//  rc;
		while ((blockingNode = blockingNode.next)) {
			const leftContext = blockingNode.data;
			removeFromLeftBlockedMemory(node, leftContext);
			const rm = node.rightTuples.getRightMemory(leftContext);
			if (leftContext && rm.every((m) => {
				const rc = m.data;
				if (thisConstraint.isMatch(leftContext, rc)) {
					blockedContext(node, leftContext, rc);
					return false;
				} else {
					return true;
				}
			})) {
				notBlockedContext(node, leftContext, true);
			}
		}
		blocking.clear();
	}

}
