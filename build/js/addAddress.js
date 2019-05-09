"use strict";

$(function () {
	// 设置默认地址
	var cancel = "../image/icon/hui.png";
	var setting = "../image/icon/dj.png";
	$("#default").on("click", function () {
		if ($(this).attr("src") == cancel) {
			$(this).attr("src", setting);
			$(this).attr("data-default", 1);
		} else {
			$(this).attr("src", cancel);
			$(this).attr("data-default", 0);
		}
	});
	//地区三级联动
	var areaId = $("#d_area");
	address.init({
		"areaValueId": $("#d_areaValue"), //点击id
		"areaBoxId": $("#d_areaBox"), //外层id
		"id": areaId, //绑定dome的id
		"cancelId": $("#d_cancel"), //取消id
		"confirmId": $("#d_confirm"), //确定id
		"provinceValue": "110000", //省份值，根据地区数据json
		"cityValue": "110100", //城市值，根据地区数据json
		"addressValue": "110101" //地区值，根据地区数据json
	});

	//提交表单
	// $("#confirm").on("click",function(){
	// 	submitForm();
	// })
	//效验
	// var efficacy = function(){
	// 	if($("#address_name").val() == ""){
	// 		promptMsg("收货人不能为空");
	// 		return false;
	// 	}
	// 	var verify = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
	// 	if(!verify.test($("#address_phone").val().replace(/(^\s*)|(\s*$)/g, ""))){
	// 		promptMsg("手机格式不对");
	// 		return false;
	// 	}
	// 	if($("#d_areaShow").text() == ""){
	// 		promptMsg("地区不能为空");
	// 		return false;
	// 	}
	// 	if($("#address_detail").val() == ""){
	// 		promptMsg("详情地址不能为空");
	// 		return false;
	// 	}
	// 	return true;
	// }
	// var submitForm = function(){
	// 	var url = phpPath + "User/addr_edit";
	// 	var data = {
	// 		username:$("#address_name").val(),
	// 		phone:$("#address_phone").val(),
	// 		address:$("#d_areaShow").text(),
	// 		detail_addr:$("#address_detail").val(),
	// 		is_default:$("#default").data("default")
	// 	};
	// 	if(efficacy()){
	// 		$.post(url,data,function(res){
	// 			if(res.code == 200){
	// 				promptMsg(res.msg);
	// 				setTimeout(function(){
	// 					window.history.go(-1)
	// 				},1000)
	// 			}else{
	// 				promptMsg(res.msg);
	// 			}
	// 		},"json")
	// 	}
	// }
});