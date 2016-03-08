/**
 * Sass ファイルの Compass でのコンパイルと監視を行うタスクです
 *
 * @usage configure : {
 *            config : {},// gulp-compass の設定
 *            target : {
 *                src:any,
 *                watchWith?:string[]
 *            }// 配列でも可能
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
	var gutil = require('gulp-util');
	var futil = require('../utils/fileutil');
	var config = futil.getConfig().compass;
	var taskHelper = require('../utils/taskhelper');

	var SubTask = require('gulp-subtask')(gulp);
	var	compass = require('gulp-compass');
	var plumber = require('gulp-plumber');
	var compassTask = new SubTask('compass').src('{{src}}').pipe( plumber ).pipe( compass, config.config );

	// ================================================================
	// --- Setup gulp task.
	// -------------------------------------------------------------

	gulp.task("hrfm::compass", function() {
		taskHelper.checkAndWatch( compassTask, config.target );
	});

}).call(this);