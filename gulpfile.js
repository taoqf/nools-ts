const gulp = require('gulp');
const sequence = require('gulp-sequence');

gulp.task('clean', () => {
	const del = require('del');
	return del('./dist/');
});

gulp.task('compile-ts', () => {
	const ts = require('gulp-typescript');
	const tsProject = ts.createProject('./tsconfig.json');
	tsProject.options.module = 1;	// commonjs
	const dest = tsProject.options.outDir;
	return tsProject.src()
		.pipe(tsProject())
		.pipe(gulp.dest(dest));
});

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

const rename = require('gulp-rename');
gulp.task('min', () => {
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
		const dest = path.join(outDir, relative, 'umd');
		return gulp.src([file.path])
			.pipe(tsProject())
			.pipe(gulp.dest(dest));
	});
});

gulp.task('pack2', sequence('browserify2', 'min'));

gulp.task('default', sequence('clean', 'copy-files', 'compile-ts', 'compile-ts-umd', 'copy-parser', 'pack2'));
