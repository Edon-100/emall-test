/*
* @Author: Administrator
* @Date:   2017-07-27 15:13:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-27 15:36:25
*/

'use strict';
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide         = require('page/common/nav-side/index.js');
$(function(){
	 navSide.init({
            name: 'about'
        });
});