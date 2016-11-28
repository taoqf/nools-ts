import isString from 'lodash-ts/isString';
import uuid from 'lodash-ts/uuid';
import { IRuleContext, IContext, ICompileOptions } from '../interfaces';
import { findNextTokenIndex } from './util';
import { compile as __compile } from '../compile/index';
import tokens from './tokens';
import FlowContainer from '../flow-container';

export default function parse(src: string, keywords: Map<string, (orig: string, context: IContext | IRuleContext) => string>, context: IContext | IRuleContext) {
	const orig = src;
	src = src.replace(/\/\/(.*)/g, "").replace(/\r\n|\r|\n/g, " ");
	const keys: string[] = [];
	for (const key of keywords.keys()) {
		keys.push(key);
	}
	const blockTypes = new RegExp("^(" + keys.join("|") + ")");
	let index: number;
	// blockTypes = /**/|define|import|global|function|rule
	while (src && (index = findNextTokenIndex(src)) !== -1) {
		src = src.substr(index);
		const matchBlockType = src.match(blockTypes);
		if (matchBlockType !== null) {
			const blockType = matchBlockType[1];
			if (keywords.has(blockType)) {
				try {
					src = keywords.get(blockType)(src, context).replace(/^\s*|\s*$/g, "");
				} catch (e) {
					throw new Error("Invalid " + blockType + " definition \n" + e.message + "; \nstarting at : " + orig);
				}
			} else {
				throw new Error("Unknown token" + blockType);
			}
		} else {
			throw new Error("Error parsing " + src);
		}
	}
	return context;
}

export function parse_rules(src: string, options: ICompileOptions) {
	if (!isString(src)) {
		return null;
	}
	options.name = options.name || uuid();
	const context = { define: [], rules: [], scope: [] } as IContext;
	parse(src, tokens, context);
	return __compile(context, options);

}