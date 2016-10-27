import Context from '../../context';
import Memory from './memory';
import {ITuple} from './tuple-entry';

export default class LeftMemory extends Memory {
	getLeftMemory(tuple: Context) {
		return this.getMemory(tuple);
	}
}