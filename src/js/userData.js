$(document).ready(function(){
    // 性别选择t弹窗显示
    $("#sexValue").click(function(){
        $("#sexBox").removeClass("active");
    })
    // 性别选择
    $("#sexList").on("click","div",function(index){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $("#sexValue").val($(this).data("sex"))
         // 性别选择t弹窗隐藏
        $("#sexBox").addClass("active");
    })

    //日期实例化对象
    const detas = new Deta({
        "areaValueId":$("#d_dateValue"),	//日期id
        "areaBoxId":$("#d_dateBox"),		//外层id
        "id":$("#d_area"),					//绑定dome的id
        "cancelId":$("#d_cancel"),			//取消id
        "confirmId":$("#d_confirm"),		//确定id
    });           
})