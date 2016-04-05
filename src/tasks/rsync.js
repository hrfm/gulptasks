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

    gulp.task("gulptasks::rsync", function() {
        var gutil = require('gulp-util');
    	var rsync = require('rsyncwrapper');
        rsync( config.config, function(error, stdout, stderr, cmd) {
            gutil.log(error,stdout,stderr,cmd);
        });
    });
	gulp.task("gt::rsync",["gulptasks::rsync"]);
	gulp.task("rsync"    ,["gulptasks::rsync"]);

	gulp.task("gulptasks::rsync.watch", function() {
        var src;
        if( typeof config.watchAs !== "undefined" ){
            src = config.watchAs;
        }else{
            src = config.config.src + "/**/*.*"
            src.replace(/\/\//ig,"/");
        }
	    gulp.watch( src, ['hive.rsync'] );
	});
	gulp.task("gt::rsync.watch",["gulptasks::rsync.watch"]);
	gulp.task("rsync.watch"    ,["gulptasks::rsync.watch"]);

}).call(this);