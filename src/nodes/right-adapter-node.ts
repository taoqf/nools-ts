import AdapterNode from './adapter-node';
import Context from '../context';

export default class RightAdapterNode extends AdapterNode {

	propagateAssert(context: Context) {
		this.propagateAssertRight(context);
	}

	propagateRetract(context: Context) {
		this.propagateRetractRight(context);
	}

	// propagateResolve(context: Context) {
	// 	this.propagate("retractResolve", context);
	// }

	propagateModify(context: Context) {
		this.propagateModifyRight(context);
	}

	// retractResolve(match: Context) {
	// 	this.propagate("retractResolve", match);
	// }

	dispose(context: Context) {
		this.propagateDispose(context);
	}

	toString() {
		return "RightAdapterNode " + this.__id;
	}
}