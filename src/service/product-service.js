/*
* @Author: Administrator
* @Date:   2017-07-07 10:31:25
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-09 10:36:49
*/

'use strict';
var _mm = require('util/mm.js');

var _product = {
    // 用户登录
    getProductList : function(listParam, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    getProductDetial : function(productId,resolve,reject){
    	_mm.request({
    		url     : _mm.getServerUrl('/product/detail.do'),
    		data    : productId,
            success : resolve,
            error   : reject
    	});
    }

};
module.exports = _product;