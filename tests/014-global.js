let nools = require('../dist/');

let rule = `
global PI = Math.PI;
global SOME_STRING = 'some string';
global TRUE = true;
global NUM = 1.23;
global DATE = new Date();
rule test {
	when {
	}
	then {
		console.log('PI', PI);
		console.log('SOME_STRING', SOME_STRING);
		console.log('TRUE', TRUE);
		console.log('NUM', NUM);
		console.log('DATE', DATE);
	}
}
`;

const defines = new Map();
const scope = new Map();

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const session = flow.getSession();
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
