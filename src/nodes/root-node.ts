import WorkingMemory from '../working-memory';
import Fact from '../facts/fact';
import { IRootNode, ITerminalNode } from '../nodes';
import { base_assert, base_modify, base_dispose , base_retract } from './node';

export function assertFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_assert(root.nodes, typeNode, fact, wm);
	});
}

export function retractFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_retract(root.nodes, typeNode, fact, wm);
	});
}

export function modifyFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.typeNodes.forEach((typeNode) => {
		base_modify(root.nodes, typeNode, fact, wm);
	});
}

export function dispose(root: IRootNode) {
	root.typeNodes.forEach((typeNode) => {
		base_dispose(root.nodes, typeNode, undefined);
	});
}

export function containsRule(root: IRootNode, name: string) {
	return root.terminalNodes.some((id) => {
		const terminalNode = root.nodes[id] as ITerminalNode;
		return terminalNode.rule.name === name;
	});
}
