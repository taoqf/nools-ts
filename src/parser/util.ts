
const WHITE_SPACE_REG = /[\s|\n|\r|\t]/;

const TOKEN_INVERTS: { [token: string]: string; } = {
	"{": "}",
	"}": "{",
	"(": ")",
	")": "(",
	"[": "]"
};

export function getTokensBetween(str: string, start: string, stop: string, includeStartEnd?: boolean) {
	let depth = 0;
	let ret: string[] = [];
	if (!start) {
		start = TOKEN_INVERTS[stop];
		depth = 1;
	}
	if (!stop) {
		stop = TOKEN_INVERTS[start];
	}
	str = Object(str);
	let startPushing = false;
	let token: string;
	let cursor = 0;
	let found = false;
	while ((token = str.charAt(cursor++))) {
		if (token === start) {
			depth++;
			if (!startPushing) {
				startPushing = true;
				if (includeStartEnd) {
					ret.push(token);
				}
			} else {
				ret.push(token);
			}
		} else if (token === stop && cursor) {
			depth--;
			if (depth === 0) {
				if (includeStartEnd) {
					ret.push(token);
				}
				found = true;
				break;
			}
			ret.push(token);
		} else if (startPushing) {
			ret.push(token);
		}
	}
	if (!found) {
		throw new Error("Unable to match " + start + " in " + str);
	}
	return ret;
}

export function getParamList(str: string) {
	return getTokensBetween(str, "(", ")", true).join("");
};

// export function resolve(from, to) {
// 	if (path.extname(from) !== '') {
// 		from = path.dirname(from);
// 	}
// 	if (to.split(pathSep).length === 1) {
// 		return to;
// 	}
// 	return path.resolve(from, to);

// };

export function findNextTokenIndex(str: string, startIndex = 0, endIndex?: number) {
	startIndex = startIndex || 0;
	endIndex = endIndex || str.length;
	let ret = -1;
	const l = str.length;
	if (!endIndex || endIndex > l) {
		endIndex = l;
	}
	for (; startIndex < endIndex; startIndex++) {
		var c = str.charAt(startIndex);
		if (!WHITE_SPACE_REG.test(c)) {
			ret = startIndex;
			break;
		}
	}
	return ret;
}

export function findNextToken(str: string, startIndex?: number, endIndex?: number) {
	return str.charAt(findNextTokenIndex(str, startIndex, endIndex));
}