import Node from './node';
import BetaNode from './beta-node';
import intersection from 'lodash-ts/intersection';
import Context from '../context';

export default class AdapterNode extends Node {
	protected __propagatePathsAssert(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				outNode.assert(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsAssertLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).assertLeft(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsAssertRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).assertRight(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsRetract(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				outNode.retract(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsRetractLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).retractLeft(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsRetractRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).retractRight(context.clone(null, continuingPaths, null));
			}
		}
	}

	// protected __propagatePathsRetractResolve(context: Context) {
	// 	for (const [outNode, paths] of this.nodes.entries()) {
	// 		const continuingPaths = intersection(paths, context.paths);
	// 		if (continuingPaths.length) {
	// 			(outNode as AdapterNode).retractResolve(context.clone(null, continuingPaths, null));
	// 		}
	// 	}
	// }

	protected __propagatePathsModifyLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).modifyLeft(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsModifyRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				(outNode as BetaNode).modifyRight(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagatePathsModify(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			const continuingPaths = intersection(paths, context.paths);
			if (continuingPaths.length) {
				outNode.modify(context.clone(null, continuingPaths, null));
			}
		}
	}

	protected __propagateNoPathsAssert(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.assert(context);
		}
	}

	protected __propagateNoPathsAssertLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).assertLeft(context);
		}
	}

	protected __propagateNoPathsAssertRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).assertRight(context);
		}
	}

	protected __propagateNoPathsRetract(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.retract(context);
		}
	}

	protected __propagateNoPathsRetractLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).retractLeft(context);
		}
	}

	protected __propagateNoPathsRetractRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).retractRight(context);
		}
	}

	protected __propagateNoPathsModify(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			outNode.modify(context);
		}
	}

	protected __propagateNoPathsModifyLeft(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).modifyLeft(context);
		}
	}

	protected __propagateNoPathsModifyRight(context: Context) {
		for (const [outNode, paths] of this.nodes.entries()) {
			(outNode as BetaNode).modifyRight(context);
		}
	}

	// protected __propagateNoPathsRetractResolve(context: Context) {
	// 	for (const [outNode, paths] of this.nodes.entries()) {
	// 		(outNode as AdapterNode).retractResolve(context);
	// 	}
	// }

	propagateAssert(context: Context) {
		if (context.paths) {
			this.__propagatePathsAssert(context);
		} else {
			this.__propagateNoPathsAssert(context);
		}
	}

	propagateAssertLeft(context: Context) {
		if (context.paths) {
			this.__propagatePathsAssertLeft(context);
		} else {
			this.__propagateNoPathsAssertLeft(context);
		}
	}

	propagateAssertRight(context: Context) {
		if (context.paths) {
			this.__propagatePathsAssertRight(context);
		} else {
			this.__propagateNoPathsAssertLeft(context);
		}
	}

	propagateRetract(context: Context) {
		if (context.paths) {
			this.__propagatePathsRetract(context);
		} else {
			this.__propagateNoPathsRetract(context);
		}
	}

	propagateRetractLeft(context: Context) {
		if (context.paths) {
			this.__propagatePathsRetractLeft(context);
		} else {
			this.__propagateNoPathsRetractLeft(context);
		}
	}

	propagateRetractRight(context: Context) {
		if (context.paths) {
			this.__propagatePathsRetractRight(context);
		} else {
			this.__propagateNoPathsRetractRight(context);
		}
	}

	propagateModify(context: Context) {
		if (context.paths) {
			this.__propagatePathsModify(context);
		} else {
			this.__propagateNoPathsModify(context);
		}
	}

	propagateModifyLeft(context: Context) {
		if (context.paths) {
			this.__propagatePathsModifyLeft(context);
		} else {
			this.__propagateNoPathsModifyLeft(context);
		}
	}

	propagateModifyRight(context: Context) {
		if (context.paths) {
			this.__propagatePathsModifyRight(context);
		} else {
			this.__propagateNoPathsModifyRight(context);
		}
	}

	// propagateRetractResolve(context: Context) {
	// 	if (context.paths) {
	// 		this.__propagatePathsRetractResolve(context);
	// 	} else {
	// 		this.__propagateNoPathsRetractResolve(context);
	// 	}
	// }

	// retractResolve(context: Context) {
	// 	return this.propagateRetractResolve(context);
	// }
}