let nools = require('../dist/');

let rule = `
rule test {
	when {
		n1: Number;
		not(n2: Number n1 > n2);
	}
	then {
		console.log('n1:', n1);
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
// const session = flow.getSession(4, 2);
// const session = flow.getSession(4, 2, 3);
const session = flow.getSession(4, 3, 2);
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
