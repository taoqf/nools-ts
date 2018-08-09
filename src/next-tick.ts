/*global setImmediate, window, MessageChannel*/

let nextTick: (task: () => void) => void;
if (typeof setImmediate === "function") {
	// In IE10, or use https://github.com/NobleJS/setImmediate
	if (typeof window !== "undefined") {
		nextTick = (task: () => void) => {
			setImmediate(task);
		};
	} else {
		nextTick = setImmediate;
	}
} else if (typeof process !== "undefined") {
	// node
	nextTick = process.nextTick;
} else if (typeof MessageChannel !== "undefined") {
	// modern browsers
	// http://www.nonblocking.io/2011/06/windownexttick.html
	const channel = new MessageChannel();
	// linked list of tasks (single, with head node)
	interface LinkNode {
		next?: LinkNode;
		task?: () => void;
	}
	let head: LinkNode = {};
	let tail = head;
	channel.port1.onmessage = function () {
		head = head.next;
		const task = head.task;
		delete head.task;
		task();
	};
	nextTick = function (task) {
		tail = tail.next = { task: task };
		channel.port2.postMessage(0);
	};
} else {
	// old browsers
	nextTick = function (task) {
		setTimeout(task, 0);
	};
}

export default nextTick;