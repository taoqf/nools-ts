const nools = require('../dist/');

// require('should');

describe('not', () => {
	it('use scope function', async () => {
		const rule = `
rule test {
	when {
		n1: Number;
		not(n2: Number n1 > n2);
	}
	then {
		r.min = n1;
	}
}
`;

		const defines = new Map();
		const scope = new Map();
		class Result {
			constructor() {
				this.min = Infinity;
			}
		}
		const r = new Result();

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: { r }
		});
		await (async () => {
			const session = flow.getSession(r, 4, 2);
			await session.match();
			session.dispose();
			r.min.should.equal(2);
		})();
		await (async () => {
			const session = flow.getSession(r, 4, 1, 2, 3);
			await session.match();
			session.dispose();
			r.min.should.equal(1);
		})();
		await (async () => {
			const session = flow.getSession(r, -4, 3, 2);
			await session.match();
			session.dispose();
			r.min.should.equal(-4);
		})();
	});
});
