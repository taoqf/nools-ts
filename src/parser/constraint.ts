import {ICondition} from '../interfaces';

const _parseConstraint = require('./constraint/parser');

export default function parseConstraint(constraint: string): ICondition {
	return _parseConstraint.parse(constraint);
}
