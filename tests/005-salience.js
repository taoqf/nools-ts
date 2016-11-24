const rule = `
rule Hello4 {
    salience: 7;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello3 {
    salience: 8;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello2 {
    salience: 9;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello1 {
    salience: 10;
    when {
        m: Message m.name == 'hello';
    }
    then {}
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

defines.set('Message', Message);

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fired = [];
const session = flow.getSession(new Message("hello"));
session.on("fire", (name) => {
	fired.push(name);
}).match().then(() => {
	console.log('done');
	console.log(fired);  //[ 'Hello World' ]
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
