var argv = require('yargs').argv;

global.isProd = argv.production;

require('./gulp/index');