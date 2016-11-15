import Flow from './flow';
import RootNode from './nodes/root-node';
import AgendaTree from './agenda';
import nextTick from './next-tick';

export default class ExecutionStragegy {

	private looping = false;
	private matchUntilHalt = false;
	private flow: Flow;
	private agenda: AgendaTree;
	private rootNode: RootNode;
	private __halted = false;
	private flowAltered = false;
	onAlter: () => void;
	constructor(flow: Flow, matchUntilHalt = false) {
		this.flow = flow;
		this.agenda = flow.agenda;
		this.rootNode = flow.rootNode;
		this.matchUntilHalt = !!(matchUntilHalt);
		// extd.bindAll(this, ["onAlter", "callNext"]);
		this.onAlter = () => {
			this._onAlter();
		};
	}

	halt() {
		this.__halted = true;
		if (!this.looping) {
			this.callback();
		}
	}

	_onAlter() {
		this.flowAltered = true;
		if (!this.looping && this.matchUntilHalt && !this.__halted) {
			this.callNext();
		}
	}

	setup() {
		const flow = this.flow;
		this.rootNode.resetCounter();
		flow.on("assert", this.onAlter);
		flow.on("modify", this.onAlter);
		flow.on("retract", this.onAlter);
	}

	tearDown() {
		const flow = this.flow;
		flow.removeListener("assert", this.onAlter);
		flow.removeListener("modify", this.onAlter);
		flow.removeListener("retract", this.onAlter);
	}

	private __handleAsyncNext(next: Promise<any>): Promise<any> {
		const agenda = this.agenda;
		return next.then(() => {
			this.looping = false;
			if (!agenda.isEmpty()) {
				if (this.flowAltered) {
					this.rootNode.incrementCounter();
					this.flowAltered = false;
				}
				if (!this.__halted) {
					return this.callNext();
				} else {
					return this.callback();
				}
			} else if (!this.matchUntilHalt || this.__halted) {
				return this.callback();
			} else {
				return new Promise<any>((resolve, reject) => {
					reject('something must be wrong.');
				});
			}
		});
	}

	// private __handleSyncNext(next: boolean) {
	// 	this.looping = false;
	// 	if (!this.agenda.isEmpty()) {
	// 		if (this.flowAltered) {
	// 			this.rootNode.incrementCounter();
	// 			this.flowAltered = false;
	// 		}
	// 	}
	// 	if (next && !this.__halted) {
	// 		nextTick(() => {
	// 			this.callNext();
	// 		});
	// 	} else if (!this.matchUntilHalt || this.__halted) {
	// 		this.callback();
	// 	}
	// 	return next;
	// }

	callback() {
		this.tearDown();
	}


	callNext() {
		this.looping = true;
		const next = this.agenda.fireNext();
		return this.__handleAsyncNext(next);
	}

	execute() {
		return new Promise((resolve, reject) => {
			this.setup();
			resolve(this.callNext());
		});
	}
}