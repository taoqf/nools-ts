// function test() {
// 	return new Promise((resolve) => {
// 		resolve( new Promise((resolve) => {
// 			resolve(11);
// 		}));
// 	});
// }

// test().then((data) => {
// 	console.log(data);
// }, (err) => {
// 	console.error('ddddddd', err);
// })


let nools = require('./dist/');

let rule = `
rule test {
    when {
		// a: String;
		a: String a === "test";
    }
    then {
        console.log('----------------', a);
    }
}

rule test2 {
    when {
		a: String;
    }
    then {
        console.log('*****************', a);
    }
}

`;

function Message(msg) {
	this.text = msg;
}

let flow = nools.compile(rule, {
	name: 'test', define: {
		Message: Message
	},
	test: () => { return true; }
});
let session = flow.getSession();
// session.assert(new Message('t'));
// session.assert(new Message('hello'));
// session.assert(new Message('hello world'));
// session.assert(new Message('goodbye'));
session.assert('111');
session.assert('test');
session.match().then((data) => {
	console.log('data', data)
}, (err)=>{
	console.error(err);
	process.exit();
});
