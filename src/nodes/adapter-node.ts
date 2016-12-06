import { INode, create_node } from './node';

export interface IAdapterNode extends INode {
}

export function create(left: boolean): IAdapterNode {
	return create_node(left ? 'leftadapter' : 'rightadapter');
}
