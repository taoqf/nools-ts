import isArray from 'lodash-ts/isArray';

const defaultMaxListeners = 10;
export default class EventEmitter {
	_events: { [type: string]: Function[] } = {};
	maxListeners = defaultMaxListeners;
	setMaxListeners(n: number) {
		this.maxListeners = n;
	}
	on(type: string, listener: Function) {
		return this.addListener(type, listener);
	}
	addListener(type: string, listener: Function) {
		if ('function' !== typeof listener) {
			throw new Error('addListener only takes instances of Function');
		}

		// To avoid recursion in the case that type == "newListeners"! Before
		// adding it to the listeners, first emit "newListeners".
		this.emit('newListener', type, listener);

		if (!this._events[type]) {
			// Optimize the case of one listener. Don't need the extra array object.
			this._events[type] = [listener];
		} else {

			// Check for listener leak
			if (!(this._events[type] as any).warned) {
				const m = this.maxListeners;

				if (m && m > 0 && this._events[type].length > m) {
					(this._events[type] as any).warned = true;
					console.error('(node) warning: possible EventEmitter memory ' +
						'leak detected. %d listeners added. ' +
						'Use emitter.setMaxListeners() to increase limit.',
						this._events[type].length);
					console.trace();
				}
			}

			// If we've already got an array, just append.
			this._events[type].push(listener);
		}

		return this;
	}

	emit(type: string, ...args: any[]) {
		// If there is no 'error' event listener then throw.
		if (type === 'error') {
			if (!this._events['error']) {
				if (args[0] instanceof Error) {
					throw args[0]; // Unhandled 'error' event
				} else {
					throw new Error("Uncaught, unspecified 'error' event.");
				}
			}
		}

		const handlers = this._events[type];
		if (!handlers) {
			return false;
		}

		if (handlers) {
			handlers.forEach((listener) => {
				listener(...args);
			})
			return true;
		} else {
			return false;
		}
	}

	once(type: string, listener: Function) {
		const self = this;
		this.on(type, function g(...args: any[]) {
			self.removeListener(type, g);
			listener(...args);
		});

		return this;
	}

	removeListener(type: string, listener: Function) {
		if ('function' !== typeof listener) {
			throw new Error('removeListener only takes instances of Function');
		}

		// does not use listeners(), so no side effect of creating _events[type]
		if (!this._events[type]) {
			return this;
		}

		const list = this._events[type];

		if (list) {
			const i = list.indexOf(listener);
			if (i < 0) return this;
			list.splice(i, 1);
			if (list.length == 0) {
				delete this._events[type];
			}
		}

		return this;
	}

	removeAllListeners(type?: string) {
		if (type === undefined) {
			this._events = {};
			return this;
		}

		// does not use listeners(), so no side effect of creating _events[type]
		if (type && this._events[type]) {
			delete this._events[type];
			this._events[type] = null;
		}
		return this;
	}

	listeners(type: string) {
		return this._events[type] || [];
	}

	listenerCount(emitter: EventEmitter, type: string) {
		let ret = 0;
		if (emitter._events[type]) {
			ret = emitter._events[type].length;
		}
		return ret;
	}
}

// const EE: typeof EventEmitter = typeof process !== "undefined" ? require('events').EventEmitter : EventEmitter;
// export default EE;
