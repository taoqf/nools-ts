function plucked(prop: string) {
	const exec = prop.match(/(\w+)\(\)$/);
	if (exec) {
		prop = exec[1];
		return function (item: any) {
			return item[prop]();
		};
	} else {
		return function (item: any) {
			return item[prop];
		};
	}
}

export function plucker<T>(prop: string) {
	const props = prop.split(".");
	if (props.length === 1) {
		return plucked(props[0]);
	} else {
		const pluckers = props.map((prop) => {
			return plucked(prop);
		});
		const l = pluckers.length;
		return function (item: T) {
			let i = -1, res = item;
			while (++i < l) {
				res = pluckers[i](res);
			}
			return res;
		};
	}
}

export function removeDups<T>(arr: T[]) {
	return arr.filter((it, idx) => {
		return arr.indexOf(it, ++idx) == -1;
	});
}
