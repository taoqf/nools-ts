const rule = `
//find any message that starts with hello
rule Hello {
    when {
        m : Message m.text =~ /^hello(\\s*world)?$/;
    }
    then {
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
let nools = require('../dist/');

const defines = new Map();
const scope = new Map();

class Message {
	constructor(message) {
		this.text = message;
	}
}

defines.set('message', Message);
defines.set('Message', Message);

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const session = flow.getSession(new Message('hello world'));
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
