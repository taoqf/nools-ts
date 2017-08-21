const nools = require('../dist/');

require('should');

describe('or', () => {
	it('should fired 3 times.', async () => {
		const rule = `
rule test {
	when {
		or(
			s : String s == 'hello',
			s1 : String s1 == 'world',
			s2 : String s2 == 'hello world'
		);
	}
    then {
		++r.count;
    }
}
`;

		const defines = new Map();
		const scope = new Map();
		const r = {
			count: 0
		};
		scope.set('r', r);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const session = flow.getSession('hello', 'world', 'hello world', 'test');
		await session.match();
		session.dispose();
		r.count.should.equal(3);
	});
});
