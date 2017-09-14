/*
* @Author: Administrator
* @Date:   2017-07-09 10:16:41
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-30 14:31:08
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart        = require('service/cart-service.js');
// var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');
var page = {
	data : {
		productId : _mm.getUrlParam('productId') || '',
	},
	init : function(){
		this.onLoad();
		this.bindEvent();	
	},
	onLoad : function(){
		if(!this.data.productId){
			_mm.gohome();
		}
		this.LoadDetail();
	},
	bindEvent : function(){
		var _this = this;
		// $(document).on('mouseenter','p-img',function(){
		// 	var imageUrl   = $(this).find('.p-img').attr('src');
		// 	$('.main-img').attr('src',imageUrl);
		// });
		 $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
		$(document).on('click', '.p-count-btn', function(){
	        var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
	            $pCount     = $('.p-count'),
	            currCount   = parseInt($pCount.val()),
	            minCount    = 1,
	            maxCount    = _this.data.detailInfo.stock || 1;
	        if(type === 'plus'){
	            $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
	        }
	        else if(type === 'minus'){
	            $pCount.val(currCount > minCount ? currCount - 1 : minCount);
	        }
	    });
	     // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
	},
	LoadDetail : function(){
		var _this 		= this,
			detailHtml  = '';
		_product.getProductDetial({
			productId : _this.data.productId
		},function(res){
			_this.filter(res);
			// 缓存住detail的数据
            _this.data.detailInfo = res;
			var detailHtml = _mm.renderHtml(templateIndex,res);
			$('.page-wrap').html(detailHtml);
		},function(){
			console.log("err");
			 $('.page-wrap').html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});	
	},
	filter : function(data){
		data.subImages = data.subImages.split(',');
	}	
};
$(function(){
	page.init();
});
