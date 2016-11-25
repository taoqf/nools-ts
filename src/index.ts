import { compile as __compile } from './compile/index';
import parse from './parser/parser';
import uuid from 'lodash-ts/uuid';
import isString from 'lodash-ts/isString';
import { ICompileOptions, IContext } from './interfaces';
import FlowContainer from './flow-container';
import tokens from './parser/tokens';

export function compile(src: string, options: ICompileOptions) {
	if (!isString(src)) {
		return null;
	}
	options.name = options.name || uuid();
	const context = { define: [], rules: [], scope: [] } as IContext;
	parse(src, tokens, context);
	return __compile(context, options);
}

export default compile;
