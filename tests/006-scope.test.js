const nools = require('../dist/');

require('should');

describe('scope', () => {
	it('use scope function', async () => {
		const rule = `
rule Hello {
    when {
        m : Message doesMatch(m.text, /^hello\\sworld$/);
    }
    then {
        m.text += " goodbye";
        modify(m);
    }
}

rule Goodbye {
    when {
        m : Message doesMatch(m.text, /.*goodbye$/);
    }
    then {
		// console.log('goodbye');
    }
}
`;
		const defines = new Map();
		const scope = new Map();

		class Message {
			constructor(text) {
				this.text = text;
			}
		}

		function doesMatch(str, regex) {
			return regex.test(str);
		}

		defines.set('Message', Message);
		scope.set('doesMatch', doesMatch);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const fired = [];
		const session = flow.getSession(new Message("hello world"));
		await session.match();
		const fact = session.getFact(Message);
		session.dispose();
		fact.text.should.equal('hello world goodbye');
	});
});
