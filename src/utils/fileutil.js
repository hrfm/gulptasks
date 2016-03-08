/**
 * src/tasks の環境内でのファイルの扱いを手助けするユーティリティクラスです.
 * 主に config ファイルの読み込みと、パスの解決に用います.
 * 
 * @version 0.1
 * @author hrfm0818@gmail.com
 * @license MIT
 */
;(function(){

	"use strict;"

	var fs     = require('fs');
	var path   = require('path');
	var extend = require('extend');

	var WORK_DIR  = undefined;
	var FileUtils = function(){};

	FileUtils.prototype.init = function init( workDir ){
		WORK_DIR = workDir;
	}

	FileUtils.prototype.getWorkDir = function getWorkDir(){
		return this.getConfig().workDir;
	}

	FileUtils.prototype.getRelativeFromWorkDir = function getRelativeFromWorkDir( filePath ){
		return path.resolve( this.getWorkDir(), filePath );
	}

	FileUtils.prototype.getConfig = function getConfig(){

		if( typeof this.config === "undefined" ){

			var filePath, config = {};

			// Load config.js file on parent directory
			filePath = path.join(__dirname,'../')+"/config.js";
			if( fs.existsSync(filePath) ){
				config = extend(true,config,require(filePath));
			}

			// Check root and update working directory.
			var workDir = WORK_DIR ? WORK_DIR : config.workDir;
			if( workDir.indexOf(".") == 0 ){
				workDir = path.join(__dirname,"../"+workDir);
			}
			config.workDir = workDir;

			// Check gulp.config.js file on root directory
			filePath = workDir+"/gulptasks.config.js";
			if( fs.existsSync(filePath) ){
				config = extend(true,config,require(filePath));
			}

			this.config = config;
			
		}

		return this.config;

	};

	module.exports = new FileUtils();

}).call(this);