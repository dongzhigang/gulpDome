"use strict";$(function(){var i;$("#imgList #img").each(function(){$(this).bind("touchstart",function(){event.stopPropagation(),i=setTimeout(function(){i=0},1e3)}).bind("touchend",function(t){stopDefault(t),clearTimeout(i),0==i&&(t.preventDefault(),t.stopPropagation(),alert("长按"))})}),$("#look").on("click",function(){$(this).addClass("active")})});