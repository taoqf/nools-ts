import { IFromConstraint } from '../constraint';
import cst from './constraint';
import { IPattern, IObjectPattern, PatternType, IFromPattern } from '../pattern';
const funcs = new Map<PatternType, (constraint: IObjectPattern) => IObjectPattern>();

function obj(pattern: IObjectPattern) {
	delete pattern.class_type;
	// pattern.constraints = pattern.constraints.map(cst);
	delete pattern.pattern;
	delete pattern.constraints;
	return pattern;
}
funcs.set('object', obj);
funcs.set('initial_fact', obj);
funcs.set('not', obj);
funcs.set('exists', obj);

function from(pattern: IFromPattern) {
	pattern = obj(pattern) as IFromPattern;
	pattern.from = cst(pattern.from) as IFromConstraint;
	return pattern;
}
funcs.set('from', from);
funcs.set('from_exists', from);
funcs.set('from_not', from);
export default function pt(pattern: IObjectPattern) {
	const fun = funcs.get(pattern.type);
	return fun(pattern);
}
