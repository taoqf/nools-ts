import isBoolean from 'lodash-ts/isBoolean';
import isArray from 'lodash-ts/isArray';

import { IRuleContextOptions, ICondition, IRule } from '../interfaces';
import pattern, { IPattern, composite_pattern } from '../pattern';
import { IConstraint } from '../constraint';

function _create_rule(name: string, options: IRuleContextOptions, pattern: IPattern, action: string): IRule {
	let agendaGroup: string = null;
	let autoFocus = false;
	if (options.agendaGroup) {
		agendaGroup = options.agendaGroup;
		autoFocus = isBoolean(options.autoFocus) ? options.autoFocus : false;
	}
	return {
		n: name,
		pt: pattern,
		action: action,
		p: options.priority || options.salience || 0,
		g: agendaGroup,
		af: autoFocus
	};
}

export function createRule(name: string, options: IRuleContextOptions, conditions: ICondition[], cs: IConstraint[], cb: string) {
	let isRules = conditions.every((cond) => {
		return isArray(cond);
	});
	if (isRules && conditions.length === 1) {
		conditions = conditions[0];
		isRules = false;
	}
	let rules: IRule[] = [];
	const scope = options.scope || new Map<string, any>();
	(conditions as any).scope = scope;
	if (isRules) {
		const patterns: IPattern[][] = [];
		function _mergePatterns(patt: IPattern | IPattern[], i: number) {
			// [pattern], [pattern], ...  in arrays of length 1
			// we wish to build a single array in order of lhs progression
			if (isArray(patt)) {
				if ((patt as IPattern[]).length === 1) {
					patt = (patt as IPattern[])[0];
					i = 0;
				}
				else {
					throw new Error('invalid pattern structure');
				}
			}
			if (!patterns[i]) {
				patterns[i] = i === 0 ? [] : patterns[i - 1].slice();
				//remove dup
				if (i !== 0) {
					patterns[i].pop();
				}
				patterns[i].push(patt as IPattern);
			} else {
				patterns.forEach((p) => {
					p.push(patt as IPattern);
				});
			}
		}
		conditions.forEach((condition) => {
			condition.scope = scope;
			pattern(condition, cs).forEach(_mergePatterns);
		});
		rules = patterns.map((patterns) => {
			const compPat = patterns.filter((patt, idx) => {
				return idx > 0;
			}).reduce((compPat, patt) => {
				return composite_pattern(compPat, patt);
			}, patterns[0]);
			return _create_rule(name, options, compPat, cb);
		});
	} else {
		rules = pattern(conditions as any, cs).map((cond) => {
			return _create_rule(name, options, cond, cb);
		});
	}
	return rules;
}
