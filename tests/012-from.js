let nools = require('../dist/');

let rule = `
function myarr(){
	return [1, 2, 'abc', 3]
}
rule test {
	when {
		n: Number from myarr();
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
