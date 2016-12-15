const rules = [];
const codes1 = [];
const codes2 = [];
const codes3 = [];
for (let i = 0; i < 500; ++i) {
	const rule = `
rule Recurse${i} {
	when {
		not(f : Fibonacci${i} f.sequence == 1);
		f1 : Fibonacci${i} f1.sequence != 1;
	}
	then {
		assert(new Fibonacci${i}(f1.sequence - 1));
	}
}

rule Bootstrap${i} {
	when {
		f : Fibonacci${i} f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate${i} {
	when {
		f1 : Fibonacci${i} f1.value != -1 {sequence : s1};
		f2 : Fibonacci${i} f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci${i} f3.value == -1 && f3.sequence == s2 + 1;
		r : Result${i}
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}
`;
	rules.push(rule);
	const code1 = `
class Fibonacci${i} {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result${i} {
	constructor() {
		this.value = -1;
	}
}
defines.set('Fibonacci${i}', Fibonacci${i});
defines.set('Result${i}', Result${i});
`;
	const code2 = `
facts.push(new Result${i}());
facts.push(new Fibonacci${i}(3));
`;
	codes1.push(code1);
	codes2.push(code1, code2);

	const code3 = `
class Fibonacci${i} {
	constructor(sequence) {
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result${i} {
	constructor() {
		this.value = -1;
	}
}
defines['Fibonacci${i}'] = Fibonacci${i};
defines['Result${i}'] = Result${i};
`;
	codes3.push(code3, code2);
}

const r = 'const rule = `' + rules.join('') + '`;';
const c1 = codes1.join('');
const c2 = codes2.join('');
const c3 = codes3.join('');

const src1 = `
${r}
const defines = new Map();
const scope = new Map();
${c1}
const nools = require('../dist/compile');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fs = require('fs');
fs.writeFileSync('./tests/017-too-many-rules.json', JSON.stringify(flow));
console.log('done');
process.exit();
`;
const src2 = `
const defines = new Map();
const scope = new Map();
const facts = [];
${c2}
const nools = require('../dist/runtime');
const fs = require('fs');
const data = fs.readFileSync('./tests/017-too-many-rules.json');
const rule = JSON.parse(data);
console.time('total');
console.time('compile');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});

console.timeEnd('compile');
console.time('getSession');
const session = flow.getSession(...facts);
console.timeEnd('getSession');
console.time('match');
session.match().then(function () {
	console.timeEnd('match');
	console.timeEnd('total');
	session.dispose();
	process.exit();
});
`;
const src3 = `
${r}
const defines = {};
const scope = {};
const facts = [];
${c3}
const nools = require('../dist/');
console.time('total');
console.time('compile');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});

console.timeEnd('compile');
console.time('getSession');
const session = flow.getSession(...facts);
console.timeEnd('getSession');
console.time('match');
session.match().then(function () {
	console.timeEnd('match');
	console.timeEnd('total');
	session.dispose();
	process.exit();
});
`;
const fs = require('fs');
fs.writeFileSync('./tests/017-too-many-rules-compile.js', src1);
fs.writeFileSync('./tests/017-too-many-rules-run.js', src2);
fs.writeFileSync('./tests/017-too-many-rules.js', src3);
console.log('done');
process.exit();

/**
 * ➜  nools-ts git:(functional) ✗ node ./tests/017-too-many-rules-run.js
s1: 6.111ms
s2: 2150.427ms
s3: 19267.360ms
 */