import { INode, ITypeNode } from '../nodes';
import { base_assert, base_retract, base_modify, base_dispose } from './node';
import { IConstraint } from '../constraint';
import { create as alpha_create } from './alpha-node';
import Context from '../context';
import Fact from '../facts/fact';
import WorkingMemory from '../working-memory';

export function create(constraint: IConstraint): ITypeNode {
	return alpha_create('type', constraint);
}

export function assert(nodes: INode[], n: number, fact: Fact, wm: WorkingMemory) {
	const node = nodes[n] as ITypeNode;
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_assert(nodes, outNode, new Context(fact, paths), wm);
		}
	}
}

export function modify(nodes: INode[], n: number, fact: Fact, wm: WorkingMemory) {
	const node = nodes[n] as ITypeNode;
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_modify(nodes, outNode, new Context(fact, paths), wm);
		}
	}
}

export function retract(nodes: INode[], n: number, fact: Fact, wm: WorkingMemory) {
	const node = nodes[n] as ITypeNode;
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_retract(nodes, outNode, new Context(fact, paths), wm);
		}
	}
}

export function dispose(nodes: INode[], n: number, context?: Context) {
	const node = nodes[n] as ITypeNode;
	for (const [outNode, paths] of node.nodes.entries()) {
		base_dispose(nodes, outNode, { paths: paths } as any as Context);
	}
}
