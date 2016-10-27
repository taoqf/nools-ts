import BetaNode from './beta-node';
import JoinReferenceNode from './join-reference-node';
import Context from '../context';

export default class JoinNode extends BetaNode {
	nodeType = "JoinNode";
	constraint = new JoinReferenceNode(this.leftTuples, this.rightTuples);
	propagateFromLeft(context: Context, rm: Context) {
		const mr = this.constraint.match(context, rm);
		if (mr.isMatch) {
			this.propagateAssert(this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
		}
		// return this;
	}

	propagateFromRight(context: Context, lm: Context) {
		const mr = this.constraint.match(lm, context);
		if (mr.isMatch) {
			this.propagateAssert(this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
		}
		// return this;
	}

	propagateAssertModifyFromLeft(context: Context, rightMatches: { [factid: string]: Context }, rm: Context) {
		const factId = rm.hashCode;
		if (factId in rightMatches) {
			const mr = this.constraint.match(context, rm);
			const mrIsMatch = mr.isMatch;
			if (!mrIsMatch) {
				this.propagateRetract(rightMatches[factId].clone());
			} else {
				this.propagateModify(this.__addToMemoryMatches(rm, context, context.clone(null, null, mr)));
			}
		} else {
			this.propagateFromLeft(context, rm);
		}
	}

	propagateAssertModifyFromRight(context: Context, leftMatches: { [factid: string]: Context }, lm: Context) {
		const factId = lm.hashCode;
		if (factId in leftMatches) {
			const mr = this.constraint.match(lm, context);
			const mrIsMatch = mr.isMatch;
			if (!mrIsMatch) {
				this.propagateRetract(leftMatches[factId].clone());
			} else {
				this.propagateModify(this.__addToMemoryMatches(context, lm, context.clone(null, null, mr)));
			}
		} else {
			this.propagateFromRight(context, lm);
		}
	}
}