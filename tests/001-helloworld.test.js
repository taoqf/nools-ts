const nools = require('../dist/');
const c = require('../dist/compile');
const rt = require('../dist/runtime');

// const { should } = require('chai');
// should();
require('should');

describe('hello world', () => {
	let r;
	before(() => {
		const rule = `
		//find any message that starts with hello
		rule Hello {
			when {
				m : Message m.text =~ /^hello(\\s*world)?$/;
			}
			then {
				m.text += " goodbye";
				modify(m);
			}
		}

		//find all messages then end in goodbye
		rule Goodbye {
			when {
				m : Message m.text =~ /.*goodbye$/;
			}
			then {
				// console.log(m.text);
			}
		}
		`;

		const defines = new Map();
		const scope = new Map();

		class Message {
			constructor(message) {
				this.text = message;
			}
		}

		defines.set('message', Message);
		defines.set('Message', Message);

		const j = c.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const s = JSON.stringify(j);
		r = JSON.parse(s);
	});
	it('basic', async () => {
		const rule = `
	//find any message that starts with hello
	rule Hello {
		when {
			m : Message m.text =~ /^hello(\\s*world)?$/;
		}
		then {
			m.text += " goodbye";
			modify(m);
		}
	}

	//find all messages then end in goodbye
	rule Goodbye {
		when {
			m : Message m.text =~ /.*goodbye$/;
		}
		then {
			// console.log(m.text);
		}
	}
	`;

		const defines = new Map();
		const scope = new Map();

		class Message {
			constructor(message) {
				this.text = message;
			}
		}

		defines.set('message', Message);
		defines.set('Message', Message);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const m = new Message('hello world');
		const session = flow.getSession(m);
		await session.match();
		m.text.should.equal('hello world goodbye')
		session.dispose();
	});
	it('use json', async () => {
		const defines = new Map();
		const scope = new Map();

		class Message {
			constructor(message) {
				this.text = message;
			}
		}

		defines.set('message', Message);
		defines.set('Message', Message);
		const flow = rt.compile(r, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const m = new Message('hello world');
		const session = flow.getSession(m);
		await session.match();
		m.text.should.equal('hello world goodbye')
		session.dispose();
	});
	it('use object as scope and defines', async () => {
		const scope = new Map();

		class Message {
			constructor(message) {
				this.text = message;
			}
		}

		const flow = rt.compile(r, {
			name: 'test',
			define: { Message },
			scope: scope
		});
		const m = new Message('hello world');
		const session = flow.getSession(m);
		await session.match();
		m.text.should.equal('hello world goodbye')
		session.dispose();
	});
});
