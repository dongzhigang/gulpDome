var phpPath = "http://192.168.1.17/teapot/api/";
;(function(){
	//获取视窗宽度
	var htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
	//获取视窗高度
	var htmlDom = document.getElementsByTagName('html')[0];
	if(htmlWidth > 750){
	  htmlDom.style.fontSize = 750/20 + "px";
	}else{
	  htmlDom.style.fontSize = htmlWidth/20 + "px";
	}
})();

//商品类型切换
$(".food_menu").on("click","label",function(){
	$(this).addClass("active");
	$(this).parent().siblings().children().removeClass("active");

	if($(this).data("type") == "sort"){
		
	}
})

//加载中
var loading = function(hasLoad){
	var html = '<div class="loading" id="d_list_load">'
		 	+'<div class="spinner">'
				+'<div class="spinner-container container1">'
					+'<div class="circle1"></div>'
					+'<div class="circle2"></div>'
					+'<div class="circle3"></div>'
					+'<div class="circle4"></div>'
				+'</div>'
				+'<div class="spinner-container container2">'
				    +'<div class="circle1"></div>'
				    +'<div class="circle2"></div>'
				    +'<div class="circle3"></div>'
				    +'<div class="circle4"></div>'
				+'</div>'
				+'<div class="spinner-container container3">'
					+'<div class="circle1"></div>'
					+'<div class="circle2"></div>'
					+'<div class="circle3"></div>'
					+'<div class="circle4"></div>'
				+'</div>'
			+'</div>'
		+'</div>';
	if(hasLoad){
		$("body").append(html);
	}else{
		$("body").children().eq(-1).remove()
	}
}
//触底加载
var baseLoad = function(hasBase,that){
	var html = 	'<div class="d_baseLoad">'
					+'<span></span>'
					+'<span></span>'
					+'<span></span>'
					+'<span></span>'
					+'<span></span>'
				+'</div>';
	if(hasBase){
		$(that).append(html);
	}else{
		$(that).children().last().remove()
	}
}
// 加载到底
var loadEnd = function(hasLoadEnd){
	var html = '<div class="d_loadEnd">我是有底线的</div>';
	if(hasLoadEnd){
		$("body").append(html);
		console.log(html)
	}else{
		$("body").children().eq(-1).remove()
	}
}

//获取url参数
var GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return decodeURI(r[2]);
    return null;
}

//提示框
var promptMsg = function(msg){
	 var html =  '<div class="msgBox"><span>'+msg+'</span></div>';
	 $("body").append(html);
	 setTimeout(function(){
	 	$("body").children().eq(-1).remove()
	 },1000)

}
//判断列表是否有数据
var hasListData = function(has){
	var html = '<div class="hasListData">'
				+'<img src="../image/icon/wsj.png" />'
				+'<span>没有数据</span>'
			+'</div>'
	if(has){
		$("body").append(html);
	}
}

//数字保留两位小数
var returnFloat = function (value){
	var value=Math.round(parseFloat(value)*100)/100;
	var float=value.toString().split(".");
	if(float.length==1){
		if (value.toString() > 0) {
			value=value.toString()+".00";
			return value;
		}
		return value;
	}else{
		if(float[1].length<2){
			value=value.toString()+"0";
		}
		return value;
	}
}