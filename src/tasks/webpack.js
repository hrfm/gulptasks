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
    var futil = require('../utils/fileutil');

    // ================================================================
    // --- Setup gulp task.
    // -------------------------------------------------------------

    gulp.task("gt::webpack", function() {
        var gutil   = require('gulp-util');
        var path    = require("path");
        var webpack = require('webpack');
        var wpconf  = require(path.relative(__dirname,futil.getWorkDir())+"/"+futil.getConfig().webpack.config);
        webpack(
            wpconf,
            function(err, stats) {
                if(err){ throw new gutil.PluginError("webpack", err); }
                gutil.log("[webpack]", stats.toString({
                    // output options
                }));
            }
        );
    });
    gulp.task("gt::webpack",["gulptasks::webpack"]);
    gulp.task("webpack"    ,["gulptasks::webpack"]);

    gulp.task("gt::webpack.watch", function() {
        var path    = require("path");
        var wpconf  = require(path.relative(__dirname,futil.getWorkDir())+"/"+futil.getConfig().webpack.config);
        for( var key in wpconf.entry ){
            gulp.watch( wpconf.entry[key], ['hive.webpack'] );
        }
    });
    gulp.task("gt::webpack.watch",["gulptasks::webpack.watch"]);
    gulp.task("webpack.watch"    ,["gulptasks::webpack.watch"]);

}).call(this);