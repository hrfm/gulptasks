/**
 * Sass ファイルの Compass でのコンパイルと監視を行うタスクです
 *
 * @usage configure : {
 *            config : {},// gulp-uglify の設定
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
    var config = futil.getConfig().uglify;
    var taskHelper = require('../utils/taskhelper');

    var SubTask = require('gulp-subtask')(gulp);
    var	uglify  = require('gulp-uglify');
    var plumber = require('gulp-plumber');
    var uglifyTask = new SubTask('gt::uglify').src('{{src}}')
        .pipe( plumber )
        .pipe( uglify, config.config)
        .pipe( gulp.dest, config.dest );
    
    // ================================================================
    // --- Setup gulp task.
    // -------------------------------------------------------------

    gulp.task("gulptasks::uglify", function() {
        taskHelper.checkAndWatch( uglifyTask, config.target );
    });
    gulp.task("gt::uglify",["gulptasks::uglify"]);
    gulp.task("uglify"    ,["gulptasks::uglify"]);

}).call(this);
