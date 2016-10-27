import NotNode from './not-node';
import LinkedList from '../linked-list';
import Context from '../context';
import {ITuple} from './misc/tuple-entry';

export default class ExistsNode extends NotNode {

	nodeType = "ExistsNode";

	blockedContext(leftContext: Context, rightContext: Context) {
		leftContext.blocker = rightContext;
		this.removeFromLeftMemory(leftContext);
		this.addToLeftBlockedMemory(rightContext.blocking.push(leftContext));
		this.propagateAssert(this.__cloneContext(leftContext));
	}

	notBlockedContext(leftContext: Context, propagate: boolean) {
		this.__addToLeftMemory(leftContext);
		propagate && this.propagateRetract(this.__cloneContext(leftContext));
	}

	propagateFromLeft(leftContext: Context) {
		this.notBlockedContext(leftContext, false);
	}


	retractLeft(context: Context) {
		if (!this.removeFromLeftMemory(context)) {
			const ctx = this.removeFromLeftBlockedMemory(context);
			if (ctx) {
				this.propagateRetract(this.__cloneContext(ctx.data));
			} else {
				throw new Error();
			}
		}
	}

	modifyLeft(context: Context) {
		const thisConstraint = this.constraint;
		const rightTuples = this.rightTuples;
		let isBlocked = false;
		const tuple = this.removeFromLeftMemory(context);
		let leftContext: Context;
		if (!tuple) {
			//blocked before
			const tuple = this.removeFromLeftBlockedMemory(context);
			isBlocked = true;
			leftContext = tuple && tuple.data;
		} else {
			leftContext = tuple.data;
		}
		if (leftContext) {
			let blocker: ITuple;
			if (leftContext && leftContext.blocker) {
				//we were blocked before so only check nodes previous to our blocker
				blocker = this.rightMemory[leftContext.blocker.hashCode];
			}
			// let node: ITuple;
			if (blocker) {
				const rc = blocker.data;
				if (thisConstraint.isMatch(context, rc)) {
					//propogate as a modify or assert
					!isBlocked ? this.propagateAssert(this.__cloneContext(leftContext)) : this.propagateModify(this.__cloneContext(leftContext));
					context.blocker = rc;
					this.addToLeftBlockedMemory(rc.blocking.push(context));
					context = null;
				}
				// if (context) {
				// 	node = { next: blocker.next } as ITuple;
				// }
				// } else {
				// 	node = { next: rightTuples.head } as ITuple;
			}
			if (context && rightTuples.length) {
				let node = { next: rightTuples.head } as ITuple;
				//we were propagated before
				while ((node = node.next)) {
					const rc = node.data;
					if (thisConstraint.isMatch(context, rc)) {
						//we cant be proagated so retract previous

						//we were asserted before so retract
						!isBlocked ? this.propagateAssert(this.__cloneContext(leftContext)) : this.propagateModify(this.__cloneContext(leftContext));

						this.addToLeftBlockedMemory(rc.blocking.push(context));
						context.blocker = rc;
						context = null;
						break;
					}
				}
			}
			if (context) {
				//we can still be propogated
				this.__addToLeftMemory(context);
				if (isBlocked) {
					//we were blocked so retract
					this.propagateRetract(this.__cloneContext(context));
				}

			}
		} else {
			throw new Error();
		}
	}

	modifyRight(context: Context) {
		const tuple = this.removeFromRightMemory(context);
		if (tuple) {
			const rightContext = tuple.data;
			const thisConstraint = this.constraint;
			const leftTuples = this.leftTuples;
			const leftTuplesLength = leftTuples.length;
			const blocking = rightContext.blocking;
			// const leftContext;
			// const node;
			this.__addToRightMemory(context);
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
							this.addToLeftBlockedMemory(context.blocking.push(leftContext));
							this.propagateAssert(this.__cloneContext(leftContext));
							leftContext = null;
						} else {
							//we arent blocked anymore
							leftContext.blocker = null;
							let node = tuple;
							while ((node = node.next)) {
								const rc = node.data;
								if (thisConstraint.isMatch(leftContext, rc)) {
									leftContext.blocker = rc;
									this.addToLeftBlockedMemory(rc.blocking.push(leftContext));
									this.propagateAssert(this.__cloneContext(leftContext));
									leftContext = null;
									break;
								}
							}
							if (leftContext) {
								this.__addToLeftMemory(leftContext);
							}
						}
					}
				}

				if (leftTuplesLength) {
					//check currently left tuples in memory
					let node = { next: leftTuples.head } as ITuple;
					while ((node = node.next)) {
						const leftContext = node.data;
						if (thisConstraint.isMatch(leftContext, context)) {
							this.propagateAssert(this.__cloneContext(leftContext));
							this.removeFromLeftMemory(leftContext);
							this.addToLeftBlockedMemory(context.blocking.push(leftContext));
							leftContext.blocker = context;
						}
					}
				}
			}
		} else {
			throw new Error();
		}
	}
}