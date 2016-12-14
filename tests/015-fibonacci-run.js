const defines = new Map();
const scope = new Map();

//Define our object classes, you can
//also declare these outside of the nools
//file by passing them into the compile method
class Fibonacci {
	constructor(sequence){
		this.value = -1;
		this.sequence = sequence;
	}
}

class Result {
	constructor(){
		this.value = -1;
	}
}

defines.set('Fibonacci', Fibonacci);
defines.set('Result', Result);

const nools = require('../dist/runtime');
const fs = require('fs');
const data = fs.readFileSync('./tests/015-fibonacci.json');
const rule = JSON.parse(data);
console.time('s');
console.time('s1');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});

const r1 = new Result();
const session1 = flow.getSession(new Fibonacci(10), r1);
console.timeEnd('s1');
session1.match().then(function () {
	console.log("10, %d", r1.result);
	session1.dispose();
});

const r2 = new Result();
const session2 = flow.getSession(new Fibonacci(150), r2);
session2.match().then(function () {
	console.log("150, %d", r2.result);
	session2.dispose();
});

const r3 = new Result();
const session3 = flow.getSession(new Fibonacci(1000), r3);
session3.match().then(function () {
	console.log("1000, %d", r3.result);
	session3.dispose();
	console.timeEnd('s');
	process.exit();
});
