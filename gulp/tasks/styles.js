var config = require('../config'),
	gulp = require('gulp'),
	sass = require('gulp-sass'),
	handleErrors = require('../util/handleErrors'),
	autoprefixer = require('gulp-autoprefixer');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		return gulp.src(config.styles.src)
			.pipe(sass({
				sourceComments: global.isProd ? 'none' : 'map',
				sourceMap: 'sass',
				outputStyle: global.isProd ? 'compressed' : 'expanded'
			}))
			.on('error', handleErrors)
			.pipe(gulp.dest(config.styles.dest));

	});
};