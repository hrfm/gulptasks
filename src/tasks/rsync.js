/**
 * ファイル更新を監視して rsync を行うタスク.
 * 
 * @usage configure : {
 *            config : {},// rsync の設定
 *            target : {
 *                watchWith?:string[]
 *            }
 *        }
 * @version 0.1
 * @author hrfm0818@gmail.com
 * @license MIT
 */
;(function(){

	'use strict';

	// ================================================================
	// --- Import required modules.
	// -------------------------------------------------------------

	var gulp   = require('../../bridge').getGulp();
	var futil  = require('../utils/fileutil');
	var config = futil.getConfig().rsync;
	
	// ================================================================
	// --- Setup gulp task.
	// -------------------------------------------------------------

    gulp.task("hrfm::rsync", function() {
        var gutil = require('gulp-util');
    	var rsync = require('rsyncwrapper');
        rsync( config.config, function(error, stdout, stderr, cmd) {
            gutil.log(error,stdout,stderr,cmd);
        });
    });

	gulp.task("hrfm::rsync:watch", function() {
    	var src = config.config.src + "/**/*.*"
	    src.replace(/\/\//ig,"/");
	    gulp.watch( src, ['hive.rsync'] );
	});

}).call(this);