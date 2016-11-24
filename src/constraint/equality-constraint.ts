import Constraint from './constraint';
import { IPatternOptions, ICondition } from '../interfaces';
import { getMatcher } from '../constraint-matcher';
import Fact from '../facts/fact';

export default class EqualityConstraint extends Constraint {
	type = "equality";
	pattern: string = null;
	_matcher: (factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) => any = null;

	constructor(constraint: ICondition, options = {} as IPatternOptions) {
		super(constraint, options);
		this.pattern = options.pattern;
		this._matcher = getMatcher(constraint, options, true);
	}

	assert(factHanle1: Map<string, Fact>, factHandle2: Map<string, Fact>) {
		return this._matcher(factHanle1, factHandle2);
	}
}