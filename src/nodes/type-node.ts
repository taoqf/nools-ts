import AlphaNode from './alpha-node';
import Context from '../context';
import Fact from '../facts/fact';

export default class TypeNode extends AlphaNode {
	assert(fact: Fact) {
		if (this.constraintAssert(fact.object)) {
			this.propagateAssert(fact);
		}
	}

	modify(fact: Fact) {
		if (this.constraintAssert(fact.object)) {
			this.propagateModify(fact);
		}
	}

	retract(fact: Fact) {
		if (this.constraintAssert(fact.object)) {
			this.propagateRetract(fact);
		}
	}

	toString() {
		return "TypeNode" + this.__id;
	}

	dispose() {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.dispose({ paths: paths });
		}
	}

	propagateAssert(fact: Fact) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.assert(new Context(fact, paths));
		}
	}

	propagateRetract(fact: Fact) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.retract(new Context(fact, paths));
		}
	}

	propagateModify(fact: Fact) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.modify(new Context(fact, paths));
		}
	}
}