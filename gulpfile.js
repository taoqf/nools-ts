const gulp = require('gulp');
const packageJson = require('./package.json');

const tsc = require('gulp-typescript');
const del = require('del');
const sequence = require('gulp-sequence');

const tscProject = tsc.createProject('./tsconfig.json');

const src = tscProject.config.files || ['./typings/index.d.ts'];
const dest = './dist/';

gulp.task('clean', function () {
	return del(['./dist/', './dist-api/', './dist-umd/']);
});

gulp.task('compile-ts', function (cb) {
	return gulp.src(src.concat('./src/**/*.ts'))
		.pipe(tscProject())
		.pipe(gulp.dest(dest));
});

gulp.task('dts-generator', function (cb) {
	require('dts-generator').default({
		name: packageJson.name,
		// project: './',
		baseDir: './',
		rootDir: './src/',
		exclude: ['node-modules'],
		out: dest + 'typings/' + packageJson.name + '.d.ts',
		moduleResolution: 1,
		target: 1
	});
	cb();
});

const gulpCopy = require('gulp-copy');

gulp.task('copy-files', function () {
	return gulp.src(['./package.json', './typings.json', './readme.md'])
		.pipe(gulpCopy(dest));
});

gulp.task('copy-parser', function () {
	return gulp.src('./src/parser/constraint/parser.js')
		.pipe(gulp.dest('./dist/parser/constraint/'));
});

var wp = require('webpack');
var webpack = require('webpack-stream');
var uglyfly = require('gulp-uglyfly');
var babel = require('gulp-babel');

var through = require('through');
gulp.task('webpack', function () {
	return gulp.src('./dist/index.js')
		.pipe((function (opts) {
			return through(function (file) {
				// file.named = path.basename(file.path, path.extname(file.path))
				file.named = 'nools-ts';
				this.queue(file);
			});
		})())
		.pipe(webpack({
			externals: [
				'fs','path'
			],
			output: {
				publicPath: dest
			},
			module: {
				unknownContextCritical: true,

				exprContextRegExp: /$^/,
				exprContextCritical: false,

				wrappedContextCritical: true,
				loaders: [
					{ test: /\.(hson|json)$/, loader: 'hson' },
					{ test: /\.(tpl|nools|md)$/, loader: 'raw' }
				]
			}
		}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(gulp.dest(dest));
});

gulp.task('default', function (cb) {
	sequence('clean', 'copy-files', 'compile-ts', 'dts-generator', 'copy-parser', 'webpack', cb);
});

let jsdoc = require('gulp-jsdoc3');
gulp.task('api', (cb) => {
	let config = require('./jsdoc.json');
	return gulp.src('./package.json')
		.pipe(jsdoc(config));
});
