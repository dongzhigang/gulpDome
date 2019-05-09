"use strict";

$(function () {
    var timeOutEvent;
    // 图片事件
    $("#imgList #img").each(function () {
        //查看图片
        $(this).bind("touchstart", function () {
            event.stopPropagation();
            timeOutEvent = setTimeout(function () {
                longPress();
            }, 1000);
        }).bind("touchend", function (event) {
            stopDefault(event);
            clearTimeout(timeOutEvent);
            if (timeOutEvent == 0) {
                event.preventDefault();
                event.stopPropagation();
                //长按删除图片,请求数据
                alert("长按");
            }
        });
    });
    //隐藏
    $("#look").on("click", function () {
        $(this).addClass("active");
    });
    //长按事件触发
    function longPress() {
        timeOutEvent = 0;
    }
});