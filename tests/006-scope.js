const rule = `
rule Hello {
    when {
        m : Message doesMatch(m.text, /^hello\\sworld$/);
    }
    then {
		console.log(m.text);
        m.text += " goodbye";
        modify(m);
    }
}

rule Goodbye {
    when {
        m : Message doesMatch(m.text, /.*goodbye$/);
    }
    then {
		console.log('goodbye');
    }
}
`;
let nools = require('../dist/');

const defines = new Map();
const scope = new Map();

class Message {
	constructor(text) {
		this.text = text;
	}
}

function doesMatch(str, regex){
	return regex.test(str);
}

defines.set('Message', Message);
scope.set('doesMatch', doesMatch);

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fired = [];
const session = flow.getSession(new Message("hello world"));
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
