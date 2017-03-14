const gulp = require('gulp');
const packageJson = require('./package.json');

const tsc = require('gulp-typescript');
const del = require('del');
const sequence = require('gulp-sequence');

const src = ['./typings/index.d.ts', './src/**/*.ts'];
const dest = './dist/';

gulp.task('clean', function () {
	return del(['./dist/', './dist-api/', './dist-umd/']);
});

gulp.task('compile-ts', function (cb) {
	const tscProject = tsc.createProject('./tsconfig.json');
	return gulp.src(src)
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
	sequence('clean', 'copy-files', 'compile-ts', 'dts-generator', 'copy-parser', 'pack2', cb);
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

gulp.task('compile-ts-umd', function (cb) {
	const tsProject = tsc.createProject('./tsconfig.json');
	tsProject.options.module = 3;
	return gulp.src(src)
		.pipe(tsProject())
		.pipe(gulp.dest(dest + 'umd/'));
});

gulp.task('dev', function (cb) {
	sequence('compile-ts', 'copy-parser', cb);
});
