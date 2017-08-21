module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['mocha', 'should'],
		files: [
			'./*.test.js'
		],
		webpack: {
			// module: {
			// 	rules: [{
			// 		test: /\.js$/,
			// 		// exclude: /(node_modules|bower_components)/,
			// 		exclude: /core-js|babel/,
			// 		use: {
			// 			loader: 'babel-loader',
			// 			options: {
			// 				presets: ['env'],
			// 				plugins: ['transform-runtime']
			// 			}
			// 		}
			// 	}]
			// }
		},
		webpackServer: { noInfo: true },
		plugins: [
			'karma-mocha',
			'karma-should',
			'karma-webpack',
			'karma-mocha-reporter',
			'karma-chrome-launcher',
			// 'karma-phantomjs-launcher'
		],
		coverageReporter: {
			type: 'html'
		},
		preprocessors: {
			'**/*.test.js': ['webpack']
		},
		reporters: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		// browsers: ['PhantomJS'],
		singleRun: true
	});
};
