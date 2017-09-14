/*
* @Author: Administrator
* @Date:   2017-06-21 21:19:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-05 09:11:02
*/
'use strict';
// require('../module.js');
require('./index.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	submit : function(){
		var formData ={
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
		},
		 // 表单验证结果
		validateResult = this.formValidata(formData);
			// if(validateResult.status){
			// 	_user.login(formDate,function(res){
			// 		window.location.href = _mm.getUrlParam('redirect') || './index.html';
			// 	},function(errMsg){
			// 			formError.show(errMsg);
			// 	});
			// }
			// else{
			//  // 错误提示
   //         		 formError.show(validateResult.msg);
			// }
			    if(validateResult.status){
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }
	},
	//表单字段的验证
	formValidata : function(formDate){
		var result = {
			status : false,
			msg    : ''
		};
		if(!_mm.validate(formDate.username,'require')){
			result.msg = '账号不能为空';
			return result;
		}
		if(!_mm.validate(formDate.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg	  = "验证通过";
		return result;
	}
};
$(function(){
	page.init();
});