/*
* @Author: Administrator
* @Date:   2017-07-11 12:24:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-12 12:20:32
*/

'use strict';
require('./index.css');
require('page/common/header/index.js');
var nav = require('page/common/nav/index.js');
var _mm             = require('util/mm.js');
var _product        = require('service/product-service.js');
var _cart        = require('service/cart-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

var page = {
	data : {

	},
    init : function(){
    	// console.log('init');
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    	this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
    // 选择商品、取消商品
        $(document).on('click','.cart-select',function(){
           var $this    = $(this),
            productId   = $this.parents('.cart-table').data('product-id');
            //如果在网页中选中了，则请求接口那边也选中
            if($this.is(':checked')){
                _cart.selectProduct(productId,function(res){
                     _this.renderCart(res);
                },function(){
                    _this.showCartError();
                });
            }else{
                _cart.unselectProduct(productId,function(res){
                     _this.renderCart(res);
                },function(){
                    _this.showCartError();
                    });
            }
        });
    // 全选/取消全选
        $(document).on('click','.cart-select-all',function(){
             var $this    = $(this);
            if($this.is(':checked')){
            _cart.selectAllProduct(function(res){
                _this.renderCart(res);
            },function(errMsg){
                _this.showCartError();
            });    
            }else{
                 _cart.unselectAllProduct(function(res){
                     _this.renderCart(res);
                },function(){
                    _this.showCartError();
                });
            }
        });
    //数量加载
    $(document).on('click','.count-btn',function(){
        var $this       = $(this),
            type        = $this.hasClass('plus') ? 'plus' : 'minus' ,
            $pCount     = $('.count-input'),
            currCount   = parseInt($pCount.val()),
            maxCount    = parseInt($pCount.data('max')),
            minCount    = 1,
            newCount    = 0,
            productId   = $this.parents('.cart-table').data('product-id');
            // 如果点是plus
            // console.log(typeof($pCount.val()));
            // console.log(typeof($pCount.data('max')));
            // console.log(typeof(parseInt($pCount.data('max'))));
            if(type === 'plus'){
                // 如果 没有库存了
                if(currCount >= maxCount){
                    _mm.errorTips('该商品数量已达到上限');
                }
                newCount = currCount + 1 ; 
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });
    });
   // 删除单个商品
        $(document).on('click', '.cart-delete', function(){
            if(window.confirm('确认要删除该商品？')){
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-selected', function(){
            if(window.confirm('确认要删除选中的商品？')){
                var arrProductIds = [],
                    $selectedItem = $('.cart-select:checked');
                // 循环查找选中的productIds
                for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++){
                    arrProductIds
                        .push($($selectedItem[i]).parents('.cart-table').data('product-id'));
                }
                if(arrProductIds.length){
                    _this.deleteCartProduct(arrProductIds.join(','));
                }
                else{
                    _mm.errorTips('您还没有选中要删除的商品');
                }  
            }
        });
        // 提交购物车
        $(document).on('click', '.btn-submit', function(){
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './order-confirm.html';
            }else{
                _mm.errorTips('请选择商品后再提交');
            }
        });
    },
    // 加载购物车
    loadCart : function(){
    	var _this = this;
    	// 获取购物车列表
        _cart.getCartList(function(res){
            _this.renderCart(res);
        }, function(){
            _this.showCartError();
        })
        nav.loadCartCount();

    },
    renderCart : function(data){
    	// 看列表是否为空
    	this.filter(data);
    	//缓存起来
    	this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex, this.data.cartInfo);
        $('.page-wrap').html(cartHtml);
    },
    filter : function(data){
    	// 强转为布尔
    	
    	data.notEmpty = !!data.cartProductVoList.length;
    },
     // 删除指定商品，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    // 显示错误信息
    showCartError: function(){
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧。</p>');
    }
};
$(function(){
    page.init();
})