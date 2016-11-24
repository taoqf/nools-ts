let nools = require('../dist/');

let rule = `
rule MultiNotOrRule {
	when {
		or(
			not(n1: Number n1 < 3)
			not(n2: Number n2 > 6)
		)
	}
	then {
		console.log('n:', n1);
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
const session = flow.getSession(4,5);
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
