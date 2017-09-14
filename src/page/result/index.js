/*
* @Author: Administrator
* @Date:   2017-06-27 17:13:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-03 21:53:39
*/

'use strict';
require('./index.css');
require('../common/nav-simple/index.js');
var _mm = require('util/mm.js');
$(function(){
	var type = _mm.getUrlParam('type');
	$('.'+type+'-success').show();
});