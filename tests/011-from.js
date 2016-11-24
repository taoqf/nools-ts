let nools = require('../dist/');

let rule = `
rule test {
	when {
		n: Number from [1,2,3,4,5];
	}
	then {
		console.log(n);
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
