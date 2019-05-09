$(function(){
	// //加载中
	// loading(true)
	// //获取数据
	// var Request = function(){
	// 	var url = phpPath + "User/addr_list";
	// 	var data = {};
	// 	var html = "";
	// 	$.post(url,data,function(res){
	// 		console.log(res.data)
	// 		if(res.code == 200){
	// 			loading(false)
	// 			res.data.forEach(function(v){
	// 				html += '<div class="rows_col selectAddress" onclick="selectAddress(\''+v.username+'\',\''+v.phone+'\',\''+v.address+v.detail_addr+'\',\''+v.addr_id+'\')" >'
	// 						 +'<div class="col_top">'
	// 							 +'<span>'+v.username+'</span>'
	// 							 +'<span>'+v.phone+'</span>'
	// 						 +'</div>'
	// 						 +'<div class="col_docs">'+v.address+v.detail_addr+'</div>'
	// 						 +'<div class="del_box"><span class="del" data-id="'+v.addr_id+'">删除</span></div>'
	// 						 +'</div>'
	// 				 	 +'</div>'
	// 			})
	// 			$("#listData").html(html);
	// 			dataDel();
	// 		}else if(res.code == 201){
	// 			loading(false)
	// 			//没有数据
	// 			hasListData(true);
	// 		}else{
				
	// 		}
	// 	},"json")
	// }

	// //删除
	// var dataDel = function(id){
	// 	$(".del").on("click",function(e){
	// 		e.stopPropagation();
	// 		var url = phpPath + "User/addr_delete";
	// 		var data = {addr_id:$(this).data("id")};
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

	//设置默认地址
	$("#listData #setDefault").each(function(){
		$(this).on("click",function(){
			$("#listData #setDefault").removeClass("active");
			$(this).addClass("active");
		})
	})
})
//选择地址
// let selectAddress = function(username,phone,address,address_id){
// 	let addressObj = {
// 		username:username,
// 		phone:phone,
// 		address:address,
// 		address_id:address_id
// 	}
// 	//本地存储收货地址
// 	sessionStorage.setItem('address', JSON.stringify(addressObj));
// 	window.history.go(-1)
// }