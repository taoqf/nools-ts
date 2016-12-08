import { IObjectPattern } from '../pattern';
import { INode, IRootNode, ITerminalNode, IJoinNode } from '../nodes';
import AgendaTree from '../agenda';
import { addConstraint, create_join_reference_node } from '../nodes/join-reference-node';
import compile_rules from './rule';

function compile_sub_nodes(node: INode) {
	const nodes = node.nodes = new Map<number, IObjectPattern[]>();
	node.out_nodes.map(([outNode, pattern]) => {
		if (!nodes.has(outNode)) {
			nodes.set(outNode, []);
		}
		nodes.get(outNode).push(pattern);
	});
	return node;
}

export default function build(root: IRootNode, agenda: AgendaTree, defined: Map<string, any>, scope: Map<string, any>) {
	root.nodes.forEach((node) => {
		node = compile_sub_nodes(node);
		switch (node.type) {
			case 'terminal':
				((terminal_node) => {
					terminal_node.rule = compile_rules(terminal_node.rule, defined, scope);
					terminal_node.agenda = agenda;
					agenda.register(terminal_node);
				})(node as ITerminalNode)
				break;
			// case 'join':
			// case 'not':
			// case 'exists':
			// case 'from':
			// case 'from-not':
			// case 'exists-from':
			// ((node)=>{
			// 	node.constraint = create_join_reference_node(node.leftTuples, node.rightTuples);
			// })(node as IJoinNode)
			// break;
		}
	});
}
