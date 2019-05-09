"use strict";

$(function () {
    var startX, endX, interval, transform;
    //判断是否全选
    var isSelectAll = function isSelectAll() {
        var correct = true;
        $("#slideMouse #select").each(function () {
            if ($(this).hasClass("active") == false) {
                correct = false;
            }
        });
        return correct;
    };
    //手指触摸到屏幕会触发
    var touchstart = function touchstart(event) {
        startX = event.changedTouches[0].clientX;
    };
    //当手指在屏幕上移动时，会触发
    var touchmove = function touchmove(event) {
        event.stopPropagation();
        endX = event.changedTouches[0].clientX;
        //左右滑动
        interval = $(this).children().last().width();
        if (Math.abs(endX - startX) > interval) return;
        if (endX > startX) {
            //向右滑动
            if (transform > 0) return;
            $(this).removeClass("active");
        } else {
            //向左滑动
            if (Math.abs(endX - startX) < interval / 2) return;
            transform = endX - startX;
            $(this).addClass("active");
        }
        return false;
    };
    $("#slideMouse").on({ touchstart: touchstart, touchmove: touchmove }, ".food_item", { passive: true });
    //数量增加
    $("#slideMouse #add").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var total_prices = parseFloat($("#totalPrices").text());
        var price = parseFloat($(this).closest(".food_left").find("#price").text());
        var num = parseInt($(this).siblings("#food_num").text());
        num++;
        $(this).siblings("#food_num").text(num);
        //判断减号图标是否存在
        if (num > 1) {
            $(this).siblings("#minus").removeClass("active");
        }
        //判断是否选中
        if ($(this).closest(".food_left").find("#select").hasClass("active")) {
            total_prices += price;
            $("#totalPrices").text(returnFloat(total_prices));
        }
    });
    //数量减少
    $("#slideMouse #minus").click(function (e) {
        e.preventDefault();
        var total_prices = parseFloat($("#totalPrices").text());
        var price = parseFloat($(this).closest(".food_left").find("#price").text());
        var num = parseInt($(this).siblings("#food_num").text());
        num--;
        //判断减号图标是否存在
        if (num < 1) {
            num = 1;
        } else {
            //判断是否选中
            if ($(this).closest(".food_left").find("#select").hasClass("active")) {
                total_prices -= price;
                $("#totalPrices").text(returnFloat(total_prices));
            }
        }
        $(this).siblings("#food_num").text(num);
    });
    //选择
    $("#slideMouse #select").on("click", function (e) {
        var food_leng = parseInt($("#foodLeng").text());
        var total_prices = parseFloat($("#totalPrices").text());
        var num = parseInt($(this).parent().find("#food_num").text());
        var price = parseFloat($(this).parent().find("#price").text());
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            total_prices += num * price;
            food_leng += 1;
        } else {
            total_prices -= num * price;
            food_leng -= 1;
        }
        total_prices = total_prices > 0 ? returnFloat(total_prices) : total_prices + ".00";
        $("#totalPrices").text(total_prices);
        $("#foodLeng").text(food_leng);
        //判断是否全选
        if (isSelectAll()) {
            $("#selectAll").addClass("active");
        } else {
            $("#selectAll").removeClass("active");
        }
    });
    //全选
    $("#selectAll").on("click", function () {
        var total_prices = parseFloat($("#totalPrices").text());
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $("#slideMouse #select").each(function () {
                total_prices = parseFloat($("#totalPrices").text());
                var num = parseInt($(this).parent().find("#food_num").text());
                var price = parseFloat($(this).parent().find("#price").text());
                if ($(this).hasClass("active") == false) {
                    $(this).addClass("active");
                    total_prices += num * price;
                }
                total_prices = total_prices > 0 ? returnFloat(total_prices) : total_prices + ".00";
                $("#totalPrices").text(total_prices);
            });
            $("#foodLeng").text($("#slideMouse #select").length);
        } else {
            $("#slideMouse #select").each(function () {
                $(this).removeClass("active");
            });
            $("#totalPrices").text("0.00");
            $("#foodLeng").text("0");
        }
    });
    //显示选择数量,规格，颜色
    $("#slideMouse  #selects").each(function (index) {
        $(this).click(function () {
            $("#dialog").data("index", index);
            $("#dialog").removeClass("active");
        });
    });
    //关闭
    $("#close").click(function () {
        $("#dialog").addClass("active");
    });
    //选择型号，颜色分类，属性
    $("#selectType").on("click", "spam", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $("#dialog").data("value", $(this).text());
    });
    //确定选择
    $("#confirmSelect").click(function () {
        $("#dialog").addClass("active");
        $("#slideMouse  #selects").each(function (index) {
            if (index == $("#dialog").data("index")) {
                if ($("#dialog").data("value")) {
                    $(this).children().first().text($("#dialog").data("value"));
                }
            }
        });
    });
    //增加
    $("#addNum").on("click", function () {
        var num = parseInt($("#number").text());
        num++;
        $("#number").text(num);
    });
    //减少
    $("#reduce").on("click", function () {
        var num = parseInt($("#number").text());
        num--;
        if (num == 0) return;
        $("#number").text(num);
    });
});