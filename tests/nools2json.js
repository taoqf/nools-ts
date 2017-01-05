const fs = require('fs');
const root = './tests/';
const dirs = fs.readdirSync(root);
const path = require('path');

const defines = new Map();
const scope = new Map();

class OAV { }

defines.set('OAV', OAV);
scope.set('feidao', {});
scope.set('feidao_when', {});
scope.set('feidao_then', {});

const nools = require('../dist/compile');

const dirs = fs.readdirSync(root);
dirs.map((dir) => {
	return path.join(root, dir);
}).filter((dir) => {
	return fs.existsSync(dir) && fs.statSync(dir).isFile();
}).filter((dir) => {
	return /\.nools$/.test(dir);
}).forEach((dir) => {
	let rule = fs.readFileSync(dir, 'utf8');
	const flow = nools.compile(rule, {
		name: 'test',
		define: defines,
		scope: scope
	});
	fs.writeFileSync(dir + '.json', JSON.stringify(flow));
});
console.log('done');
process.exit();