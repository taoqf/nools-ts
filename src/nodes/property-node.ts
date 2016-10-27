import AlphaNode from './alpha-node';
import Context from '../context';
import Constraint from '../constraint/constraint';
import toArray from 'lodash-ts/toArray';

export default class PropertyNode extends AlphaNode {
	protected alias: string;
	protected constiables: any;
	constructor(constraint: Constraint) {
		super(constraint);
		this.alias = this.constraint.get_alias();
		this.constiables = this.constraint.get_vars();
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