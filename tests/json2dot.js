const fs = require('fs');
const root = './tests/';
const dirs = fs.readdirSync(root);
const path = require('path');

const nodeType = {};
// notNodeType = 'not' | 'exists';
nodeType[nodeType["not"] = 0] = "not";
nodeType[nodeType["exists"] = 1] = "exists";
// joinNodeType = 'join' | 'from' | 'from-not' | 'exists-from' | notNodeType
nodeType[nodeType["join"] = 2] = "join";
nodeType[nodeType["from"] = 3] = "from";
nodeType[nodeType["from_not"] = 4] = "from_not";
nodeType[nodeType["exists_from"] = 5] = "exists_from";
// betaNodeType = 'beta' | joinNodeType
nodeType[nodeType["beta"] = 6] = "beta";
// adapterNodeType = 'leftadapter' | 'rightadapter'
nodeType[nodeType["leftadapter"] = 7] = "leftadapter";
nodeType[nodeType["rightadapter"] = 8] = "rightadapter";
// alphaNodeType = 'type' | 'alias' | 'equality' | 'property'
nodeType[nodeType["type"] = 9] = "type";
nodeType[nodeType["alias"] = 10] = "alias";
nodeType[nodeType["equality"] = 11] = "equality";
nodeType[nodeType["property"] = 12] = "property";
// nodeType = 'terminal' | 'join-reference' | alphaNodeType | adapterNodeType | betaNodeType
nodeType[nodeType["terminal"] = 13] = "terminal";
nodeType[nodeType["join_reference"] = 14] = "join_reference";

dirs.filter((dir) => {
	const d = path.join(root, dir);
	return /\.json$/.test(dir) && fs.existsSync(d) && fs.statSync(d).isFile();
}).forEach((dir) => {
	const data = require('./' + dir);
	const typeNodes = data.r.tps;

	const nodes = data.r.ns;

	// 1. draw all the nodes
	const all_nodes = nodes.map((n, i) => {
		return `"${i}" [label="${i}.${nodeType[n.tp]}"];`;
	}).join('\n\t');

	const s = new Set();
	// 2. draw relation
	typeNodes.forEach((id, i) => {
		const r = `root -> ${id};`;
		s.add(`root -> ${id};`)
		const node = nodes[id];
		node.ns && node.ns.forEach(trans, {
			n: id
		});
	});

	function trans([id, p]) {
		const parent = this.n;
		const r = `${parent} -> ${id};`;
		if (!s.has(r)) {
			s.add(r);
			const n = nodes[id];
			n.ns && n.ns.forEach(trans, {
				n: id
			});
		}
	}
	const r = [];
	s.forEach((rl) => {
		r.push(rl);
	});
	const relation = r.join('\n\t');

	const script = `
digraph G {
	fontname="sans-serif";
	penwidth="0.1";
	edge [comment="Wildcard edge",
		fontname="sans-serif",
		fontsize=10,
		colorscheme="blues3",
		color=2,
		fontcolor=3];
	node [fontname="serif",
		fontsize=13,
		fillcolor="1",
		colorscheme="blues4",
		color="2",
		fontcolor="4",
		style="filled"];
	"root";
	${all_nodes}
	${relation}
}`;
	const file = path.join(root, dir).replace(/\.json$/i, '.dot');
	console.log('saving file:', file);
	fs.writeFileSync(file, script);
	console.log('saved.');
});
console.log('done');
process.exit(0);
