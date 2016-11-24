import {compile as __compile} from './compile/index';
import parse from './parser/parser';
import uuid from 'lodash-ts/uuid';
import isString from 'lodash-ts/isString';
import {ICompileOptions} from './interfaces';
import FlowContainer from './flow-container';

export function compile(src: string, options: ICompileOptions) {
	if (!isString(src)) {
		return null;
	}
	options.name = options.name || uuid();
	const context = parse(src);
	if (!options.name) {
		throw new Error("Name required when compiling nools source");
	}
	return __compile(context, options);
}

export default compile;
