/**
 * gulp/tasks/hive 以下のタスク内でよく使う処理をまとめたクラスです.
 *
 * @version 0.1
 * @author hrfm0818@gmail.com
 * @license MIT
 */
;(function(){

	"use strict;"

	var gutil = require('gulp-util');

	function _checkAndWatch( subtask, target ){
		if( typeof subtask === "undefined" || typeof target === "undefined" ){
			throw new gutil.PluginError("TaskHelper", "Invalid arguments. All arguments are required");
		}
		if( typeof target.watchWith === "undefined" || ( target.watchWith instanceof Array && target.watchWith.length == 0 ) ){
			subtask.watch(target.options);
		}else{
			subtask.watchWith(target.watchWith,target.options);
		}
	}

	var TaskHelper = function(){};

	/**
	 * 第1引数で指定したサブタスクを,第2引数で指定した内容で実行します.
	 *
	 * @param subtask
	 * @param target {options:any,watchWith?:string[]}
	 */
	TaskHelper.prototype.checkAndWatch = function checkAndWatch( subtask, target ){
		if( target instanceof Array ){
			// conf.target が配列の場合、それぞれを SubTask として実行する.
			for( var i=0; i<target.length; i++ ){
				_checkAndWatch(subtask,target[i]);
			}
		}else if( typeof target === "object" ){
			// conf.target が Object の場合、その内容を単体で SubTask として実行する.
			_checkAndWatch(subtask,target);
		}
	}

	module.exports = new TaskHelper();

}).call(this);