import AdapterNode from './adapter-node';
import Context from '../context';

export default class LeftAdapterNode extends AdapterNode {

	propagateAssert(context: Context) {
		this.propagateAssertLeft(context);
	}

	propagateRetract(context: Context) {
		this.propagateRetractLeft(context);
	}

	// propagateResolve(context: Context) {
	// 	this.propagate("retractResolve", context);
	// }

	propagateModify(context: Context) {
		this.propagateModifyLeft(context);
	}

	// retractResolve(match: Context) {
	// 	this.propagate("retractResolve", match);
	// }

	dispose(context: Context) {
		this.propagateDispose(context);
	}

	toString() {
		return "LeftAdapterNode " + this.__id;
	}
}