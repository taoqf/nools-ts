import Node from './node';
import { IBucket } from '../interfaces';
import { IRule } from '../rule';
import AgendaTree from '../agenda';
import Context from '../context';

export default class TerminalNode extends Node {
	public rule: IRule;
	protected index: number;
	public name: string;
	protected agenda: AgendaTree;
	protected bucket: IBucket;
	constructor(bucket: IBucket, index: number, rule: IRule, agenda: AgendaTree) {
		super();
		this.rule = rule;
		this.index = index;
		this.name = this.rule.name;
		this.agenda = agenda;
		this.bucket = bucket;
		agenda.register(this);
	}

	__assertModify(context: Context) {
		const match = context.match;
		if (match.isMatch) {
			const rule = this.rule, bucket = this.bucket;
			this.agenda.insert(this, {
				rule: rule,
				hashCode: context.hashCode,
				index: this.index,
				name: rule.name,
				recency: bucket.recency++,
				match: match,
				counter: bucket.counter
			});
		}
	}

	assert(context: Context) {
		this.__assertModify(context);
	}

	modify(context: Context) {
		this.agenda.retract(this, context);
		this.__assertModify(context);
	}

	retract(context: Context) {
		this.agenda.retract(this, context);
	}

	retractRight(context: Context) {
		this.agenda.retract(this, context);
	}

	retractLeft(context: Context) {
		this.agenda.retract(this, context);
	}

	assertLeft(context: Context) {
		this.__assertModify(context);
	}

	assertRight(context: Context) {
		this.__assertModify(context);
	}

	toString() {
		return "TerminalNode " + this.rule.name;
	}
}