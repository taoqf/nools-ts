import WorkingMemory from '../working-memory';
import Fact from '../facts/fact';
import { IRootNode, ITerminalNode } from '../nodes';
import { base_assert, base_modify, base_dispose , base_retract } from './node';

export function assertFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.tps.forEach((typeNode) => {
		base_assert(root.ns, typeNode, fact, wm);
	});
}

export function retractFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.tps.forEach((typeNode) => {
		base_retract(root.ns, typeNode, fact, wm);
	});
}

export function modifyFact(root: IRootNode, fact: Fact, wm: WorkingMemory) {
	root.tps.forEach((typeNode) => {
		base_modify(root.ns, typeNode, fact, wm);
	});
}

export function dispose(root: IRootNode) {
	root.tps.forEach((typeNode) => {
		base_dispose(root.ns, typeNode, undefined);
	});
}

export function containsRule(root: IRootNode, name: string) {
	return root.ts.some((id) => {
		const terminalNode = root.ns[id] as ITerminalNode;
		return terminalNode.r.n === name;
	});
}
