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

export enum nodeType{
	// notNodeType = 'not' | 'exists';
	not,
	exists,
	// joinNodeType = 'join' | 'from' | 'from-not' | 'exists-from' | notNodeType
	join,
	from,
	from_not,
	exists_from,
	// betaNodeType = 'beta' | joinNodeType
	beta,
	// adapterNodeType = 'leftadapter' | 'rightadapter'
	leftadapter,
	rightadapter,
	// alphaNodeType = 'type' | 'alias' | 'equality' | 'property'
	type,
	alias,
	equality,
	property,
	// nodeType = 'terminal' | 'join-reference' | alphaNodeType | adapterNodeType | betaNodeType
	terminal,
	join_reference
}

export interface INode {
	tp: nodeType;
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
	c: number;
	ca(it: any, fh?: any): boolean;
	eq(constraint: IAlphaNode): boolean;
}

export interface IAliasNode extends INode {
	constraint: IObjectPattern;
	p: number;
	// constraintAssert(it: any, fh?: any): boolean;
	eq(constraint: IAliasNode): boolean;
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
	p: number;
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
	p: number;
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
	i: number;
	n: string;
	b: IBucket;
	r: IRule;
	agenda?: AgendaTree;
}
export interface IBucket {
	counter: number;
	recency: number;
}

export interface IRootNode {
	ns: INode[];
	ps: IPattern[];
	ts: number[];
	js: number[];
	as: number[];
	tps: number[];
	cs: IConstraint[];
	bucket?: IBucket;
}
