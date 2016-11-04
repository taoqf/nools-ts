import isEqual from 'lodash-ts/isEqual';
import instanceOf from 'lodash-ts/isinstanceof';
import {IPatternOptions} from '../interfaces';

// export interface IOptions {
// 	pattern?: string;
// 	alias?: string;
// 	scope?: any;
// }

let id = 0;

export default class Constraint {
	protected id = id++;
	protected type: string = null;
	protected constraint: any = null;
	protected options: IPatternOptions = null;
	protected alias: string = null;
	protected vars: any = null;

	constructor(constraint: any, options = {} as IPatternOptions) {
		this.constraint = constraint;
		this.options = options;
		// extd.bindAll(this, ["assert"]);
	}
	get_constraint(){
		return this.constraint;
	}
	assert(it: any, fh?: any): boolean {
		throw new Error("not implemented");
	}
	getIndexableProperties(): string[] {
		return [];
	}

	equal(constraint: Constraint) {
		return instanceOf(constraint, Constraint) && this.get_alias() === constraint.get_alias() && isEqual(this.constraint, constraint.constraint);
	}

	get_alias(): string {
		return this.alias;
	}

	set_alias(alias: string) {
		this.alias = alias;
	}

	// get('varibles') hash
	get_vars(): any {
		return this.get_alias();
	}
}
