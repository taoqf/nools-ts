const nools = require('../dist/');

require('should');

describe('from', () => {
	it('from matched fact', async () => {
		const rule = `
rule test {
	when {
		p: Person;
		first: String first =~ /^a/ from p.firstName;
	}
	then {
		r.push(first);
	}
}
`;

		const defines = new Map();

		class Person {
			constructor(firstName, middleName, lastName) {
				this.firstName = firstName;
				this.middleName = middleName;
				this.lastName = lastName;
			}
		}

		defines.set('Person', Person);

		const r = [];
		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: { r }
		});
		const session = flow.getSession(new Person('angula', 'juley', 'gard'), new Person('alice', 'munal', 'galler'), new Person('rose', '', 'bing'));
		await session.match();
		session.dispose();
		r.should.be.eql(['alice', 'angula']);
	});
	it('from array', async () => {
		const rule = `
		rule test {
			when {
				n: Number from [1,2,3,4,5];
			}
			then {
				r.push(n);
			}
		}
		`;

		const defines = new Map();
		const scope = new Map();
		const r = [];
		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: { r }
		});
		const session = flow.getSession();
		await session.match();
		session.dispose();
		r.should.be.length(5);
	});
	it('from function', async () => {
		const rule = `
		rule test {
			when {
				n: Number from myarr();
			}
			then {
				r.push(n);
			}
		}
		`;

		function myarr() {
			return [1, 2, 'abc', 3]
		}
		const defines = new Map();
		const scope = new Map();
		const r = [];
		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: { r, myarr }
		});
		const session = flow.getSession();
		await session.match();
		session.dispose();
		r.should.be.length(3);
	});
});
