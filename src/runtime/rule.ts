import keys from 'lodash-ts/keys';

import { IRule } from '../interfaces';
import Flow from '../flow';
import { Match } from '../context';
import { IPattern } from '../pattern';

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

export default function (rule: IRule, defined: Map<string, any>, scope: Map<string, any>): IRule {
	const cb = parseAction(rule.action, defined, scope);
	return {
		name: rule.name,
		agendaGroup: rule.agendaGroup,
		priority: rule.priority,
		autoFocus: rule.autoFocus,
		pattern: rule.pattern,
		fire(flow: Flow, match: Match) {
			return new Promise((resolve) => {
				resolve(cb.call(flow, match.factHash, flow));
			})
		}
	};
}
