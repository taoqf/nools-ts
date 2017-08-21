const nools = require('../dist/');

require('should');

describe('auto focus', () => {
	it('rule B to C will be auto focused', async () => {
		const rule = `
rule Bootstrap {
    when{
        a : State a.name == 'A' && a.state == 'NOT_RUN';
    }
    then{
		a.state = 'FINISHED';
        modify(a);
    }
}


rule 'A to B' {
    when{
        a : State a.name == 'A' && a.state == 'FINISHED';
        b : State b.name == 'B' && b.state == 'NOT_RUN';
    }
    then{
		b.state = 'FINISHED';
        modify(b);
    }
}

rule 'B to C' {
    agenda-group: 'B to C';
    auto-focus: true;
    when{
        b: State b.name == 'B' && b.state == 'FINISHED';
        c : State c.name == 'C' && c.state == 'NOT_RUN';
    }
    then{
		c.state = 'FINISHED';
        modify(c);
        focus('B to D')
    }
}

rule 'B to D' {
    agenda-group: 'B to D';
    when{
        b: State b.name == 'B' && b.state == 'FINISHED';
        d : State d.name == 'D' && d.state == 'NOT_RUN';
    }
    then{
		d.state = 'FINISHED';
        modify(d);
    }
}
`;

		const defines = new Map();
		const scope = new Map();

		class State {
			constructor(name, state) {
				this.name = name;
				this.state = state;
			}
		}

		defines.set('State', State);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const fired = [];
		const session = flow.getSession(new State("A", "NOT_RUN"),
			new State("B", "NOT_RUN"),
			new State("C", "NOT_RUN"),
			new State("D", "NOT_RUN"));
		await session.on("fire", (name) => {
			fired.push(name);
		}).match();
		session.dispose();
		fired.should.be.eql([
			"Bootstrap",
			"A to B",
			"B to C",
			"B to D"]);
	});
});
