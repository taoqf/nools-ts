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

export interface IOrConstraint extends Array<string | ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint> {
	[0]: 'or';
	[1]: ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint;
}

export interface ITrueConstraint extends Array<string> {
	[0]: 'true';	// true
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

export interface IConstraintContext {
	action: string;
	constraints: (ISimpleConstraint | INomalConstraint | INotConstraint | IFromstraint | IOrConstraint | ITrueConstraint)[];
	name: string;
	options: IRuleContextOptions;
}

export interface IContext {
	constraints: IConstraintContext[];
	// loaded: string[];
	file?: string;
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