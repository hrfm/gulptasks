/**
 * @version 0.1
 * @author hrfm0818@gmail.com
 * @license MIT
 */
;(function(){
	"use strict;"
	var _gulp;
	var GulpBridge = function(){};
	GulpBridge.prototype.init = function init(gulp){
		_gulp = gulp;
	}
	GulpBridge.prototype.getGulp = function getGulp(){
		return _gulp;
	}
	module.exports = new GulpBridge();
}).call(this);