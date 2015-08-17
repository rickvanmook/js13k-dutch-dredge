var path = require('path');

module.exports = function(filePath) {

	return path.basename(filePath, path.extname(filePath));
};