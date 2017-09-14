/*
* @Author: Administrator
* @Date:   2017-07-05 08:19:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-05 10:03:00
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var page = {
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		// 初始化左侧菜单
        navSide.init({
            name: 'pass-update'
        });
        this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		// 点击提交后
		$(document).on('click','.btn-submit',function(){
			console.log('点击');
			// 获取用户输入信息
			var userInfo = {
				password  			: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#passwordNew').val()),
				passwordConfirm 	: $.trim($('#passwordConfirm').val())
			},
			validateRusult = _this.validateForm(userInfo);
			if(validateRusult.status){
				_user.updatePassword({
					 passwordOld : userInfo.password,
                    passwordNew  : userInfo.passwordNew
				},function(res){
					_mm.successTips(res);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateRusult.msg);
			}
		});
	},
	//验证字段
	validateForm : function(userInfo){
		var result ={
			status : false,
			msg   : ''
		};
		//旧密码不能为空
		if(!_mm.validate(userInfo.password,'require')){
			result.msg='原密码不能为空';
			return result;
		} 
		//新密码不能为空
		if(!_mm.validate(userInfo.passwordNew,'require')){
			result.msg='新密码不能为空';
			return result;
		}
		// 两次密码是否一致
		if(userInfo.passwordNew !== userInfo.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		result.status = true;
		result.data	  = '验证通过';
		return result;
	}

};
$(function(){
	page.init();
});