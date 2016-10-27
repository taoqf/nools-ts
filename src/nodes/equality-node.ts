import AlphaNode from './alpha-node';
import Context from '../context';

export default class EqualityNode extends AlphaNode{
	protected memory = new Map<string, boolean>();

	assert(context: Context) {
		const isMatch = this.constraintAssert(context.factHash);
		this.memory.set(context.pathsHash, isMatch);
		if (isMatch) {
			this.propagateAssert(context);
		}
	}

	modify(context: Context) {
		const hashCode = context.pathsHash;
		const memory = this.memory
		const wasMatch = memory.get(hashCode);
		const isMatch = this.constraintAssert(context.factHash);
		this.memory.set(context.pathsHash, isMatch);
		if (isMatch) {
			if (wasMatch) {
				this.propagateModify(context);
			} else {
				this.propagateAssert(context);
			}
		} else if (wasMatch) {
			this.propagateRetract(context);

		}
	}

	retract(context: Context) {
		const hashCode = context.pathsHash;
		const memory = this.memory;
		if (memory.get(hashCode)) {
			this.propagateRetract(context);
		}
		memory.delete(hashCode);
	}

	toString() {
		return "EqualityNode" + this.__count;
	}
}
