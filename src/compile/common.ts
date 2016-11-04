import isString from 'lodash-ts/isString';
import keys from 'lodash-ts/keys';

// export const modifiers = ["assert", "modify", "retract", "emit", "halt", "focus", "getFacts"];

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

export function createDefined(action: string | any, defined: Map<string, any>, scope: Map<string, any>) {
	if (isString(action)) {
		const declares = keys(defined).filter((name) => {
			return action.indexOf(name) !== -1;
		}).map((name) => {
			return `const ${name}=defined.get('${name}');`;
		}).concat(keys(scope).filter((name) => {
			return action.indexOf(name) !== -1;
		}).map((name) => {
			return `const ${name}= function(){const prop=scope.get('${name}'); return __objToStr__.call(prop)==='[object Function]' ? prop.apply(void 0, arguments) : prop;};`;
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

export function createFunction(body: string, defined: Map<string, any>, scope: Map<string, any>) {
	const declares: string[] = [];
	defined.forEach((v, k) => {
		if (body.indexOf(name) !== -1) {
			declares.push(`var ${name}= defined.${name};`);
		}
	});
	scope.forEach((v, k) => {
		if (body.indexOf(name) !== -1) {
			declares.push(`var ${name}= defined.${name};`);
		}
	});

	body = ["((function(){", declares.join(""), "\n\treturn ", body, "\n})())"].join("");
	try {
		return eval(body);
	} catch (e) {
		throw new Error("Invalid action : " + body + "\n" + e.message);
	}
}
