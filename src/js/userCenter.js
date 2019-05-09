$(function(){
	// var Request = function(){
	// 	var url = phpPath + "User/user_center";
	// 	$.post(url,function(res){
	// 		if(res.code == 200){
	// 			console.log(res)
	// 			$("#user_logo").attr("src",res.data.headimg);
	// 			$("#user_name").text(res.data.username);
	// 		}else{

	// 		}
	// 	},"json")
	// }
	// Request();

	//拨打电话显示
	$("#phone").on("click",function(){
		$("#dialog").removeClass("active");
	})
	//拨打电话隐藏
	$("#hide").on("click",function(){
		$("#dialog").addClass("active");
	})
})