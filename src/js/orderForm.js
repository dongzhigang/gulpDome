$(function(){
	// var address = JSON.parse(sessionStorage.getItem('address'))
	// if(address){
	// 	$("#userName").text("收货人:"+address.username);
	// 	$("#phone").text(address.phone);
	// 	$("#address").text("收货地址:"+address.address);
	// 	$("#topbox").attr("data-id",address.address_id)
	// 	$("#topbox").show();
	// 	$("#no_address").hide();
	// }
	// //获取数据
	// var Request = function(){
	// 	var url = phpPath + "Order/comfirm_order";
	// 	var data = {
	// 		product_id:GetQueryString("product_id"),
	// 	}
	// 	$.post(url,data,function(res){
	// 		if(res.code == 200){
	// 			console.log(res.data)
	// 			if(res.data.delivery_info){
	// 				$("#userName").text("收货人:"+res.data.delivery_info.username);
	// 				$("#phone").text(res.data.delivery_info.phone);
	// 				$("#address").text("收货地址:"+res.data.delivery_info.address + res.data.delivery_info.detail_addr);
	// 				$("#topbox").attr("data-id",res.data.delivery_info.addr_id);
	// 				$("#topbox").show();
	// 				$("#no_address").hide();
	// 			}
	// 			$("#goods_master").attr("src",res.data.list_image);
	// 			$("#goods_title").text(res.data.product_name);
	// 			$("#goods_docs").text(res.data.unit_name);
	// 			$("#goods_price").text(res.data.price);
	// 			$("#goods_carriage").text(res.data.postage);
	// 			$("#goods_total").text(returnFloat(parseFloat(res.data.price) + parseFloat(res.data.postage)));
	// 			$("#goods_totals").text(returnFloat(parseFloat(res.data.price) + parseFloat(res.data.postage)));
	// 		}else{

	// 		}
	// 	},"json")
	// }
	// //立即购买，创建订单
	// $("#createOrder").on("click",function(){
	// 	if($("#topbox").attr("data-id")){
	// 		var url = phpPath + "Order/create_order";
	// 		var data = {
	// 			product_id:GetQueryString("product_id"),
	// 			product_quantity:$("#goods_quantity").text(),
	// 			product_price:$("#goods_price").text(),
	// 			postage:$("#goods_carriage").text(),
	// 			order_price:$("#goods_totals").text(),
	// 			addr_id:$("#topbox").attr("data-id"),
	// 			remark:$("#remark").val()
	// 		}
	// 		$.post(url,data,function(res){
	// 			if(res.code == 200){
	// 				//本地存储支付金额和商品
	// 				sessionStorage.setItem('paymentAmount', $("#goods_totals").text());
	// 				sessionStorage.setItem('goodsName', $("#goods_title").text());
	// 				window.location.href = "./payment.html";
	// 			}
	// 		},"json")
	// 	}else{
	// 		promptMsg("请输入收货地址");
	// 	}
	// })
	// Request();
	
	//数量增加
	$("#minus").on("click",minusNum)
	//数量减少
	$("#add").on("click",addNum)
	if(parseInt($("#goods_quantity").text()) > 1){
		$("#minus").removeClass("active");
	}
})
//数量减
var minusNum = function(){
	var num = parseInt($("#goods_quantity").text());
	num--;
	//判断减号图标是否存在
	if(num == 1){
		$(this).addClass("active");
	}
	$("#goods_quantity").text(num);
	$("#goods_total").text(returnFloat(parseFloat($("#goods_total").text()) - parseFloat($("#goods_price").text())));
	$("#goods_totals").text(returnFloat(parseFloat($("#goods_total").text())));
	$("#goods_num").text(num);
}
//数量加
var addNum = function(){
	var num = parseInt($("#goods_quantity").text());
	num++;
	//判断减号图标是否存在
	if(num > 1){
		$("#minus").removeClass("active");

	}
	$("#goods_quantity").text(num);
	$("#goods_total").text(returnFloat(parseFloat($("#goods_total").text()) + parseFloat($("#goods_price").text())));
	$("#goods_totals").text(returnFloat(parseFloat($("#goods_total").text())));
	$("#goods_num").text(num);
}