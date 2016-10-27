import Context from '../../context';
import Memory from './memory';
import {ITuple} from './tuple-entry';

export default class RightMemory extends Memory {
	getRightMemory(tuple: Context) {
		return this.getMemory(tuple);
	}
}