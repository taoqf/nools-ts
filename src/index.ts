import * as compiler from './compile/index';
import parse from './parser/parser';
import uuid from 'lodash-ts/uuid';
import isString from 'lodash-ts/isString';
import {ICompileOptions} from './interfaces';
import FlowContainer from './flow-container';

export function compile(file: string, options: ICompileOptions) {
	if (!isString(file)) {
		return null;
	}
	options.name = options.name || uuid();
	const context = parse(file);
	if (!options.name) {
		throw new Error("Name required when compiling nools source");
	}
	return compiler.compile(context, options);
}
