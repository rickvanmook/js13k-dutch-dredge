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
    clean = 'dist';

exports.clean = clean;
exports.html = html;
exports.styles = styles;