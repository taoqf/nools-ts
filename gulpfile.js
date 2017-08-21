const gulp = require('gulp');
const sequence = require('gulp-sequence');
const shell = require('gulp-shell');

gulp.task('clean', shell.task('rm -rf ./dist/'));

gulp.task('compile-ts', shell.task('tsc'));
gulp.task('compile-ts-umd', shell.task('tsc -m umd --outDir ./dist/umd/'));

gulp.task('copy-files', () => {
	return gulp.src(['./package.json', './README.md'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy-parser', () => {
	require('./dist/compile/parser/constraint/grammar.js');
});

gulp.task('browserify', () => {
	const browserify = require('browserify');
	const fs = require('fs');
	return browserify(['./dist/index.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/nools-ts.js'));
});

gulp.task('min', () => {
	const rename = require('gulp-rename');
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	return gulp.src('./dist/nools-ts.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('nools-ts.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('browserify2', () => {
	const browserify = require('browserify');
	const fs = require('fs');
	return browserify(['./dist/runtime.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/nools-ts.js'));
});

gulp.task('min-runtime', () => {
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	const rename = require('gulp-rename');
	return gulp.src('./dist/pack-runtime.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('runtime.js'))
		.pipe(gulp.dest('./dist/pack/'));
});

gulp.task('min-index', () => {
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	return gulp.src('./dist/pack-index.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglyfly())
		.pipe(rename('index.js'))
		.pipe(gulp.dest('./dist/pack/'));
});

gulp.task('browserify-runtime', () => {
	const browserify = require('browserify');
	const fs = require('fs');
	return browserify(['./dist/runtime.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/pack-runtime.js'));
});

gulp.task('browserify-index', () => {
	const browserify = require('browserify');
	const fs = require('fs');
	return browserify(['./dist/index.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/pack-index.js'));
});

gulp.task('watch-ts', shell.task('tsc -w'));

gulp.task('pack2', sequence('browserify2', 'min'));

gulp.task('default', sequence('clean', 'copy-files', 'compile-ts', 'compile-ts-umd', 'copy-parser', 'pack2'));
