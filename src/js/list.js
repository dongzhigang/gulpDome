$(function(){
	var REQUIRE = true;  //阻止多次触发
	//加载中显示
	// loading(true)
	// var url = phpPath + "Product/product_list";
	// var data = {
	// 	page:1
	// }
	// var arrayData = new Array();
	// var Request = function(){
	// 	var html = "";
	// 	$.post(url,data,function(res){
	// 		if(res.code == 200){
	// 			if(data.page > 1){
	// 				//触底加载隐藏
	// 				baseLoad(false);
	// 				REQUIRE = true;
	// 			}else{
	// 				//加载中隐藏
	// 				loading(false);
	// 			}
	// 			arrayData = arrayData.concat(res.data);
	// 			arrayData.forEach(function(v,i){
	// 				html+='<div class="rows_col">'
	// 					+'<img src="'+v.list_image+'" class="col_img">'
	// 					+'<div class="col_info">'
	// 					+'<div class="col_title">'+v.simple_desc+'</div>'
	// 					+'<div class="col_docs">'
	// 						+'<span class="col_docs_a">￥'+v.price+'</span>'
	// 						+'<span class="col_docs_b">销量'+v.sales+'</span>'
	// 					+'</div>'
	// 					+'<div class="col_skip">'
	// 						+'<a href="./details.html?product_id='+v.product_id+'"><img src="../image/icon/an.png"></a>'
	// 					+'</div>'
	// 				+'</div>'
	// 			+'</div>'
	// 			})
	// 			$("#list").html(html);
	// 		}else if(res.code == 201){	//没有数据
	// 			//加载中隐藏
	// 			loading(false);
	// 			//触底加载隐藏
	// 			baseLoad(false);
	// 			// 加载到底
	// 			loadEnd(true);
	// 			REQUIRE = false;
	// 		}else{	//加载失败
	// 			//加载中隐藏
	// 			loading(false);
	// 			window.location.href="./failToLoad.html";
	// 		}
	// 	},"json")
	// }

	// //触底加载
	$(window).on("scroll",function(e){
		// e.preventDefault()
		// e.stopPropagation();
		var scrollTop = $(window).scrollTop();
		var domeH = $(document).height();
		var windowH = $(window).outerHeight();
		if((scrollTop + windowH) == domeH && REQUIRE){
			REQUIRE = false;
			//触底加载显示div,加载到底div加载全部数据后显示,loadEnd(true)
			baseLoad(true,".list_content");
			setTimeout(function(){
				baseLoad(false,".list_content");
				// 请求接口，$.post，请求成功写入这两个REQUIRE=true，baseLoad(false,"body");
			},1000)
		}
	})
	// Request();

})