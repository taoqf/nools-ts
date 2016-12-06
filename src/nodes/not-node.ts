import mixin from 'lodash-ts/mixin';
import InitialFact from '../facts/initial';
import { ITuple } from './misc/tuple-entry';
import LinkedList, { ILinkNode } from '../linked-list';
import { notNodeType } from './node';
import { removeFromRightMemory, removeFromLeftMemory, retract, __addToRightMemory, __addToLeftMemory, assert, modify } from './beta-node';
import { IJoinNode, _create_join_node } from './join-node';
import Context, { Match } from '../context';

export interface INotNode extends IJoinNode {
	leftTupleMemory: { [hashCode: string]: ILinkNode<Context> };
	notMatch: Match;
}

export function _create_not_node(type: notNodeType): INotNode {
	return mixin(_create_join_node(type), {
		leftTupleMemory: {},
		notMatch: new Context(new InitialFact()).match
	});
}

export function create(): INotNode {
	return _create_not_node('not');
}

export function addToLeftBlockedMemory(node: INotNode, context: ILinkNode<Context>) {
	const data = context.data, hashCode = data.hashCode;
	const ctx = node.leftMemory[hashCode];
	node.leftTupleMemory[hashCode] = context;
	if (ctx) {
		node.leftTuples.remove(ctx);
	}
	return node;
}

export function __cloneContext(node: INotNode, context: Context) {
	return context.clone(null, null, context.match.merge(node.notMatch));
}

function blockedContext(node: INotNode, leftContext: Context, rightContext: Context, propagate = false) {
	leftContext.blocker = rightContext;
	removeFromLeftMemory(node, leftContext);
	addToLeftBlockedMemory(node, rightContext.blocking.push(leftContext));
	propagate && retract(node, __cloneContext(node, leftContext));
}

export function blockFromAssertLeft(node: INotNode, leftContext: Context, rightContext: Context) {
	blockedContext(node, leftContext, rightContext, false);
}

export function assert_left(node: INotNode, context: Context) {
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

export function assert_right(node: INotNode, context: Context) {
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

export function retract_right(node: INotNode, context: Context) {
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

function notBlockedContext(node: INotNode, leftContext: Context, propagate: boolean) {
	__addToLeftMemory(node, leftContext);
	propagate && assert(node, __cloneContext(node, leftContext));
}

function propagateFromLeft(node: INotNode, leftContext: Context) {
	notBlockedContext(node, leftContext, true);
}

function propagateFromRight(node: INotNode, leftContext: Context) {
	notBlockedContext(node, leftContext, true);
}

function blockFromAssertRight(node: INotNode, leftContext: Context, rightContext: Context) {
	blockedContext(node, leftContext, rightContext, true);
}

export function retract_left(node: INotNode, context: Context) {
	const tuple = removeFromLeftMemory(node, context);
	if (tuple) {
		const ctx = tuple.data;
		retract(node, __cloneContext(node, ctx));
	} else {
		if (!removeFromLeftBlockedMemory(node, context)) {
			throw new Error();
		}
	}
}

export function removeFromLeftBlockedMemory(node: INotNode, context: Context) {
	const ret = node.leftTupleMemory[context.hashCode] || null;
	if (ret) {
		delete node.leftTupleMemory[context.hashCode];
		ret.data.blocker.blocking.remove(ret);
	}
	return ret;
}

export function modify_left(node: INotNode, context: Context) {
	const ctx = removeFromLeftMemory(node, context);
	const thisConstraint = node.constraint;
	const rightTuples = node.rightTuples.getRightMemory(context);
	let isBlocked = false;
	let leftContext = ctx && ctx.data;
	if (!leftContext) {
		//blocked before
		// ctx = node.removeFromLeftBlockedMemory(context);
		const ctx = removeFromLeftBlockedMemory(node, context);
		leftContext = ctx.data;
		isBlocked = true;
	}
	if (leftContext) {
		let blocker: ITuple;
		if (leftContext && leftContext.blocker) {
			//we were blocked before so only check nodes previous to our blocker
			blocker = node.rightMemory[leftContext.blocker.hashCode];
			leftContext.blocker = null;
		}
		if (blocker) {
			const rc = blocker.data;
			if (thisConstraint.isMatch(context, rc)) {
				//we cant be proagated so retract previous
				if (!isBlocked) {
					//we were asserted before so retract
					retract(node, __cloneContext(node, leftContext));
				}
				context.blocker = rc;
				addToLeftBlockedMemory(node, rc.blocking.push(context));
				context = null;
			}
		}
		if (context && rightTuples.every((rightTuple) => {
			const rc = rightTuple.data;
			if (thisConstraint.isMatch(context, rc)) {
				//we cant be proagated so retract previous
				if (!isBlocked) {
					//we were asserted before so retract
					retract(node, __cloneContext(node, leftContext));
				}
				addToLeftBlockedMemory(node, rc.blocking.push(context));
				context.blocker = rc;
				return false;
			} else {
				return true;
			}
		})) {
			//we were propogated before
			//we can still be propogated
			__addToLeftMemory(node, context);
			if (!isBlocked) {
				//we weren't blocked before so modify
				modify(node, __cloneContext(node, context));
			} else {
				//we were blocked before but aren't now
				assert(node, __cloneContext(node, context));
			}
		}
	} else {
		throw new Error();
	}

}

export function modify_right(node: INotNode, context: Context) {
	const ctx = removeFromRightMemory(node, context);
	if (ctx) {
		const rightContext = ctx.data;
		const leftTuples = node.leftTuples.getLeftMemory(context).slice();
		const leftTuplesLength = leftTuples.length;
		const thisConstraint = node.constraint;
		const blocking = rightContext.blocking;
		__addToRightMemory(node, context);
		context.blocking = new LinkedList<Context>();
		//check old blocked contexts
		//check if the same contexts blocked before are still blocked
		let blockingNode = { next: blocking.head } as ILinkNode<Context>;
		while ((blockingNode = blockingNode.next)) {
			const leftContext = blockingNode.data;
			leftContext.blocker = null;
			if (thisConstraint.isMatch(leftContext, context)) {
				leftContext.blocker = context;
				addToLeftBlockedMemory(node, context.blocking.push(leftContext));
			} else {
				//we arent blocked anymore
				leftContext.blocker = null;
				let n = ctx;
				while ((n = n.next)) {
					const rc = n.data;
					if (thisConstraint.isMatch(leftContext, rc)) {
						leftContext.blocker = rc;
						addToLeftBlockedMemory(node, rc.blocking.push(leftContext));
						break;
					}
				}
				if (leftContext) {
					__addToLeftMemory(node, leftContext);
					assert(node, __cloneContext(node, leftContext));
				}
			}
		}
		if (leftTuplesLength) {
			//check currently left tuples in memory
			leftTuples.forEach((leftTuple) => {
				const leftContext = leftTuple.data;
				if (thisConstraint.isMatch(leftContext, context)) {
					retract(node, __cloneContext(node, leftContext));
					removeFromLeftMemory(node, leftContext);
					addToLeftBlockedMemory(node, context.blocking.push(leftContext));
					leftContext.blocker = context;
				}
			});
		}
	} else {
		throw new Error();
	}
}
