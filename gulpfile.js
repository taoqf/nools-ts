const gulp = require('gulp');
const packageJson = require('./package.json');

const tsc = require('gulp-typescript');
const del = require('del');
const sequence = require('gulp-sequence');

const dest = './dist/';

gulp.task('clean', function () {
	return del([dest, './dist-api/', './dist-umd/']);
});

gulp.task('compile-ts', (cb) => {
	const ts = require('gulp-typescript');
	const tsProject = ts.createProject('./tsconfig.json');
	tsProject.options.module = 1;	// commonjs
	const dest = tsProject.options.outDir;
	return tsProject.src()
		.pipe(tsProject())
		.pipe(gulp.dest(dest));
});

gulp.task('copy-files', async () => {
	return gulp.src(['./package.json', './typings.json', './readme.md', './src/interfaces.d.ts'])
		.pipe(gulp.dest(dest));
});

gulp.task('copy-parser', function () {
	require('./dist/compile/parser/constraint/grammar.js');
});

const uglyfly = require('gulp-uglyfly');
const babel = require('gulp-babel');

// const wp = require('webpack');
// const webpack = require('webpack-stream');

// const through = require('through');
// gulp.task('pack', function () {
// 	return gulp.src('./dist/index.js')
// 		.pipe((function (opts) {
// 			return through(function (file) {
// 				// file.named = path.basename(file.path, path.extname(file.path))
// 				file.named = 'nools-ts';
// 				this.queue(file);
// 			});
// 		})())
// 		.pipe(webpack({
// 			externals: [
// 				'fs','path', 'Buffer'
// 			],
// 			output: {
// 				publicPath: dest
// 			},
// 			module: {
// 				unknownContextCritical: true,

// 				exprContextRegExp: /$^/,
// 				exprContextCritical: false,

// 				wrappedContextCritical: true,
// 				loaders: [
// 					{ test: /\.(hson|json)$/, loader: 'hson' },
// 					{ test: /\.(tpl|nools|md)$/, loader: 'raw' }
// 				]
// 			}
// 		}))
// 		.pipe(babel({
// 			presets: ['es2015']
// 		}))
// 		// .pipe(uglyfly())
// 		.pipe(gulp.dest(dest));
// });

// const browserify = require('gulp-browserify');
// const rename = require('gulp-rename');

// gulp.task('pack', function () {
// 	return gulp.src('./dist/index.js', { read: false })
// 		.pipe(browserify({
// 			read: false,
// 			standalone: 'nools'
// 		}))
// 		.pipe(rename('nools-ts.js'))
// 		.pipe(gulp.dest('./dist/'))
// });

// browserify ./dist/index.js -s nools -o ./dist/nools-ts.js
const browserify = require('browserify');
const fs = require('fs');

gulp.task('browserify', function () {
	return browserify(['./dist/index.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/nools-ts.js'));
});

const rename = require('gulp-rename');
gulp.task('min', function () {
	return gulp.src('./dist/nools-ts.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('nools-ts.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('browserify2', function () {
	return browserify(['./dist/runtime.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/nools-ts.js'));
});

gulp.task('pack', function (cb) {
	sequence('browserify', 'min', cb);
});
gulp.task('pack2', function (cb) {
	sequence('browserify2', 'min', cb);
});

gulp.task('default', function (cb) {
	sequence('clean', 'copy-files', 'compile-ts', 'copy-parser', 'pack2', cb);
});

gulp.task('min-runtime', function () {
	return gulp.src('./dist/pack-runtime.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('runtime.js'))
		.pipe(gulp.dest('./dist/pack/'));
});
gulp.task('min-index', function () {
	return gulp.src('./dist/pack-index.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./dist/pack/'));
});
gulp.task('browserify-runtime', function () {
	return browserify(['./dist/runtime.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/pack-runtime.js'));
});
gulp.task('browserify-index', function () {
	return browserify(['./dist/index.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/pack-index.js'));
});
gulp.task('pack-test', function (cb) {
	sequence('browserify-runtime', 'min-runtime', 'browserify-index', 'min-index', cb);
});
gulp.task('test', function (cb) {
	sequence('clean', 'copy-files', 'compile-ts', 'copy-parser', 'pack-test', cb);
});

gulp.task('compile-ts-umd', (cb) => {
	const ts = require('gulp-typescript');
	const tsProject = ts.createProject('./tsconfig.json');
	tsProject.options.module = 3;	// umd
	const path = require('path');
	const dest = path.join(tsProject.options.outDir, 'umd');
	return gulp.src(['./src/**/*.ts'])
		.pipe(tsProject())
		.pipe(gulp.dest(dest));
});

gulp.task('dev', function (cb) {
	sequence('compile-ts', 'copy-parser', cb);
});

gulp.task('watch', () => {
	const ts = require('gulp-typescript');
	const tsProject = ts.createProject('./tsconfig.json');
	tsProject.options.module = 1;	// commonjs
	const outDir = tsProject.options.outDir;
	const path = require('path');
	return gulp.watch(['./src/**/*.ts'], (file) => {
		const tsProject = ts.createProject('./tsconfig.json');
		tsProject.options.module = 1;	// commonjs
		const relative = path.relative('./src/', path.dirname(file.path));
		const dest = path.join(outDir, relative);
		return gulp.src([file.path])
			.pipe(tsProject())
			.pipe(gulp.dest(dest));
	});
});
