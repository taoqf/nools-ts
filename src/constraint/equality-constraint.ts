import Constraint from './constraint';
import {IPatternOptions, ICondition} from '../interfaces';
import {getMatcher} from '../constraint-matcher';

export default class EqualityConstraint extends Constraint {
	type = "equality";
	pattern: string = null;
	_matcher: (it: any) => any = null;

	constructor(constraint: ICondition, options = {} as IPatternOptions) {
		super(constraint, options);
		this.pattern = options.pattern;
		this._matcher = getMatcher(constraint, options, true);
	}

	assert(it: any) {
		return this._matcher(it);
	}
}