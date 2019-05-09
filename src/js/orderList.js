$(function(){
	// //加载中
	// loading(true)
	// //获取数据
	// var Request = function(){
	// 	var url = phpPath + "Order/order_list";
	// 	var html = "";
	// 	$.post(url,function(res){
	// 		console.log(res)
	// 		if(res.code == 200){
	// 			loading(false)
	// 			res.data.forEach(function(v){
	// 				html += '<div class="rows_col">'
	// 						 +'<a href="./orderDetail.html?order_id='+v.order_id+'" class="goods">'
	// 						 	 +'<div class="goods_left">'
	// 								 +'<img src="'+v.list_image+'" class="goods_img">'
	// 								 +'<div class="title">'+v.product_name+'</div>'
	// 							 +'</div>'
	// 							 +'<div class="goods_right">'
	// 								 +'<span class="right_a">￥'+v.product_price+'</span>'
	// 								 +'<span class="right_b">x'+v.product_quantity+'</span>'
	// 								 +'<span class="right_c '+ (v.status_id>1?" right_c_1":" right_c_2")+'">'+v.status_name+'</span>'
	// 							 +'</div>'
	// 						 +'</a>'
	// 						 +'<div class="col_explain">共'+v.product_quantity+'件商品  实付款: ¥'+returnFloat(parseFloat(v.product_price)*parseFloat(v.product_quantity)+parseFloat(v.postage))+' (含运费¥'+v.postage+')</div>'
	// 							 +'<div class="base">'
	// 								 +'<span class="base_a"><img src="../image/icon/gwc.png" class="base_icon">已发货</span>'
	// 								 +'<span class="base_b del" data-id="'+v.order_id+'">删除订单</span>'
	// 							 +'</div>'
	// 					 +'</div>'
	// 			})
	// 			$("#orderList").html(html);
	// 			dataDel();
	// 		}else if(res.code == 201){
	// 			loading(false)
	// 			//没有数据
	// 			hasListData(true);
	// 		}else{
	// 			//加载中隐藏
	// 			loading(false);
	// 			window.location.href="./failToLoad.html";
	// 		}
	// 	},"json")
	// }
	// //删除
	// var dataDel = function(id){
	// 	$(".del").on("click",function(){
	// 		var url = phpPath + "Order/order_delete";
	// 		var data = {order_id:$(this).data("id")};
	// 		$.post(url,data,function(res){
	// 			if(res.code == 200){
	// 				promptMsg(res.msg);
	// 				setTimeout(function(){
	// 					location.reload();
	// 				},1000)
	// 			}else{
	// 				promptMsg(res.msg);
	// 			}
	// 		},"json")
	// 	})
	// }
	// Request();
})