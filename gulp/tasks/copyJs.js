var config = require('../config'),
    gulp = require('gulp');

module.exports = function(taskName) {

    gulp.task(taskName, ['cleanJs'], function () {

        return gulp.src(config.js.src)
            .pipe(gulp.dest(config.js.dest));
    });
};
