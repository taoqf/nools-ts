import { IRootNode, ITerminalNode } from '../nodes';
import AgendaTree from '../agenda';

export default function build(root: IRootNode, agenda: AgendaTree) {
	root.terminalNodes.forEach((tn)=>{
		const terminal_node = root.nodes[tn] as ITerminalNode;
		terminal_node.agenda = agenda;
		agenda.register(terminal_node);
	});
}
