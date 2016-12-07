import mixin from 'lodash-ts/mixin';
import InitialFact from '../facts/initial';
import { ITuple } from './misc/tuple-entry';
import LinkedList, { ILinkNode } from '../linked-list';
import { INode, notNodeType } from './node';
import { removeFromRightMemory, removeFromLeftMemory, retract, __addToRightMemory, __addToLeftMemory, assert, modify } from './beta-node';
import { IJoinNode, _create_join_node } from './join-node';
import Context, { Match } from '../context';
import WorkingMemory from '../working-memory';

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

export function addToLeftBlockedMemory(nodes: INode[], n: number, context: ILinkNode<Context>) {
	const node = nodes[n] as INotNode;
	const data = context.data, hashCode = data.hashCode;
	const ctx = node.leftMemory[hashCode];
	node.leftTupleMemory[hashCode] = context;
	if (ctx) {
		node.leftTuples.remove(ctx);
	}
	return node;
}

export function __cloneContext(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as INotNode;
	return context.clone(null, null, context.match.merge(node.notMatch));
}

function blockedContext(nodes: INode[], n: number, leftContext: Context, rightContext: Context, propagate = false, wm: WorkingMemory) {
	leftContext.blocker = rightContext;
	removeFromLeftMemory(nodes, n, leftContext);
	addToLeftBlockedMemory(nodes, n, rightContext.blocking.push(leftContext));
	propagate && retract(nodes, n, __cloneContext(nodes, n, leftContext), wm);
}

export function blockFromAssertLeft(nodes: INode[], n: number, leftContext: Context, rightContext: Context, wm: WorkingMemory) {
	blockedContext(nodes, n, leftContext, rightContext, false, wm);
}

export function assert_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const node = nodes[n] as INotNode;
	const values = node.rightTuples.getRightMemory(context);
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

export function assert_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	__addToRightMemory(nodes, n, context);
	context.blocking = new LinkedList<Context>();
	const node = nodes[n] as INotNode;
	const fl = node.leftTuples.getLeftMemory(context).slice();	// todo: why do we need call slice?
	const thisConstraint = node.constraint;
	fl.forEach((l) => {
		const leftContext = l.data;
		if (thisConstraint.isMatch(leftContext, context)) {
			blockFromAssertRight(nodes, n, leftContext, context, wm);
		}
	});
}

export function retract_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromRightMemory(nodes, n, context),
		rightContext = ctx.data,
		blocking = rightContext.blocking;
	if (blocking.length) {
		//if we are blocking left contexts
		// const leftContext,
		const node = nodes[n] as INotNode;
		const thisConstraint = node.constraint;
		let blockingNode = { next: blocking.head } as ILinkNode<Context>;
		//  rc;
		while ((blockingNode = blockingNode.next)) {
			const leftContext = blockingNode.data;
			removeFromLeftBlockedMemory(nodes, n, leftContext);
			const rm = node.rightTuples.getRightMemory(leftContext);
			if (leftContext && rm.every((m) => {
				const rc = m.data;
				if (thisConstraint.isMatch(leftContext, rc)) {
					blockedContext(nodes, n, leftContext, rc, false, wm);
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

function notBlockedContext(nodes: INode[], n: number, leftContext: Context, propagate: boolean, wm: WorkingMemory) {
	__addToLeftMemory(nodes, n, leftContext);
	propagate && assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
}

function propagateFromLeft(nodes: INode[], n: number, leftContext: Context, wm: WorkingMemory) {
	notBlockedContext(nodes, n, leftContext, true, wm);
}

function propagateFromRight(nodes: INode[], n: number, leftContext: Context, wm: WorkingMemory) {
	notBlockedContext(nodes, n, leftContext, true, wm);
}

function blockFromAssertRight(nodes: INode[], n: number, leftContext: Context, rightContext: Context, wm: WorkingMemory) {
	blockedContext(nodes, n, leftContext, rightContext, true, wm);
}

export function retract_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const tuple = removeFromLeftMemory(nodes, n, context);
	if (tuple) {
		const ctx = tuple.data;
		retract(nodes, n, __cloneContext(nodes, n, ctx), wm);
	} else {
		if (!removeFromLeftBlockedMemory(nodes, n, context)) {
			throw new Error();
		}
	}
}

export function removeFromLeftBlockedMemory(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as INotNode;
	const ret = node.leftTupleMemory[context.hashCode] || null;
	if (ret) {
		delete node.leftTupleMemory[context.hashCode];
		ret.data.blocker.blocking.remove(ret);
	}
	return ret;
}

export function modify_left(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromLeftMemory(nodes, n, context);
	const node = nodes[n] as INotNode;
	const thisConstraint = node.constraint;
	const rightTuples = node.rightTuples.getRightMemory(context);
	let isBlocked = false;
	let leftContext = ctx && ctx.data;
	if (!leftContext) {
		//blocked before
		// ctx = node.removeFromLeftBlockedMemory(context);
		const ctx = removeFromLeftBlockedMemory(nodes, n, context);
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
					retract(nodes, n, __cloneContext(nodes, n, leftContext), wm);
				}
				context.blocker = rc;
				addToLeftBlockedMemory(nodes, n, rc.blocking.push(context));
				context = null;
			}
		}
		if (context && rightTuples.every((rightTuple) => {
			const rc = rightTuple.data;
			if (thisConstraint.isMatch(context, rc)) {
				//we cant be proagated so retract previous
				if (!isBlocked) {
					//we were asserted before so retract
					retract(nodes, n, __cloneContext(nodes, n, leftContext), wm);
				}
				addToLeftBlockedMemory(nodes, n, rc.blocking.push(context));
				context.blocker = rc;
				return false;
			} else {
				return true;
			}
		})) {
			//we were propogated before
			//we can still be propogated
			__addToLeftMemory(nodes, n, context);
			if (!isBlocked) {
				//we weren't blocked before so modify
				modify(nodes, n, __cloneContext(nodes, n, context), wm);
			} else {
				//we were blocked before but aren't now
				assert(nodes, n, __cloneContext(nodes, n, context), wm);
			}
		}
	} else {
		throw new Error();
	}

}

export function modify_right(nodes: INode[], n: number, context: Context, wm: WorkingMemory) {
	const ctx = removeFromRightMemory(nodes, n, context);
	if (ctx) {
		const rightContext = ctx.data;
		const node = nodes[n] as INotNode;
		const leftTuples = node.leftTuples.getLeftMemory(context).slice();
		const leftTuplesLength = leftTuples.length;
		const thisConstraint = node.constraint;
		const blocking = rightContext.blocking;
		__addToRightMemory(nodes, n, context);
		context.blocking = new LinkedList<Context>();
		//check old blocked contexts
		//check if the same contexts blocked before are still blocked
		let blockingNode = { next: blocking.head } as ILinkNode<Context>;
		while ((blockingNode = blockingNode.next)) {
			const leftContext = blockingNode.data;
			leftContext.blocker = null;
			if (thisConstraint.isMatch(leftContext, context)) {
				leftContext.blocker = context;
				addToLeftBlockedMemory(nodes, n, context.blocking.push(leftContext));
			} else {
				//we arent blocked anymore
				leftContext.blocker = null;
				let nn = ctx;
				while ((nn = nn.next)) {
					const rc = nn.data;
					if (thisConstraint.isMatch(leftContext, rc)) {
						leftContext.blocker = rc;
						addToLeftBlockedMemory(nodes, n, rc.blocking.push(leftContext));
						break;
					}
				}
				if (leftContext) {
					__addToLeftMemory(nodes, n, leftContext);
					assert(nodes, n, __cloneContext(nodes, n, leftContext), wm);
				}
			}
		}
		if (leftTuplesLength) {
			//check currently left tuples in memory
			leftTuples.forEach((leftTuple) => {
				const leftContext = leftTuple.data;
				if (thisConstraint.isMatch(leftContext, context)) {
					retract(nodes, n, __cloneContext(nodes, n, leftContext), wm);
					removeFromLeftMemory(nodes, n, leftContext);
					addToLeftBlockedMemory(nodes, n, context.blocking.push(leftContext));
					leftContext.blocker = context;
				}
			});
		}
	} else {
		throw new Error();
	}
}
