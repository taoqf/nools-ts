const nools = require('../dist/');

require('should');

describe('global', () => {
	it('should have properties', async () => {
		const rule = `
global PI = Math.PI;
global SOME_STRING = 'some string';
global TRUE = true;
global NUM = 1.23;
global DATE = new Date();
rule test {
	when {
	}
	then {
		r.PI = PI;
		r.SOME_STRING = SOME_STRING;
		r.TRUE = TRUE;
		r.NUM = NUM;
		r.DATE = DATE;
	}
}
`;

		const defines = new Map();
		const scope = new Map();	// notice, must use map here

		const r = {};
		scope.set('r', r);
		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope
		});
		const session = flow.getSession();
		await session.match();
		session.dispose();
		r.should.have.properties(['PI', 'SOME_STRING', 'TRUE', 'NUM', 'DATE']);
	});
});
