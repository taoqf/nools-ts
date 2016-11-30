import Node from './node';
import Memory from './misc/memory';
import { IReferenceConstraint, is_instance_of_reference_eq_constraint } from '../constraint';
import Context, { Match } from '../context';

const DEFUALT_CONSTRAINT = {
	assert(it: any, fh?: any) {
		return true;
	},

	equal() {
		return false;
	}
};

const inversions: { [op: string]: string } = {
	"gt": "lte",
	"gte": "lte",
	"lt": "gte",
	"lte": "gte",
	"eq": "eq",
	"neq": "neq"
};

function normalizeIndexConstraint(index: string, indexes: string[], op: string) {
	if (index === indexes[1]) {
		op = inversions[op];
	}
	return op;
}

export default class JoinReferenceNode extends Node {
	constraint = DEFUALT_CONSTRAINT as any as IReferenceConstraint;
	constraintAssert = DEFUALT_CONSTRAINT.assert;
	// rightIndexes = [];
	// leftIndexes = [];
	constraintLength = 0;
	isDefault = true;
	leftMemory: Memory;
	rightMemory: Memory;
	constructor(leftMemory: Memory, rightMemory: Memory) {
		super();
		this.leftMemory = leftMemory;
		this.rightMemory = rightMemory;
	}

	addConstraint(constraint: IReferenceConstraint) {
		if (is_instance_of_reference_eq_constraint(constraint)) {
			const identifiers = constraint.getIndexableProperties();
			const alias = constraint.alias;
			if (identifiers.length === 2 && alias) {
				let leftIndex: string;
				let rightIndex: string;
				let i = -1;
				const indexes: string[] = [];
				while (++i < 2) {
					const index = identifiers[i];
					if (index.match(new RegExp("^" + alias + "(\\.?)")) === null) {
						indexes.push(index);
						leftIndex = index;
					} else {
						indexes.push(index);
						rightIndex = index;
					}
				}
				if (leftIndex && rightIndex) {
					const leftOp = normalizeIndexConstraint(leftIndex, indexes, constraint.op),
						rightOp = normalizeIndexConstraint(rightIndex, indexes, constraint.op);
					this.rightMemory.addIndex(rightIndex, leftIndex, rightOp);
					this.leftMemory.addIndex(leftIndex, rightIndex, leftOp);
				}
			}
		}
		if (this.isDefault) {
			this.constraint = constraint;
			this.isDefault = false;
		} else {
			this.constraint = this.constraint.merge(constraint);
		}
		this.constraintAssert = this.constraint.assert;
	}

	equal(node: JoinReferenceNode) {
		return this.constraint.equal(node.constraint);
	}

	isMatch(lc: Context, rc: Context) {
		return this.constraintAssert(lc.factHash, rc.factHash);
	}

	match(lc: Context, rc: Context) {
		if (this.constraintAssert(lc.factHash, rc.factHash)) {
			return lc.match.merge(rc.match);
		}
		return { isMatch: false } as any as Match;
	}
}