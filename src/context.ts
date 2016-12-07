import isBoolean from 'lodash-ts/isBoolean';
import Fact from './facts/fact';
import LinkedList from './linked-list';
import { ITerminalNode } from './nodes';
import { IPattern } from './pattern';

function createContextHash(paths: IPattern[], hashCode: string) {
	return paths.map((path) => {
		return path.id;
	}).reduce((previousValue, currentValue) => {
		return `${previousValue}${currentValue}:`;
	}, "") + hashCode;
}

function merge<T>(h1: Map<string, T>, h2: Map<string, T>, aliases: string[]) {
	aliases.forEach((alias) => {
		h1.set(alias, h2.get(alias));
	});
}

function unionRecency(arr: number[], arr1: number[], arr2: number[]) {
	arr.push(...arr1);
	arr2.forEach((val) => {
		if (arr.indexOf(val) === -1) {
			arr.push(val);
		}
	});
}

export class Match {
	isMatch = true;
	hashCode = "";
	facts: Fact[] = [];
	factIds: number[] = [];
	factHash = new Map<string, Fact>();
	recency: number[] = [];
	aliases: string[] = [];

	addFact(assertable: Fact) {
		this.facts.push(assertable);
		this.recency.push(assertable.recency);
		this.factIds.push(assertable.id);
		this.hashCode = this.factIds.join(":");
		return this;
	}

	merge(mr: Match) {
		const ret = new Match();
		ret.isMatch = mr.isMatch;
		ret.facts.push(...this.facts);
		ret.facts.push(...mr.facts);
		ret.aliases.push(...this.aliases);
		ret.aliases.push(...mr.aliases);
		ret.hashCode = this.hashCode + ":" + mr.hashCode;
		merge(ret.factHash, this.factHash, this.aliases);
		merge(ret.factHash, mr.factHash, mr.aliases);
		unionRecency(ret.recency, this.recency, mr.recency);
		return ret;
	}
}

export default class Context {
	match: Match = null;
	factHash: Map<string, any> = null;
	aliases: string[] = null;
	fact: Fact = null;
	hashCode: string = null;
	paths: IPattern[] = null;
	pathsHash: string = null;
	rightMatches: { [id: string]: Context };
	leftMatches: { [id: string]: Context };
	blocker: Context;
	blocking: LinkedList<Context>;
	fromMatches: { [id: number]: Context } = {};
	blocked = false;
	rule: ITerminalNode;

	constructor(fact: Fact, paths?: IPattern[], mr?: Match) {
		this.fact = fact;
		if (mr) {
			this.match = mr;
		} else {
			this.match = new Match().addFact(fact);
		}
		this.factHash = this.match.factHash;
		this.aliases = this.match.aliases;
		this.hashCode = this.match.hashCode;
		if (paths) {
			this.paths = paths;
			this.pathsHash = createContextHash(paths, this.hashCode);
		} else {
			this.pathsHash = this.hashCode;
		}
	}

	set(key: string, value: any) {
		this.factHash.set(key, value);
		this.aliases.push(key);
		return this;
	}

	isMatch(isMatch?: boolean): boolean | this {
		if (isBoolean(isMatch)) {
			this.match.isMatch = isMatch;
		} else {
			return this.match.isMatch;
		}
		return this;
	}

	mergeMatch(merge: Match) {
		const match = this.match = this.match.merge(merge);
		this.factHash = match.factHash;
		this.hashCode = match.hashCode;
		this.aliases = match.aliases;
		return this;
	}

	clone(fact?: Fact, paths?: IPattern[], match?: Match) {
		// return new Context(fact || this.fact, paths || this.paths, match || this.match);
		return new Context(fact || this.fact, paths, match || this.match);
	}
}
