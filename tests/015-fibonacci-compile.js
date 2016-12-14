let rule = `
rule Recurse {
	when {
		//you can use not or or methods in here
		not(f : Fibonacci f.sequence == 1);
		//f1 is how you can reference the fact else where
		f1 : Fibonacci f1.sequence != 1;
	}
	then {
		assert(new Fibonacci(f1.sequence - 1));
	}
}

rule Bootstrap {
	when {
		f : Fibonacci f.value == -1 && (f.sequence == 1 || f.sequence == 2);
	}
	then{
		f.value = 1;
		modify(f);
	}
}

rule Calculate {
	when {
		f1 : Fibonacci f1.value != -1 {sequence : s1};
		//here we define constraints along with a hash so you can reference sequence
		//as s2 else where
		f2 : Fibonacci f2.value != -1 && f2.sequence == s1 + 1 {sequence:s2};
		f3 : Fibonacci f3.value == -1 && f3.sequence == s2 + 1;
		r : Result
	}
	then {
		f3.value = r.result = f1.value + f2.value;
		modify(f3);
		retract(f1);
	}
}
`;

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

const nools = require('../dist/compile');
const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const fs = require('fs');
fs.writeFileSync('./tests/015-fibonacci.json', JSON.stringify(flow));
console.log('done');
process.exit();