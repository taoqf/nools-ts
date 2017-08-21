const nools = require('../dist/');

// require('should');

describe('salience', () => {
	it('rules should be fired in order', async () => {
		const rule = `
rule Hello4 {
    salience: 7;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello3 {
    salience: 8;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello2 {
    salience: 9;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}

rule Hello1 {
    salience: 10;
    when {
        m: Message m.name == 'hello';
    }
    then {}
}
`;
		const defines = new Map();
		const scope = new Map();

		class Message {
			constructor(name) {
				this.name = name;
			}
		}

		defines.set('Message', Message);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const fired = [];
		const session = flow.getSession(new Message("hello"));
		await session.on("fire", (name) => {
			fired.push(name);
		}).match();
		session.dispose();
		fired.should.be.eql(['Hello1', 'Hello2', 'Hello3', 'Hello4']);
	});
});
