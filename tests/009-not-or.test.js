const nools = require('../dist/');

// require('should');

describe('not or', () => {
	let flow;
	const r = {};
	before(() => {
		const rule = `
		rule MultiNotOrRule {
			when {
				or(
					not(n1: Number n1 < 3)
					not(n2: Number n2 > 6)
				)
			}
			then {
				++r.count;
			}
		}
		`;

		flow = nools.compile(rule, {
			name: 'test',
			scope: { r }
		});
	});
	it('should not match', async () => {
		r.count = 0;
		const session = flow.getSession(2, 7);
		await session.match();
		session.dispose();
		r.count.should.equal(0);
	});
	it('should match once', async () => {
		r.count = 0;
		const session = flow.getSession(4, 2);
		await session.match();
		session.dispose();
		r.count.should.equal(1);
	});
	it('should match once', async () => {
		r.count = 0;
		const session = flow.getSession(4, 7);
		await session.match();
		session.dispose();
		r.count.should.equal(1);
	});
	it('should match twice', async () => {
		r.count = 0;
		const session = flow.getSession(4, 5);
		await session.match();
		session.dispose();
		r.count.should.equal(2);
	});
});
