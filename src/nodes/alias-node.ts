import mixin from 'lodash-ts/mixin';
import Context from '../context';
import { propagate_assert, propagate_modify, propagate_retract } from './node';
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

export function assert(node: IAliasNode, context: Context) {
	return propagate_assert(node, context.set(node.alias, context.fact.object));
}

export function modify(node: IAliasNode, context: Context) {
	return propagate_modify(node, context.set(node.alias, context.fact.object));
}

export function retract(node: IAliasNode, context: Context) {
	return propagate_retract(node, context.set(node.alias, context.fact.object));
}
