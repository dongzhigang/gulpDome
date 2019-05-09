$(function(){
	var time = 60;
	//获取本地存储支付金额
	// var paymentAmount = sessionStorage.getItem('paymentAmount');
	// var goodsName = sessionStorage.getItem('goodsName');
	// console.log(goodsName)
	// $(".payMoney").text(returnFloat(paymentAmount));
	// $("#goodsName").text(goodsName)

	var interval=setInterval(countDown,1000); //倒计时
	function countDown(){
		time--;
		$("#date").text(time > 9?time:"0"+time)
		if(time == 0){
			window.clearInterval(interval);
			window.location.href = "orderList.html";
		}
		
	}
})