var	styles = {
		src: 'src/assets/styles/**/*.scss',
		dest: 'dist/assets/styles'
	},
    html = {
        src:[
            'src/**/*.html'
        ],
        dest:'dist',
        clean:'dist/**/*.html'
    },
    js = {
        src:[
            'src/**/*.js'
        ],
        dest:'dist',
        clean:'dist/**/*.js'
    },
    uglify = {
        src:[
            'dist/**/*.js'
        ],
        dest:'dist',
        clean:'dist/**/*.js'
    },
    clean = 'dist';

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.uglify = uglify;
exports.styles = styles;