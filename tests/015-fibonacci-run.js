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
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const r1 = new Result(),
	session1 = flow.getSession(new Fibonacci(10), r1),
	s1 = +(new Date());
session1.match().then(function () {
	console.log("10, %d [%dms]", r1.result, +(new Date()) - s1);
	session1.dispose();
});

const r2 = new Result(),
	session2 = flow.getSession(new Fibonacci(150), r2),
	s2 = +(new Date());
session2.match().then(function () {
	console.log("150, %d [%dms]", r2.result, +(new Date()) - s2);
	session2.dispose();
});

const r3 = new Result(),
	session3 = flow.getSession(new Fibonacci(1000), r3),
	s3 = +(new Date());
session3.match().then(function () {
	console.log("1000, %d [%dms]", r3.result, +(new Date()) - s3);
	session3.dispose();
	process.exit();
});