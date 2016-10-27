import JoinNode from './join-node';
import Context, {Match} from '../context';
import InitialFact from '../facts/initial';
import {ITuple} from './misc/tuple-entry';
import LinkedList, {ILinkNode} from '../linked-list';

export default class NotNode extends JoinNode {
	nodeType = "NotNode";
	leftTupleMemory: { [hashCode: string]: ILinkNode<Context> } = {};
	//use this ensure a unique match for and propagated context.
	notMatch = new Context(new InitialFact()).match;

	protected __cloneContext(context: Context) {
		return context.clone(null, null, context.match.merge(this.notMatch));
	}

	retractRight(context: Context) {
		const ctx = this.removeFromRightMemory(context),
			rightContext = ctx.data,
			blocking = rightContext.blocking;
		if (blocking.length) {
			//if we are blocking left contexts
			// const leftContext,
			const thisConstraint = this.constraint;
			let blockingNode = { next: blocking.head } as ILinkNode<Context>;
			//  rc;
			while ((blockingNode = blockingNode.next)) {
				const leftContext = blockingNode.data;
				this.removeFromLeftBlockedMemory(leftContext);
				const rm = this.rightTuples.getRightMemory(leftContext);
				if (leftContext && rm.every((m) => {
					const rc = m.data;
					if (thisConstraint.isMatch(leftContext, rc)) {
						this.blockedContext(leftContext, rc);
						return false;
					} else {
						return true;
					}
				})) {
					this.notBlockedContext(leftContext, true);
				}
			}
			blocking.clear();
		}

	}

	blockedContext(leftContext: Context, rightContext: Context, propagate = false) {
		leftContext.blocker = rightContext;
		this.removeFromLeftMemory(leftContext);
		this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
		propagate && this.propagateRetract(this.__cloneContext(leftContext));
	}

	notBlockedContext(leftContext: Context, propagate: boolean) {
		this.__addToLeftMemory(leftContext);
		propagate && this.propagateAssert(this.__cloneContext(leftContext));
	}

	propagateFromLeft(leftContext: Context) {
		this.notBlockedContext(leftContext, true);
	}

	propagateFromRight(leftContext: Context) {
		this.notBlockedContext(leftContext, true);
	}

	blockFromAssertRight(leftContext: Context, rightContext: Context) {
		this.blockedContext(leftContext, rightContext, true);
	}

	blockFromAssertLeft(leftContext: Context, rightContext: Context) {
		this.blockedContext(leftContext, rightContext, false);
	}


	retractLeft(context: Context) {
		const tuple = this.removeFromLeftMemory(context);
		if (tuple) {
			const ctx = tuple.data;
			this.propagateRetract(this.__cloneContext(ctx));
		} else {
			if (!this.removeFromLeftBlockedMemory(context)) {
				throw new Error();
			}
		}
	}

	assertLeft(context: Context) {
		const values = this.rightTuples.getRightMemory(context);
		const thisConstraint = this.constraint;
		if (context && values.every((value) => {
			const rc = value.data;
			if (thisConstraint.isMatch(context, rc)) {
				this.blockFromAssertLeft(context, rc);
				return false;
			} else {
				return true;
			}
		})) {
			this.propagateFromLeft(context);
		}
	}

	assertRight(context: Context) {
		this.__addToRightMemory(context);
		context.blocking = new LinkedList<Context>();
		const fl = this.leftTuples.getLeftMemory(context).slice();	// todo: why do we need call slice?
		const thisConstraint = this.constraint;
		fl.forEach((l) => {
			const leftContext = l.data;
			if (thisConstraint.isMatch(leftContext, context)) {
				this.blockFromAssertRight(leftContext, context);
			}
		});
	}

	addToLeftBlockedMemory(context: ILinkNode<Context>) {
		const data = context.data, hashCode = data.hashCode;
		const ctx = this.leftMemory[hashCode];
		this.leftTupleMemory[hashCode] = context;
		if (ctx) {
			this.leftTuples.remove(ctx);
		}
		return this;
	}

	removeFromLeftBlockedMemory(context: Context) {
		const ret = this.leftTupleMemory[context.hashCode] || null;
		if (ret) {
			delete this.leftTupleMemory[context.hashCode];
			ret.data.blocker.blocking.remove(ret);
		}
		return ret;
	}

	modifyLeft(context: Context) {
		const ctx = this.removeFromLeftMemory(context);
		const thisConstraint = this.constraint;
		const rightTuples = this.rightTuples.getRightMemory(context);
		let isBlocked = false;
		let leftContext = ctx && ctx.data;
		if (!leftContext) {
			//blocked before
			// ctx = this.removeFromLeftBlockedMemory(context);
			const ctx = this.removeFromLeftBlockedMemory(context);
			leftContext = ctx.data;
			isBlocked = true;
		}
		if (leftContext) {
			let blocker: ITuple;
			if (leftContext && leftContext.blocker) {
				//we were blocked before so only check nodes previous to our blocker
				blocker = this.rightMemory[leftContext.blocker.hashCode];
				leftContext.blocker = null;
			}
			if (blocker) {
				const rc = blocker.data;
				if (thisConstraint.isMatch(context, rc)) {
					//we cant be proagated so retract previous
					if (!isBlocked) {
						//we were asserted before so retract
						this.propagateRetract(this.__cloneContext(leftContext));
					}
					context.blocker = rc;
					this.addToLeftBlockedMemory(rc.blocking.push(context));
					context = null;
				}
			}
			if (context && rightTuples.every((rightTuple) => {
				const rc = rightTuple.data;
				if (thisConstraint.isMatch(context, rc)) {
					//we cant be proagated so retract previous
					if (!isBlocked) {
						//we were asserted before so retract
						this.propagateRetract(this.__cloneContext(leftContext));
					}
					this.addToLeftBlockedMemory(rc.blocking.push(context));
					context.blocker = rc;
					return false;
				} else {
					return true;
				}
			})) {
				//we were propogated before
				//we can still be propogated
				this.__addToLeftMemory(context);
				if (!isBlocked) {
					//we weren't blocked before so modify
					this.propagateModify(this.__cloneContext(context));
				} else {
					//we were blocked before but aren't now
					this.propagateAssert(this.__cloneContext(context));
				}
			}
		} else {
			throw new Error();
		}

	}

	modifyRight(context: Context) {
		const ctx = this.removeFromRightMemory(context);
		if (ctx) {
			const rightContext = ctx.data;
			const leftTuples = this.leftTuples.getLeftMemory(context).slice();
			const leftTuplesLength = leftTuples.length;
			const thisConstraint = this.constraint;
			const blocking = rightContext.blocking;
			this.__addToRightMemory(context);
			context.blocking = new LinkedList<Context>();
			//check old blocked contexts
			//check if the same contexts blocked before are still blocked
			let blockingNode = { next: blocking.head } as ILinkNode<Context>;
			while ((blockingNode = blockingNode.next)) {
				const leftContext = blockingNode.data;
				leftContext.blocker = null;
				if (thisConstraint.isMatch(leftContext, context)) {
					leftContext.blocker = context;
					this.addToLeftBlockedMemory(context.blocking.push(leftContext));
				} else {
					//we arent blocked anymore
					leftContext.blocker = null;
					let node = ctx;
					while ((node = node.next)) {
						const rc = node.data;
						if (thisConstraint.isMatch(leftContext, rc)) {
							leftContext.blocker = rc;
							this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
							break;
						}
					}
					if (leftContext) {
						this.__addToLeftMemory(leftContext);
						this.propagateAssert(this.__cloneContext(leftContext));
					}
				}
			}
			if (leftTuplesLength) {
				//check currently left tuples in memory
				leftTuples.forEach((leftTuple) => {
					const leftContext = leftTuple.data;
					if (thisConstraint.isMatch(leftContext, context)) {
						this.propagateRetract(this.__cloneContext(leftContext));
						this.removeFromLeftMemory(leftContext);
						this.addToLeftBlockedMemory(context.blocking.push(leftContext));
						leftContext.blocker = context;
					}
				});
			}
		} else {
			throw new Error();
		}
	}
}