/**
 * Typescript ファイルのコンパイルと監視を行うタスクです.
 *
 * @usage configure : {
 *            config   : {},      // gulp-typescript の設定
 *            srcDir   : string,  // 監視対象となるディレクトリ,
 *            excludes : string[] // 監視対象から外すディレクトリの配列
 *        }
 * @version 0.2
 * @author hrfm0818@gmail.com
 * @license MIT
 */
;(function(){

	'use strict';

	// ================================================================
	// --- Import required modules.
	// -------------------------------------------------------------

	var gulp  = require('../../bridge').getGulp();
	var futil = require('../utils/fileutil');
	var config = futil.getConfig().tsc;
	var taskHelper = require('../utils/taskhelper');

	var SubTask = require('gulp-subtask')(gulp);
	var plumber = require('gulp-plumber');
	var tsc     = require('gulp-typescript');
	var tscTask = new SubTask('tsc')
		.src(['{{src}}','!**/*.d.ts','!*.d.ts'])
		.pipe( plumber )
		.pipe( tsc, config.config )
		.done(function(result,options){
			return result.js;
		})
		.pipe( gulp.dest, "{{outputDir}}" )
	;

	// ================================================================
	// --- Setup gulp task.
	// -------------------------------------------------------------

	gulp.task("gulptasks::tsc", function() {

		if( typeof config.targetDir !== "undefined" ){
			var fs = require('fs');
			fs.readdirSync(config.targetDir.srcDir).forEach(function (fileName) {
				if( fs.statSync(config.targetDir.srcDir+"/"+fileName).isDirectory() ){
					for( var i=0; i<config.targetDir.excludes.length; i++ ){
						if( config.targetDir.excludes[i] == fileName ){
							config.targetDir.excludes.splice(i,1);
							return;
						}
					}
					var options = {
						"options":{
							"src"       : config.targetDir.srcDir+"/"+fileName+"/**/*.ts",
							"outputDir" : config.targetDir.srcDir+"/"+fileName
						}
					};
					taskHelper.checkAndWatch(tscTask,options);
				}
			});
		}

		taskHelper.checkAndWatch( tscTask, config.target );

	});
	gulp.task("gt::tsc",["gulptasks::tsc"]);
	gulp.task("tsc"    ,["gulptasks::tsc"]);

}).call(this);