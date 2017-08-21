const nools = require('../dist/');

// require('should');

describe('exists', () => {
	it('should match', async () => {

		const rule = `
rule test {
	when {
		exists(n1: Number n1 > 2);
	}
	then {
		r.matched = true;
	}
}
`;

		const defines = new Map();

		const r = { matched: false };
		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: { r }
		});
		const session = flow.getSession(1, 2, 3, 4);
		await session.match();
		session.dispose();
		r.matched.should.equal(true);
	});
});
