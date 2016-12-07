import mixin from 'lodash-ts/mixin';
import { INode, ITerminalNode, IBucket } from '../nodes';
import { create_node } from './node';
import { IRule } from '../runtime/rule';
import AgendaTree from '../agenda';
import Context from '../context';

export function create(name: string, rule: IRule, index: number, bucket: IBucket, agenda: AgendaTree): ITerminalNode {
	const node = mixin(create_node('terminal'), {
		index: index,
		rule: rule,
		name: name,
		bucket: bucket,
		agenda: agenda
	});
	return node;
}

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as ITerminalNode;
	const match = context.match;
	if (match.isMatch) {
		const rule = node.rule, bucket = node.bucket;
		node.agenda.insert(node, {
			rule: rule,
			hashCode: context.hashCode,
			index: node.index,
			name: rule.name,
			recency: bucket.recency++,
			match: match,
			counter: bucket.counter
		});
	}
}

export function modify(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as ITerminalNode;
	node.agenda.retract(node, context);
	assert(nodes, n, context);
}

export function retract(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as ITerminalNode;
	node.agenda.retract(node, context);
}
