import { IFromConstraint } from '../constraint';
import cst from './constraint';
import { IPattern, IObjectPattern, PatternType, IFromPattern } from '../pattern';
const funcs = new Map<PatternType, (pattern: IPattern, defines: Map<string, any>) => IObjectPattern>();

function obj(pattern: IObjectPattern, defines: Map<string, any>) {
	const class_type = defines.get(pattern.cls);
	const constraints = pattern.constraints.map((constraint) => {
		return cst(constraint, defines);
	});
	return {
		type: pattern.type,
		id: pattern.id,
		class_type: class_type,
		alias: pattern.alias,
		pattern: pattern.pattern,
		constraints: constraints
	};
}
funcs.set('object', obj);
funcs.set('initial_fact', obj);
funcs.set('not', obj);
funcs.set('exists', obj);

function from(pattern: IFromPattern, defines: Map<string, any>) {
	const from = pattern.from;
	pattern = obj(pattern, defines) as IFromPattern;
	pattern.from = cst(from, defines) as IFromConstraint;
	return pattern;
}
funcs.set('from', from);
funcs.set('from_exists', from);
funcs.set('from_not', from);

export default function pt(pattern: IPattern, defines: Map<string, any>) {
	const fun = funcs.get(pattern.type);
	return fun ? fun(pattern, defines) : pattern;
}