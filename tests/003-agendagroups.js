const rule = `
//find any message that starts with hello
rule 'Hello World' {
	agenda-group: "ag1";
    when {
        m : Message m.name === 'hello';
    }
    then {
		m.name = "goodbye";
        modify(m);
    }
}

//find all messages then end in goodbye
rule Goodbye {
	agenda-group: "ag2";
    when {
        m : Message m.name === 'goodbye';
    }
    then {
		m.name = "hello";
        modify(m);
        console.log(m.name);
    }
}
`;
let nools = require('../dist/');

const defines = new Map();
const scope = new Map();

class Message {
	constructor(name) {
		this.name = name;
	}
}

defines.set('message', Message);
defines.set('Message', Message);

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fired = [];
const session = flow.getSession(new Message('hello'));
session.focus("ag1")
.on("fire", (ruleName) => {
	fired.push(ruleName);
}).match().then(() => {
	console.log('done');
	console.log(fired);  //[ 'Hello World' ]
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
