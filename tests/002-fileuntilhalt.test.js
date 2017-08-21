const nools = require('../dist/');

// require('should');

describe('fire until halt', () => {
	it('should halt when count to 10000', async () => {
		const rule = `
//We reached our goal
rule "I can count!" {
    when {
        $ctr: Counter $ctr.count == 10000;
    }
    then{
        // console.log("Look ma! I counted to " + $ctr.count);
        halt();
    }
}

//no counter was asserted so create one
rule "not count" {
    when {
        not($ctr: Counter);
    }
    then{
        // console.log("Imma gonna count!");
        assert(new Counter(1));
    }
}

//A little status update
rule "give them an update" {
    when{
        $ctr: Counter $ctr.count % 1000 == 0 {count: $count}
    }
    then{
        // console.log("Imma countin...", $ctr);
		$ctr.count = $count + 1;
        modify($ctr);
    }
}

//just counting away
rule count {
    when{
        $ctr: Counter {count: $count}
    }
    then{
		$ctr.count = $count + 1;
        modify($ctr);
    }
}
`;

		const defines = new Map();
		const scope = new Map();

		class Counter {
			constructor(count = 0) {
				this.count = count;
			}
		}

		defines.set('Counter', Counter);

		const flow = nools.compile(rule, {
			name: 'test',
			define: defines,
			scope: scope
		});
		const session = flow.getSession();
		await session.match();
		const fact = session.getFact(Counter);
		session.dispose();
		fact.count.should.equal(10000);
	});
});
