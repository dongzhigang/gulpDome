"use strict";

$(function () {
	// 选择数量
	$("#select").on("click", function () {
		$(".dialog").toggleClass("active");
	});
	//关闭
	$("#close").on("click", function () {
		$(".dialog").toggleClass("active");
	});
	//增加
	$("#addNum").on("click", function () {
		var num = parseInt($("#number").text());
		num++;
		$("#number").text(num);
	});
	//减少
	$("#reduce").on("click", function () {
		var num = parseInt($("#number").text());
		num--;
		if (num == 0) return;
		$("#number").text(num);
	});
	//选择型号，颜色分类，属性
	$("#selectType").on("click", "spam", function () {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	//确定选择
	$("#confirmSelect").click(function () {
		$("#dialog").removeClass("active");
	});
	// //获取数据
	// var Request = function(){
	// 	var url = phpPath + "Product/product_detail";
	// 	var data = {
	// 		product_id:GetQueryString("product_id")
	// 	}
	// 	$.post(url,data,function(res){
	// 		console.log(res.data)
	// 		if(res.code == 200){
	// 			$("#goods_master").attr("src",res.data.list_image);
	// 			$("#goods_title").text(res.data.product_name);
	// 			$("#goods_price").text(res.data.price);
	// 			$("#goods_volume").text(res.data.sales);
	// 			//规格循环
	// 			var html = "";
	// 			res.data.detail_param.forEach(function(v,i){
	// 				html += '<p>【'+v.param_name+'】'+v.param_value+'</p>'
	// 			})
	// 			$("#goods_info").html(html);
	// 			//详情图片
	// 			var imgs = "";
	// 			res.data.detail_images.forEach(function(v,i){
	// 				imgs += '<img src="'+v.image_original+'" class="img">'
	// 			})
	// 			$("#goods_imgs").html(imgs);
	// 			//立即购买
	// 			$("#button").on("click",function(){
	// 				window.location.href = "./orderForm.html?product_id="+res.data.product_id;
	// 			})
	// 		}else{
	// 		}
	// 	},"json")
	// }	
	// Request();
});