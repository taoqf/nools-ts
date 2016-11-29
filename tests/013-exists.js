let nools = require('../dist/');

let rule = `
rule test {
	when {
		exists(n1: Number n1 > 2);
	}
	then {
		console.log('matched.');
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
const session = flow.getSession(1, 2, 3, 4);
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
