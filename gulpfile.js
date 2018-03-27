const gulp = require('gulp');
const sequence = require('gulp-sequence');
const shell = require('gulp-shell');

gulp.task('clean', shell.task('rm -rf ./dist/'));

gulp.task('compile-ts', shell.task('tsc -m commonjs'));
gulp.task('compile-ts-umd', shell.task('tsc -m umd --outDir ./dist/umd/'));
gulp.task('compile-ts-es', shell.task('tsc -m esnext --outDir ./dist/es/'));

gulp.task('copy-files', () => {
	return gulp.src(['./package.json', './README.md'])
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy-parser', () => {
	require('./dist/compile/parser/constraint/grammar.js');
	require('./dist/es/compile/parser/constraint/grammar.js');
});

gulp.task('browserify-runtime', () => {
	const browserify = require('browserify');
	const fs = require('fs');
	return browserify(['./dist/runtime.js'], {
		standalone: 'nools'
	})
		.bundle()
		.pipe(fs.createWriteStream('./dist/rt.js'));
});

gulp.task('min-runtime', () => {
	const rename = require('gulp-rename');
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	return gulp.src('./dist/rt.js')
		.pipe(babel())
		.pipe(uglyfly())
		.pipe(rename('rt.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('runtime', sequence('browserify-runtime', 'min-runtime'));

gulp.task('browserify-nools', () => {
	const rename = require('gulp-rename');
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	return gulp.src('./dist/index.js')
		.pipe(babel())
		.pipe(uglyfly())
		.pipe(rename('nools.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('min-nools', () => {
	const rename = require('gulp-rename');
	const uglyfly = require('gulp-uglyfly');
	const babel = require('gulp-babel');
	return gulp.src('./dist/nools.js')
		.pipe(babel())
		.pipe(uglyfly())
		.pipe(rename('nools.min.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('watch-ts', shell.task('tsc -w'));

gulp.task('nools', sequence('browserify-nools', 'min-nools'));

gulp.task('default', sequence('clean', 'copy-files', 'compile-ts', 'compile-ts-umd', 'compile-ts-es', 'copy-parser', ['runtime', 'nools']));
