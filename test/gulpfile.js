var gulp = require('../index.js')(__dirname);
gulp.task('default',[
	'hrfm::compass',
	'hrfm::tsc',
	'hrfm::uglifyjs'
]);
