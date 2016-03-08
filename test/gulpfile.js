var gulp = require("gulp");
require('../index.js')(gulp,__dirname);
gulp.task('default',[
	'hrfm::compass',
	'hrfm::tsc',
	'hrfm::uglifyjs'
]);
