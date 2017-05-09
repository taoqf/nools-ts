import { ICondition } from '../../interfaces';

import * as _parseConstraint from './constraint/parser';

export default function parseConstraint(constraint: string) {
	return _parseConstraint.parse(constraint);
}
