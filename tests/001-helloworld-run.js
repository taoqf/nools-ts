const nools = require('../dist/runtime');

const defines = new Map();
const scope = new Map();

class Message {
	constructor(message) {
		this.text = message;
	}
}

defines.set('message', Message);
defines.set('Message', Message);

const fs = require('fs');
const data = fs.readFileSync('./tests/001-helloworld.json');
const rule = JSON.parse(data);
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
