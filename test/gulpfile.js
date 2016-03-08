var gulp = require("gulp");
require('../index.js')(gulp,__dirname);
gulp.task('default',[
	'gt::compass',
	'gt::tsc',
	'gt::uglifyjs'
]);
