import keys from 'lodash-ts/keys';

import { IRule as IBaseRule } from '../compile/rule';
import Flow from '../flow';
import { Match } from '../context';
import { IPattern } from '../pattern';

export interface IRule extends IBaseRule {
	fire(flow: Flow, match: Match): Promise<{}>;
}

function parseAction(action: string, defined: Map<string, any>, scope: Map<string, any>) {
	const params = ["facts", 'flow'];
	if (/next\(.*\)/.test(action)) {
		params.push("next");
	}
	try {
		return new Function("defined, scope", "return " + new Function(params.join(","), action).toString())(defined, scope);
	} catch (e) {
		throw new Error("Invalid action : " + action + "\n" + e.message);
	}
}

export default function (rules: IBaseRule[], defined: Map<string, any>, scope: Map<string, any>): IRule[] {
	return rules.map((rule) => {
		const cb = parseAction(rule.action, defined, scope);
		delete rule.action;
		const nrule = rule as IRule;
		nrule.fire = (flow: Flow, match: Match) => {
			return new Promise((resolve) => {
				resolve(cb.call(flow, match.factHash, flow));
			});
		}
		return nrule;
	});
}
