import { IFromConstraint } from '../constraint';
import cst from './constraint';
import { IObjectPattern, PatternType, IFromPattern } from '../pattern';
const funcs = new Map<PatternType, (constraint: IObjectPattern, defines: Map<string, any>) => IObjectPattern>();

function obj(pattern: IObjectPattern, defines: Map<string, any>) {
	pattern.class_type = defines.get(pattern.cls);
	pattern.constraints = pattern.constraints.map((constraint) => {
		return cst(constraint, defines);
	});
	return pattern;
}
funcs.set('object', obj);
funcs.set('initial_fact', obj);
funcs.set('not', obj);
funcs.set('exists', obj);

function from(pattern: IFromPattern, defines: Map<string, any>) {
	pattern = obj(pattern, defines) as IFromPattern;
	pattern.from = cst(pattern.from, defines) as IFromConstraint;
	return pattern;
}
funcs.set('from', from);
funcs.set('from_exists', from);
funcs.set('from_not', from);

export default function pt(pattern: IObjectPattern, defines: Map<string, any>) {
	const fun = funcs.get(pattern.type);
	return fun(pattern, defines);
}
