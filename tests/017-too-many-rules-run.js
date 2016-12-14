const fs = require('fs');
const data = fs.readFileSync('./tests/017-too-many-rules.json');
const rule = JSON.parse(data);

const defines = new Map();
const scope = new Map();

class OAV {
	constructor(o, a, v) {
		this.o = o;
		this.a = a;
		this.v = v;
	}
}
defines.set('OAV', OAV);
const nools = require('../dist/runtime');
console.time('feidao');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const session = flow.getSession(new OAV('o', 'a', 0));
session.match().then(() => {
	console.log('done');
	session.dispose();
	console.timeEnd('feidao');
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
