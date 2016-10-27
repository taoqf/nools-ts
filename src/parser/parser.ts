import {IRuleContext, IContext} from '../interfaces';
import {findNextTokenIndex} from './util';
import tokens from './tokens';

export function parse(src: string, keywords: Map<string, (orig: string, context: IContext | IRuleContext) => string>, context: IContext | IRuleContext) {
	const orig = src;
	src = src.replace(/\/\/(.*)/g, "").replace(/\n|\r|\r\n/g, " ");	// 去掉注释，换行
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

export default function (src: string) {
	const context = { define: [], rules: [], scope: [] } as IContext;
	parse(src, tokens, context);
	return context;
}