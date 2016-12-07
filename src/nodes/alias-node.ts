import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { INode, propagate_assert, propagate_modify, propagate_retract } from './node';
import { IAlphaNode, create as create_alpha } from './alpha-node';
import { IObjectPattern } from '../pattern';

export interface IAliasNode extends IAlphaNode {
	alias: string;
}

export function create(pattern: IObjectPattern): IAliasNode {
	const alias = pattern.alias;
	return mixin(create_alpha('alias', pattern as any), {
		alias: alias,
		equal(other: IAliasNode) {
			return other.type == 'alias' && alias === other.alias;
		}
	});
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAliasNode;
	return propagate_assert(nodes, n, context.set(node.alias, context.fact.object));
}

export function modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAliasNode;
	return propagate_modify(nodes, n, context.set(node.alias, context.fact.object));
}

export function retract(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as IAliasNode;
	return propagate_retract(nodes, n, context.set(node.alias, context.fact.object));
}
