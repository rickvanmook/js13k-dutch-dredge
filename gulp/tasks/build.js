var gulp = require('gulp'),
	runSequence = require('run-sequence');

module.exports = function(taskName) {

	gulp.task(taskName, ['clean'], function (cb) {

		cb = cb || function (e) {
		};

		var args = ['styles', 'copyHtml', 'copyJs'];

		if (!global.isProd) {

			args.push('watch', 'browserSync');
		}

		args.push(cb);

		return runSequence.apply(this, args);
	});
};