import mixin from 'lodash-ts/mixin';
import { INode, create_node } from './node';
import { IRule } from '../rule';
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
	agenda.register(node);
	return node;
}

export function assert(node: ITerminalNode, context: Context) {
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

export function modify(node: ITerminalNode, context: Context) {
	node.agenda.retract(node, context);
	assert(node, context);
}

export function retract(node: ITerminalNode, context: Context) {
	node.agenda.retract(node, context);
}
