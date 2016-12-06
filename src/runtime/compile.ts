import { IContext, ICompileOptions } from '../interfaces';
import { to_map } from '../lang';
import { get_defines, createFunction } from '../compile';
import { IRule } from '../compile/rule';
import comile_rule from './rule';
import FlowContainer from '../flow-container';

export default function (rules: IRule[], options: ICompileOptions) {
	const context = { define: [], rules: [], scope: [] } as IContext;
	const defines = get_defines(options.define);
	const scope = to_map(options.scope);
	const flow = new FlowContainer(options.name);
	//expose any defined classes to the flow.
	for (const [name, cls] of defines) {
		flow.addDefined(name, cls);
	}

	context.scope.forEach((s) => {
		scope.set(s.name, createFunction(s.body, defines, scope));
	});
	flow.addRules(comile_rule(rules, defines, scope));
	return flow;
}
