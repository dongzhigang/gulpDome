"use strict";$(document).ready(function(){$("#sexValue").click(function(){$("#sexBox").removeClass("active")}),$("#sexList").on("click","div",function(e){$(this).siblings().removeClass("active"),$(this).addClass("active"),$("#sexValue").val($(this).data("sex")),$("#sexBox").addClass("active")});new Deta({areaValueId:$("#d_dateValue"),areaBoxId:$("#d_dateBox"),id:$("#d_area"),cancelId:$("#d_cancel"),confirmId:$("#d_confirm")})});