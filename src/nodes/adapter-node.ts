import { IAdapterNode } from '../nodes';
import { create_node } from './node';

export function create(left: boolean): IAdapterNode {
	return create_node(left ? 'leftadapter' : 'rightadapter');
}
