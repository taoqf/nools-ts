let nools = require('../dist/');

let rule = `
rule test {
	when {
		or(
			s : String s == 'hello',
			s1 : String s1 == 'world',
			s2 : String s2 == 'hello world'
		);
	}
    then {
        console.log('----------------', s2);
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
const session = flow.getSession('hello world');
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
