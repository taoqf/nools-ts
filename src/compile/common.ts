import isString from 'lodash-ts/isString';

export const modifiers = ["assert", "modify", "retract", "emit", "halt", "focus", "getFacts"];

// function createFunction(body: string, defined, scope, scopeNames, definedNames) {
// 	const declares = [];
// 	forEach(definedNames, function (i) {
// 		if (body.indexOf(i) !== -1) {
// 			declares.push("const " + i + "= defined." + i + ";");
// 		}
// 	});

// 	forEach(scopeNames, function (i) {
// 		if (body.indexOf(i) !== -1) {
// 			declares.push("const " + i + "= scope." + i + ";");
// 		}
// 	});
// 	body = ["((function(){", declares.join(""), "\n\treturn ", body, "\n})())"].join("");
// 	try {
// 		return eval(body);
// 	} catch (e) {
// 		throw new Error("Invalid action : " + body + "\n" + e.message);
// 	}
// };

export function createDefined(action: string | any, defined: {
	[name: string]: any;
}, scope: {
	[name: string]: any;
}) {
	if (isString(action)) {
		const declares = Object.keys(defined).filter((name) => {
			return action.indexOf(name) !== -1;
		}).map((name) => {
			return "const " + name + "= defined." + name + ";";
		}).concat(Object.keys(scope).filter((name) => {
			return action.indexOf(name) !== -1;
		}).map((name) => {
			return "const " + name + "= function(){const prop = scope." + name + "; return __objToStr__.call(prop) === '[object Function]' ? prop.apply(void 0, arguments) : prop;};";
		}));

		if (declares.length) {
			declares.unshift("const __objToStr__ = Object.prototype.toString;");
		}
		action = [declares.join(""), "return ", action, ";"].join("");
		action = new Function("defined", "scope", action)(defined, scope);
	}
	const ret = action.hasOwnProperty("constructor") && "function" === typeof action.constructor ? action.constructor : function (opts: any) {
		opts = opts || {};
		for (const i in opts) {
			if (i in action) {
				this[i] = opts[i];
			}
		}
	};
	const proto = ret.prototype;
	for (const i in action) {
		proto[i] = action[i];
	}
	return ret;
}

export function createFunction(body: string, defined: {
	[name: string]: any;
}, scope: {
	[name: string]: any;
}, scopeNames: string[], definedNames: string[]) {
	const declares = definedNames.filter((name) => {
		return body.indexOf(name) !== -1;
	}).map((name) => {
		return "var " + name + "= defined." + name + ";";
	}).concat(scopeNames.filter((name) => {
		return body.indexOf(name) !== -1;
	}).map((name) => {
		return "var " + name + "= scope." + name + ";";
	}));

	body = ["((function(){", declares.join(""), "\n\treturn ", body, "\n})())"].join("");
	try {
		return eval(body);
	} catch (e) {
		throw new Error("Invalid action : " + body + "\n" + e.message);
	}
}
