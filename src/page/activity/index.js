/*
* @Author: Administrator
* @Date:   2017-07-15 15:34:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-07-16 19:46:51
*/

'use strict';
require('./index.css');
require('../common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var templateIndex    = require('./index.string');
var _mm				 = require('util/mm.js');
var _user            = require('service/user-service.js');
var act = {
	 data : {
	 	times : 1
	 },
	init : function(){
		this.onload();
	},
	onload : function(){
		//加载中奖名单
		this.loadScreen();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//点击抽奖
		//抽奖次数
		
		$('.pointer-head').click(function(e){
			_user.getUserInfo(function(){
				_this.startRoll();
			},function(){
				window.location.href="./user-login.html"
			});
			
		});
		//点击分享
		$('.btn-share').click(function(){
			$('.share-modal').show();

		});
		$('.share-modal').find('.close').click(function(){
			$('.share-modal').hide();
			
		});
		//领取代金券
		$('.bg8-ul').find('li').click(function(){
			var award = this.getAttribute("data-award");
			alert("恭喜您，您已领取"+award);
		});
		//抢购
		$('.bg10-ul').find('li').click(function(){
			var buy = this.getAttribute("data-buy");
			alert(buy);
		});
		$('.bg12-ul').find('li').click(function(){
			var buy = this.getAttribute("data-buy");
			alert(buy);
		});
		$('#to_top').click(function(){
			window.pageScroll();
		});
	},
	// 返回顶部
	pageScroll : function(){
		var oTop = document.getElementById("to_top");
		var screenw = document.documentElement.clientWidth || document.body.clientWidth;
		var screenh = document.documentElement.clientHeight || document.body.clientHeight;
		oTop.style.left = screenw - oTop.offsetWidth +"px";
		oTop.style.top = screenh - oTop.offsetHeight + "px";
		window.onscroll = function(){
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		oTop.style.top = screenh - oTop.offsetHeight + scrolltop +"px";
		}
		oTop.onclick = function(){
		document.documentElement.scrollTop = document.body.scrollTop =0;
		}
	},
	//渲染滚动屏幕
	loadScreen : function(){
		// $('.pointer').html(templateIndex);
                var speed=40;
                var h2=document.getElementById("h2");
                var h1=document.getElementById("h1");
                var h=document.getElementById("h");
                h2.innerHTML=h1.innerHTML;
                function Marquee(){
                    if(h2.offsetTop-h.scrollTop<=0){
                        h.scrollTop-=h1.offsetHeight;
                    }                    
                    else{
                    h.scrollTop++;
                    }
                }
                var MyMar=setInterval(Marquee,speed);
                h.onmouseover=function() {clearInterval(MyMar)}
                h.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
	
	},
	//开始抽奖
	startRoll : function(){
		var _this = this;
		console.log(_this.data.times);
		var d =Math.floor(Math.random()*3600);
		var award = '';
		setTimeout(function(){alert(award)},3000);
		// 次数大于2，则需要分享
		if(_this.data.times<=2){
			$('.pointer-head').css('transform','rotate('+d+'deg)');
			 d = d%360;
			_this.data.times++;
			console.log(_this.data.times);
			if(d<=45){
				return award = "恭喜您获得2个月软件试用期";
			}
			else if(d<=45*2){
				return award = "恭喜您获得1个月软件试用期";
			}
			else if(d<=45*3){
				return award = "恭喜您获得10天软件试用期";
			}
			else if(d<=45*4){
				return award = "恭喜您获得15天金阳光使用期";
			}
			else if(d<=45*5){
				return award = "恭喜您获得1个月金阳光使用期";
			}
			else if(d<=45*6){
				return award = "恭喜您获得3张听课劵";
			}
			else if(d<=45*7){
			return award = "恭喜您获得5张听课劵";
			}
			else {
				return award = "恭喜您获得10个汇赢币";
			}

		}else{
				alert("您已超过次数，分享可以获得两次机会")
		 }
	}
};
$(function(){
	act.init();

});