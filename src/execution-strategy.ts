import Flow from './flow';
import { IRootNode } from './nodes';
import AgendaTree from './agenda';
import nextTick from './next-tick';

export default class ExecutionStragegy {

	private looping = false;
	private matchUntilHalt = false;
	private flow: Flow;
	private agenda: AgendaTree;
	private rootNode: IRootNode;
	private __halted = false;
	private flowAltered = false;
	private onAlter: () => void;
	constructor(flow: Flow, matchUntilHalt = false) {
		this.flow = flow;
		this.agenda = flow.agenda;
		this.rootNode = flow.data;
		this.matchUntilHalt = !!(matchUntilHalt);
		// extd.bindAll(this, ["onAlter", "callNext"]);
		this.onAlter = () => {
			this.flowAltered = true;
		};
	}

	halt() {
		this.__halted = true;
		if (!this.looping) {
			this.tearDown();
		}
	}

	private setup() {
		const flow = this.flow;
		this.rootNode.bucket.counter = 0;
		flow.on("assert", this.onAlter);
		flow.on("modify", this.onAlter);
		flow.on("retract", this.onAlter);
	}

	private tearDown() {
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
					++this.rootNode.bucket.counter;
					this.flowAltered = false;
				}
				if (!this.__halted) {
					return this.callNext();
				} else {
					return this.tearDown();
				}
			} else if (!this.matchUntilHalt || this.__halted) {
				return this.tearDown();
			} else {
				return new Promise<any>((resolve, reject) => {
					reject('something must be wrong.');
				});
			}
		});
	}

	private callNext() {
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