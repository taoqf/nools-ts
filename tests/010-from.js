let nools = require('../dist/');

let rule = `
rule test {
	when {
		p: Person;
		first: String first =~ /^a/ from p.firstName;
	}
	then {
		console.log(p);
	}
}
`;

const defines = new Map();
const scope = new Map();

class Person{
	constructor(firstName, middleName, lastName){
		this.firstName = firstName;
		this.middleName = middleName;
		this.lastName = lastName;
	}
}

defines.set('Person', Person);

const flow = nools.compile(rule, {
	name: 'test',
	define: defines,
	scope: scope
});
const session = flow.getSession(new Person('aaa', 'bbb', 'ccc'), new Person('alice', 'munal', 'galler'), new Person('rose', '', 'bing'));
session.match().then(() => {
	console.log('done');
	session.dispose();
	process.exit();
}, (err) => {
	console.error(err);
	process.exit();
});
