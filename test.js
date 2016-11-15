let nools = require('./dist/');

let rule = `
// define Message {
//     text : '',
//     constructor : function(message){
//         this.text = message;
//     }
// }

//find any message that starts with hello
rule Hello {
    when {
        m : Message m.text =~ /^hello(\\s*world)?$/;
    }
    then {
		console.log(333);
		m.text += " goodbye";
		modify(m);
    }
}

//find all messages then end in goodbye
rule Goodbye {
    when {
        m : Message m.text =~ /.*goodbye$/;
    }
    then {
        console.log(m.text);
    }
}
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
scope.set('test', test);
scope.set('test111', test111);

let flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
let session = flow.getSession(new Message('hello world'));
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
