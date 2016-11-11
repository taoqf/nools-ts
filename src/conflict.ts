import { IInsert } from './interfaces';

export function salience(a: IInsert, b: IInsert) {
	return a.rule.priority - b.rule.priority;
}

export function bucketCounter(a: IInsert, b: IInsert) {
	return a.counter - b.counter;
}

export function factRecency(a: IInsert, b: IInsert) {
	/*jshint noempty: false*/

	let i = 0;
	const aMatchRecency = a.match.recency,
		bMatchRecency = b.match.recency, aLength = aMatchRecency.length - 1, bLength = bMatchRecency.length - 1;
	while (aMatchRecency[i] === bMatchRecency[i] && i < aLength && i < bLength && i++) {
	}
	let ret = aMatchRecency[i] - bMatchRecency[i];
	if (!ret) {
		ret = aLength - bLength;
	}
	return ret;
}

export function factRecencyInverse(a: IInsert, b: IInsert) {
	// negate fact recency,
	// but need 0 to produce 1 in ret value of strategy function
	var fRI = -factRecency(a, b);
	return (fRI === 0 ? 1 : fRI);
}

export function activationRecency(a: IInsert, b: IInsert) {
	return a.recency - b.recency;
}

const strategies = {
	salience: salience,
	bucketCounter: bucketCounter,
	factRecency: factRecency,
	activationRecency: activationRecency,
	factRecencyInverse: factRecencyInverse
};

export function strategy(...strats: { (a: IInsert, b: IInsert): number }[]) {
	const stratsLength = strats.length;

	return function (a: IInsert, b: IInsert) {
		let i = -1, ret = 0;
		const equal = (a === b) || (a.name === b.name && a.hashCode === b.hashCode);
		if (!equal) {
			while (++i < stratsLength && !ret) {
				ret = strats[i](a, b);
			}
			ret = ret > 0 ? 1 : -1;
		}
		return ret;
	};
};

export default strategy(salience, activationRecency, factRecencyInverse);