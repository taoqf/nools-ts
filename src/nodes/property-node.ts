import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { IAlphaNode, create as create_alpha } from './alpha-node';
import { INode, propagate_assert, propagate_modify, propagate_retract } from './node';
import { IConstraint } from '../constraint';

export interface IPropertyNode extends IAlphaNode {
	alias: string;
	constiables: any;
}

export function create(constraint: IConstraint): IPropertyNode {
	return mixin(create_alpha('property', constraint), {
		alias: constraint.alias,
		constiables: constraint.constraint
	})
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IPropertyNode;
	const c = new Context(context.fact, context.paths);
	const constiables = node.constiables, o = context.fact.object;
	c.set(node.alias, o);
	for (const key in constiables) {
		const val = constiables[key];
		c.set(val, o[key]);
	}
	propagate_assert(nodes, n, c);
}

export function modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IPropertyNode;
	const c = new Context(context.fact, context.paths);
	const constiables = node.constiables, o = context.fact.object;
	c.set(node.alias, o);
	for (const key in constiables) {
		const val = constiables[key];
		c.set(val, o[key]);
	}
	propagate_modify(nodes, n, c);
}

export function retract(nodes: INode[], n: number, context: Context) {
	propagate_retract(nodes, n, new Context(context.fact, context.paths));
}
