import ObjectPattern from './object-pattern';
import InitialFact from '../facts/initial';

export default class InitialFactPattern extends ObjectPattern {
	constructor() {
		super(InitialFact, "__i__", [] as any, {});
	}

	assert() {
		return true;
	}
}