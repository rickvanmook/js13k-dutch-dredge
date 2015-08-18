var config = require('../config'),
	gulp = require('gulp');

module.exports = function(taskName) {

	gulp.task(taskName, function () {

		gulp.watch(config.styles.src, ['styles']);
        gulp.watch(config.html.src, ['copyHtml']);
        gulp.watch(config.js.src, ['copyJs']);
	});
};