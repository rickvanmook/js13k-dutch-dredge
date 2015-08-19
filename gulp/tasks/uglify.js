var config = require('../config'),
    gulp = require('gulp'),
    uglify = require('gulp-uglify');

module.exports = function(taskName) {

    gulp.task(taskName, function () {

        return gulp.src(config.uglify.src)
            .pipe(uglify())
            .pipe(gulp.dest(config.uglify.dest));
    });
};
