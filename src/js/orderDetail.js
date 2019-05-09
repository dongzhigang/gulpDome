$(function(){
	// //获取数据
	// var Request = function(){
	// 	var url = phpPath + "Order/order_detail";
	// 	var data = {order_id:GetQueryString("order_id")};
	// 	var html = "";
	// 	$.post(url,data,function(res){
	// 		if(res.code == 200){
	// 			console.log(res.data)
	// 			//订单信息
	// 			$("#number").text(res.data.order_num);
	// 			$("#time").text(res.data.create_time);
	// 			$("#state").text(res.data.status_name);
	// 			$("#remark").text(res.data.remark);
	// 			//收货信息
	// 			$("#username").text(res.data.delivery_name);
	// 			$("#phone").text(res.data.delivery_phone);
	// 			$("#address").text(res.data.delivery_addr);
	// 			//商品信息
	// 			$("#goods_img").attr("src",res.data.product_info.list_image);
	// 			$("#goods_name").text(res.data.product_info.product_name);
	// 			$("#goods_docs").text(res.data.unit_name);
	// 			$("#goods_sum").text(res.data.product_info.product_price+"x"+ res.data.product_info.product_quantity);
	// 			//支付信息
	// 			$("#goods_total").text(returnFloat(parseFloat(res.data.product_info.product_price)*res.data.product_info.product_quantity));
	// 			$("#freight").text(returnFloat(res.data.postage));
	// 			$("#pay_total").text(returnFloat(parseFloat(res.data.product_info.product_price)*parseInt(res.data.product_info.product_quantity) + parseFloat(res.data.postage)));
	// 			if(res.data.status_name == "未付款"){
	// 				$("#toPay").show();
	// 			}else{
	// 				$("#toPay").hide();
	// 			}
	// 		}else{
	// 		}
	// 	},"json")
	// }
	// Request();
	// //支付
	// $("#toPay").on("click",function(){
	// 	//本地存储支付金额
	// 	sessionStorage.setItem('paymentAmount', $("#pay_total").text());
	// 	sessionStorage.setItem('goodsName', $("#goods_name").text());
	// 	window.location.href = "./payment.html";
	// })

})

//复制文本
var copyCode = function()
{
	var code = document.getElementById("code");
		code.select(); // 选中文本
      	document.execCommand("copy"); // 执行浏览器复制命令
}