import parse from './compile/index';
// import { parse_rules } from './compile/index';
import FlowContainer from './flow-container';

import runtime_compile from './runtime/compile';

import { ICompileOptions } from './interfaces';

export function compile(src: string, options: ICompileOptions) {
	const root = parse(src, options);
	// console.log('----------------------------------');
	// console.info(JSON.stringify(flow));
	// console.log('++++++++++++++++++++++++++++++++++');
	return runtime_compile(root, options);
}

export default compile;
