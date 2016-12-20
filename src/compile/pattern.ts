import { IFromConstraint } from '../constraint';
import cst from './constraint';
import { IPattern, IObjectPattern, patternType, IFromPattern } from '../pattern';
const funcs = new Map<patternType, (constraint: IObjectPattern) => IObjectPattern>();

function obj(pattern: IObjectPattern) {
	delete pattern.class_type;
	pattern.constraints = pattern.constraints.map(cst);
	delete pattern.pattern;
	// delete pattern.constraints;
	return pattern;
}
funcs.set(patternType.object, obj);
funcs.set(patternType.initial_fact, obj);
funcs.set(patternType.not, obj);
funcs.set(patternType.exists, obj);

function from(pattern: IFromPattern) {
	pattern = obj(pattern) as IFromPattern;
	pattern.from = cst(pattern.from) as IFromConstraint;
	return pattern;
}
funcs.set(patternType.from, from);
funcs.set(patternType.from_exists, from);
funcs.set(patternType.from_not, from);
export default function pt(pattern: IObjectPattern) {
	const fun = funcs.get(pattern.type);
	return fun(pattern);
}
