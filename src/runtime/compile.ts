import { IFlow, ICompileOptions, IContext } from '../interfaces';
import { to_map } from '../lang';
import { get_defines, createFunction } from '../compile';
import FlowContainer from '../flow-container';

export default function (data: IFlow, options: ICompileOptions) {
	const context = { define: [], rules: [], scope: [] } as IContext;
	const defines = get_defines(options.define);
	const scope = to_map(options.scope);
	const flow = new FlowContainer(data.root, options.name || data.name, defines, scope);
	//expose any defined classes to the flow.
	for (const [name, cls] of defines) {
		flow.addDefined(name, cls);
	}
	context.scope.forEach((s) => {
		scope.set(s.name, createFunction(s.body, defines, scope));
	});
	return flow;
}
