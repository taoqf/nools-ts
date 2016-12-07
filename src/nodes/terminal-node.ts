import mixin from 'lodash-ts/mixin';
import { INode, create_node } from './node';
import { IRule } from '../runtime/rule';
import { IBucket } from './root-node';
import AgendaTree from '../agenda';
import Context from '../context';

export interface ITerminalNode extends INode {
	index: number;
	rule: IRule;
	name: string;
	bucket: IBucket;
	agenda: AgendaTree;
}

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
