import Constraint from '../constraint/constraint';

export default class Pattern {
	id: number;
	getSpecificity() {
		return 0;
	}
	hashCode() {
		return '';
	}
	public constraints: Constraint[];
}