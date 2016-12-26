import { INode, ITerminalNode, IBucket } from '../nodes';
import { IRule } from '../interfaces';
import AgendaTree from '../agenda';
import Context from '../context';

export function assert(nodes: INode[], n: number, context: Context) {
	const node = nodes[n] as ITerminalNode;
	const match = context.match;
	if (match.isMatch) {
		const rule = node.r, bucket = node.b;
		node.agenda.insert(node, {
			rule: rule,
			hashCode: context.hashCode,
			index: node.i,
			name: rule.n,
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
