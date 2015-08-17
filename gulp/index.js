var fs = require('fs'),
	onlyScripts = require('./util/scriptFilter'),
	getTaskNameByFile = require('./util/getTaskNameByFile'),
	tasksFiles = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);

tasksFiles.forEach(function(taskFile) {

	var taskName = getTaskNameByFile(taskFile);

	require('./tasks/' + taskFile)(getTaskNameByFile(taskName));
});

