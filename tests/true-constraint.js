let nools = require('../dist/');

let rule = `
rule test {
    when {
    }
    then {
        console.log('----------------', a);
    }
}
`;

const defines = new Map();
const scope = new Map();

let flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
let session = flow.getSession();
session.assert('test');
session.match().then(() => {
	console.log('done.')
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
