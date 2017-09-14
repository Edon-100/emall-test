/*
* @Author: Administrator
* @Date:   2017-06-21 15:16:24
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-23 12:56:49
*/
'use strict';
require('./index.css');
require('../common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var _mm 			= require('util/mm.js');
var templateBanner  = require('./banner.string');
$(function(){
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);

	var $slider = $('.banner').unslider({
        keys: true,
        dots: true
    });
    $('.banner-arrow').click(function(){
    	var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forward]();
    });

});
