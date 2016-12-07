import isString from 'lodash-ts/isString';
import uuid from 'lodash-ts/uuid';
import { IContext, ICompileOptions, IFlow } from '../interfaces';
import compile from './compile';
import FlowContainer from '../flow-container';
import tokens from './parser/tokens';
import parse from './parser/parse';
import create_root_node, { assertRule} from './nodes';

export default function parse_rules(src: string, options: ICompileOptions): IFlow {
	if (!isString(src)) {
		return null;
	}
	const context = { define: [], rules: [], scope: [] } as IContext;
	parse(src, tokens, context);
	const root = create_root_node();
	const rules = compile(context, options);
	rules.forEach((rule)=>{
		assertRule(root, rule);
	});
	return {
		name: uuid(),
		root: root
	};
}
