let nools = require('./dist/');

let rule = `

// global gg = 1;

// rule test {
//     when {
// 		// b: Message;
// 		a: String a === "test";
// 		// b: String b === "test";
// 		// c: String c === "test";
//     }
//     then {
//         console.log('----------------', a);
//         // console.log('----------------', b.text, a);
//     }
// }

rule test3 {
    when {
		a: Object;
    }
    then {
        console.log('000000000000000000', a);
    }
}

// rule test2 {
//     when {
// 		a: String from feidao.test();
//     }
//     then {
//         console.log('*****************', a);
// 		feidao.test111();
//     }
// }

`;

class Message {
	constructor(msg) {
		this.text = msg;
	}
}

function test() {
	return [true, 'false', 123, 'abc'];
}

function test111() {
	console.log('-*-*-+*-*-*-*-*-*-*-*-*-');
}

const defines = new Map();
defines.set('Message', Message);
const scope = new Map();
scope.set('feidao', {
	test: test,
	test111: test111
});

let flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
let session = flow.getSession('111', 'test');
// session.assert(new Message('t'));
// session.assert(new Message('hello'));
// session.assert(new Message('hello world'));
// session.assert(new Message('goodbye'));
session.match().then(() => {
	console.log('done.')
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
