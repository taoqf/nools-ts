import mixin from 'lodash-ts/mixin';
import { INode, nodeType } from '../nodes';
import Context, { Match } from '../context';
import { IReferenceConstraint, is_instance_of_reference_eq_constraint } from '../constraint';
import { IJoinReferenceNode } from './join-reference-node';;
import { create_node } from '../compile/nodes';
import { IMemory, addIndex } from './misc/memory';

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

export function addConstraint(node: IJoinReferenceNode, constraint: IReferenceConstraint) {
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
				addIndex(node.rightMemory, rightIndex, leftIndex, rightOp);
				addIndex(node.leftMemory, leftIndex, rightIndex, leftOp);
			}
		}
	}
	if (node.isDefault) {
		node.constraint = constraint;
		node.isDefault = false;
	} else {
		node.constraint = constraint = node.constraint.merge(constraint);
	}
	const constraintAssert = constraint.assert;

	node.equal = (node: IJoinReferenceNode) => {
		return constraint.equal(node.constraint);
	};
	node.isMatch = (lc: Context, rc: Context) => {
		return constraintAssert(lc.factHash, rc.factHash);
	};
	node.match = (lc: Context, rc: Context) => {
		if (constraintAssert(lc.factHash, rc.factHash)) {
			return lc.match.merge(rc.match);
		}
		return { isMatch: false } as any as Match;
	};
}

const DEFUALT_CONSTRAINT = {
	assert(it: any, fh?: any) {
		return true;
	},

	equal() {
		return false;
	}
} as any as IReferenceConstraint;

export interface IJoinReferenceNode extends INode {
	constraint: IReferenceConstraint;
	isDefault: boolean;
	leftMemory: IMemory;
	rightMemory: IMemory;
	equal(node: IJoinReferenceNode): boolean;
	isMatch(lc: Context, rc: Context): boolean;
	match(lc: Context, rc: Context): Match;
}

export function create_join_reference_node(leftMemory: IMemory, rightMemory: IMemory): IJoinReferenceNode {
	const constraint = DEFUALT_CONSTRAINT;
	const constraintAssert = DEFUALT_CONSTRAINT.assert;
	return mixin(create_node(nodeType.join_reference), {
		constraint: constraint,
		isDefault: true,
		leftMemory: leftMemory,
		rightMemory: rightMemory,
		equal(node: IJoinReferenceNode) {
			return constraint.equal(node.constraint);
		},
		isMatch(lc: Context, rc: Context) {
			return constraintAssert(lc.factHash, rc.factHash);
		},
		match(lc: Context, rc: Context) {
			if (constraintAssert(lc.factHash, rc.factHash)) {
				return lc.match.merge(rc.match);
			}
			return { isMatch: false } as any as Match;
		}
	});
}