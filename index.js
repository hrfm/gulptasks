(function() {

  "use strict;"

  // ------- EXPORTS ----------------------------------------------------------------

  module.exports = function( workDir ){
  	if( typeof workDir !== "undefined" ){
  		require('./src/utils/fileutil').init(workDir);
  	}
  	require('require-dir')( './src/tasks', { recurse: true } );

  	return require('gulp');

  }

}).call(this);
