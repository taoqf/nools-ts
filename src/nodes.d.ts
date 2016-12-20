import { IConstraint } from './constraint';
import Context, { Match } from './context';
import { IPattern, IObjectPattern, IFromPattern } from './pattern';
import { IRule } from './interfaces';
import {IMemory} from './nodes/misc/memory';
import { ITuple } from './nodes/misc/tuple-entry';
import { IJoinReferenceNode } from './nodes/join-reference-node';
import Fact from './facts/fact';
import { ILinkNode } from './linked-list';
import AgendaTree from './agenda';

export type notNodeType = 'not' | 'exists';
export type joinNodeType = 'join' | 'from' | 'from-not' | 'exists-from' | notNodeType;
export type betaNodeType = 'beta' | joinNodeType;
export type adapterNodeType = 'leftadapter' | 'rightadapter';
export type alphaNodeType = 'type' | 'alias' | 'equality' | 'property';
export type nodeType = 'terminal' | 'join-reference' | alphaNodeType | adapterNodeType | betaNodeType;

export interface INode {
	type: nodeType;
	ps: number[];
	id: number;
	ns?: [number, number][];
	nodes?: Map<number, IPattern[]>;
	root?: IRootNode;
}

export interface IAdapterNode extends INode {
}

export interface IAlphaNode extends INode {
	constraint: IConstraint;
	constraintAssert(it: any, fh?: any): boolean;
	equal(constraint: IAlphaNode): boolean;
}

export interface IAliasNode extends INode {
	constraint: IObjectPattern;
	// constraintAssert(it: any, fh?: any): boolean;
	equal(constraint: IAliasNode): boolean;
	alias: string;
}

export interface ITypeNode extends IAlphaNode {
}

export interface IEqualityNode extends IAlphaNode {
	memory: Map<string, boolean>;
}

export interface IPropertyNode extends IAlphaNode {
	alias: string;
	constiables: any;
}

export interface IBetaNode extends INode {
	leftMemory: { [hasCode: string]: ITuple };
	rightMemory: { [hasCode: string]: ITuple };
	leftTuples: IMemory;
	rightTuples: IMemory;
}

export interface IJoinNode extends IBetaNode {
	constraint?: IJoinReferenceNode;
}

export interface IFromNode extends IJoinNode {
	pattern: IFromPattern;
	alias: string;
	type_assert: (type: any) => boolean;
	from_assert: (fact: any, fh?: any) => any;
	constraints: IConstraint[];
	fromMemory: { [id: number]: { [hashCode: string]: [Context, Context] }; };
	__equalityConstraints: { (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>): boolean; }[];
	__variables: any[];
}

export interface IFromNotNode extends IJoinNode {
	pattern: IFromPattern;
	alias: string;
	type_assert: (type: any) => boolean;
	from_assert: (fact: any, fh?: any) => any;
	constraints: IConstraint[];
	fromMemory: { [id: number]: { [hashCode: string]: Context }; };
	__equalityConstraints: { (factHanle1: Map<string, Fact>, factHandle2?: Map<string, Fact>): boolean; }[];
	__variables: any[];
}

export interface IExistsFromNode extends IFromNotNode {

}

export interface INotNode extends IJoinNode {
	leftTupleMemory: { [hashCode: string]: ILinkNode<Context> };
	notMatch: Match;
}

export interface IExistsNode extends INotNode {
}

export interface ITerminalNode extends INode {
	index: number;
	name: string;
	bucket: IBucket;
	rule: IRule;
	agenda?: AgendaTree;
}
export interface IBucket {
	counter: number;
	recency: number;
}

export interface IRootNode {
	nodes: INode[];
	patterns: IPattern[];
	terminalNodes: number[];
	joinNodes: number[];
	alphaNodes: number[];
	typeNodes: number[];
	bucket?: IBucket;
}
