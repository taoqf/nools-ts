import { base_assert, base_retract, base_modify, base_dispose } from './node';
import { IConstraint } from '../constraint';
import { IAlphaNode, create as alpha_create } from './alpha-node';
import Context from '../context';
import Fact from '../facts/fact';

export interface ITypeNode extends IAlphaNode {
}

export function create(constraint: IConstraint): ITypeNode {
	return alpha_create('type', constraint);
}

export function assert(node: ITypeNode, fact: Fact) {
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_assert(outNode, new Context(fact, paths));
		}
	}
}

export function modify(node: ITypeNode, fact: Fact) {
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_modify(outNode, new Context(fact, paths));
		}
	}
}

export function retract(node: ITypeNode, fact: Fact) {
	if (node.constraintAssert(fact.object)) {
		for (const [outNode, paths] of node.nodes.entries()) {
			base_retract(outNode, new Context(fact, paths));
		}
	}
}

export function dispose(node: ITypeNode, context?: Context) {
	for (const [outNode, paths] of node.nodes.entries()) {
		base_dispose(outNode, { paths: paths } as any as Context);
	}
}
