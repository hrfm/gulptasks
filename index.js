(function() {

  "use strict;"

  // ------- EXPORTS ----------------------------------------------------------------

  module.exports = function( gulp, workDir ){
  	require('./bridge').init( gulp );
  	if( typeof workDir !== "undefined" ){
  		require('./src/utils/fileutil').init(workDir);
  	}
  	require('require-dir')( './src/tasks', { recurse: true } );
  }

}).call(this);
