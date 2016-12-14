import parse from './compile/index';
// import { parse_rules } from './compile/index';
import FlowContainer from './flow-container';

import runtime_compile from './runtime/compile';

import { IFlow, ICompileOptions } from './interfaces';

export function compile(flow: IFlow, options: ICompileOptions) {
	return runtime_compile(flow, options);
}

export default compile;
