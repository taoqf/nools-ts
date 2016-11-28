export interface ICompileOptions {
	name?: string;
	define?: Map<string, any>;
	scope?: Map<string, any>;
}

export interface ICondition extends Array<any> {
	scope?: Map<string, any>;
	from?: any;
	[0]: string | ICondition;
	[1]: string | ICondition;	// always be null ???
	[2]: string;
	[3]?: any;
	[4]?: {
		from: string;
	};
}

export interface IOrConstraint extends Array<string | ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint> {
	[0]: 'or';
}

export interface ISimpleConstraint extends Array<string> {
	[0]: string;	// String
	[1]: string;	// s1
}

export interface INomalConstraint extends Array<string> {
	[0]: string;	// String
	[1]: string;	// s1
	[2]: string;	// s1 == 'hello'
}

export interface INotConstraint extends Array<string> {
	[0]: 'not';		// not
	[1]: string;	// String
	[2]: string;	// s1
	[3]: string;	// s1 == 'hello'
}

export interface IFromstraint extends Array<string> {
	[0]: string;	// Address					// String		// Number
	[1]: string;	// a						// name			// n
	[2]: string;	// a.zipcode == 88847		//				//
	[3]: string;	// from p.address			// get_name()	// [1, 2, 3]
}

export interface IRuleContextOptions {
	priority?: number;
	agendaGroup?: string;
	autoFocus?: boolean;
	scope?: Map<string, any>;
}

export interface IRuleContext {
	action: string;
	constraints: (ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint)[];
	name: string;
	options: IRuleContextOptions;
}

export interface IContext {
	rules: IRuleContext[];
	// loaded: string[];
	define: {
		name: string;
		properties: string;
	}[];
	scope: {
		name: string;
		body: string;
	}[];
}

export interface IPatternOptions {
	scope: Map<string, any>;
	pattern: string;
	alias?: string;
}

import Rule from './rule';
import { Match } from './context';

export interface IInsert {
	rule: Rule;
	hashCode: string;
	index: number;
	name: string;
	recency: number;
	match: Match;
	counter: number;
}

export interface IBucket {
	counter: number;
	recency: number;
}

import { enumPatternType } from './pattern';

export interface IPattern {
	id: number;
	type: enumPatternType;
}

import Constraint from './constraint/constraint';

export interface IObjectPattern extends IPattern {
	id: number;
	class_type: any;
	alias: string;
	pattern: string;
	constraints: Constraint[];
}
import FromConstraint from './constraint/from-constraint';

export interface IFromPattern extends IObjectPattern {
	from: FromConstraint;
}

export interface IExistsPattern extends IObjectPattern {
}

export interface IFromExistsPattern extends IFromPattern {
}

export interface IFromNotPattern extends IFromPattern {
}

export interface INotPattern extends IObjectPattern {
}

export interface IInitialFactPattern extends IObjectPattern {
}

export interface ICompositePattern extends IPattern {
	id: number;
	leftPattern: IPattern;
	rightPattern: IPattern;
}
