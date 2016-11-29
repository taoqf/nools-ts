import AlphaNode from './alpha-node';
import Context from '../context';
import { IHashConstraint } from '../constraint';

export default class PropertyNode extends AlphaNode {
	protected alias: string;
	protected constiables: any;
	constructor(constraint: IHashConstraint) {
		super(constraint);
		this.constiables = constraint.constraint;
		this.alias = constraint.alias;
	}

	assert(context: Context) {
		const c = new Context(context.fact, context.paths);
		const constiables = this.constiables, o = context.fact.object;
		c.set(this.alias, o);
		for (const key in constiables) {
			const val = constiables[key];
			c.set(val, o[key]);
		}
		this.propagateAssert(c);
	}

	retract(context: Context) {
		this.propagateRetract(new Context(context.fact, context.paths));
	}

	modify(context: Context) {
		const c = new Context(context.fact, context.paths);
		const constiables = this.constiables, o = context.fact.object;
		c.set(this.alias, o);
		for (const key in constiables) {
			const val = constiables[key];
			c.set(val, o[key]);
		}
		this.propagateModify(c);
	}


	toString() {
		return "PropertyNode" + this.__count;
	}
}