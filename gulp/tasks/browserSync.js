var browserSync = require('browser-sync').create(),
    gulp = require('gulp');

module.exports = function(taskName) {

    gulp.task(taskName, function () {

        browserSync.init({
            server: {
                baseDir: './dist'
            }
        });

        gulp.watch('dist/**').on('change', browserSync.reload);
    });
};