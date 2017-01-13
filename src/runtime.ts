import parse from './compile/index';
// import { parse_rules } from './compile/index';
import FlowContainer from './flow-container';

import runtime_compile from './runtime/compile';

import { ICompileOptions } from './interfaces';
import { IRootNode } from './nodes';

export function compile(root: IRootNode, options: ICompileOptions) {
	return runtime_compile(root, options);
}

export default compile;
