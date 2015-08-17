var config = require('../config'),
    gulp = require('gulp');

module.exports = function(taskName) {

    gulp.task(taskName, ['cleanHtml'], function () {

        return gulp.src(config.html.src)
            .pipe(gulp.dest(config.html.dest));
    });
};
