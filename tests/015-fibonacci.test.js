const nools = require('../dist/');

// require('should');

describe('fibonacci', () => {
	it('classic 10', async () => {
		const rule = `
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
			constructor(sequence) {
				this.value = -1;
				this.sequence = sequence;
			}
		}

		class Result {
			constructor() {
				this.value = -1;
			}
		}

		defines.set('Fibonacci', Fibonacci);
		defines.set('Result', Result);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});

		const r = new Result();
		const session = flow.getSession(new Fibonacci(10), r);
		await session.match();
		r.result.should.equal(55);
		session.dispose();
	});
	it('classic 150', async () => {
		const rule = `
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
			constructor(sequence) {
				this.value = -1;
				this.sequence = sequence;
			}
		}

		class Result {
			constructor() {
				this.value = -1;
			}
		}

		defines.set('Fibonacci', Fibonacci);
		defines.set('Result', Result);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});

		const r = new Result();
		const session = flow.getSession(new Fibonacci(150), r);
		await session.match();
		r.result.should.equal(9.969216677189305e+30);
		session.dispose();
	});
	it('classic 1000', async () => {
		const rule = `
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
			constructor(sequence) {
				this.value = -1;
				this.sequence = sequence;
			}
		}

		class Result {
			constructor() {
				this.value = -1;
			}
		}

		defines.set('Fibonacci', Fibonacci);
		defines.set('Result', Result);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});

		const r = new Result();
		const session = flow.getSession(new Fibonacci(1000), r);
		await session.match();
		r.result.should.equal(4.346655768693743e+208);
		session.dispose();
	});
});
