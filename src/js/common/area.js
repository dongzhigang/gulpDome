/**
 * 
 * 地区三级联动
*/
var area = function(){
	//省市区数组
	this.data = areaData;
	//配置数据
	this.initialize = {
		"areaValueId":$("#d_areaValue"),		//点击id
		"areaBoxId":$("#d_areaBox"),		//外层id
		"id":$("#d_area"),					//绑定dome的id
		"cancelId":$("#d_cancel"),			//取消id
		"confirmId":$("#d_confirm"),		//确定id
		"provinceValue":"140000",			//省份值，根据地区数据json
		"cityValue":"140100",				//城市值，根据地区数据json
		"addressValue":"140105"				//地区值，根据地区数据json
	};
	var that = this;
	//获取节点列表
	this.nodeList = function(){
		let leng = 3,div,value;
		for(let i=1; i <= leng;i++){
			if(i==1){
				div = $("<div id='d_province'></div>");	//创建div节点
				value = this.initialize.provinceValue;
			}else if(i==2){
				div = $("<div id='d_city'></div>");	//创建div节点
				value = this.initialize.cityValue;
			}else{
				div = $("<div id='d_address'></div>");	//创建div节点
				value = this.initialize.addressValue;
			}
			div.addClass("areaItem");	//添加class类
			div.attr("data-top",0);	//添加属性索引
			div.attr("data-type",i);
			div.html(spanDome(this.data,i));				//添加节点
			//添加节点到dome
			that.initialize.id.append(div);
			//设置初始地址
			startArea(div,value);
			//绑定触摸方法touch
			touch(div);
		}
	}
	//dome点击事件
	this.domeIncident = function(){
		//取消
		that.initialize.cancelId.on("click",function(){
			that.initialize.areaBoxId.css({"display":"none"});
		})
		//显示地区
		that.initialize.areaValueId.on("click",function(){
			that.initialize.areaBoxId.css({"display":"block"});
		})
		//确定获取地址
		that.initialize.confirmId.on("click",function(){
			var parent = that.initialize.id;
			var childs = parent.children();
			var text = "";
			$.each(childs,function(i,n){
				text+=$(this).attr("data-label").trim().replace(/\s/g,"");
			})
			that.initialize.areaValueId.val(text);
			that.initialize.areaBoxId.css({"display":"none"});
		})		
	}
	//初始化
	this.init = function(initialize = this.initialize){
		// this.province();
		// this.city();
		// this.address();
		// startArea($("#d_province"),this.initialize.provinceValue);
		// startArea($("#d_city"),this.initialize.cityValue);
		// startArea($("#d_address"),this.initialize.addressValue);
		// touch($("#d_province"));
		// touch($("#d_city"));
		// touch($("#d_address"));
		this.initialize = initialize;
		this.nodeList();
		this.domeIncident();
	}
	//获取省份方法
	// this.province = function(){
	// 	var div = $("<div id='d_province'></div>");	//创建div节点
	// 		div.addClass("areaItem");	//添加class类
	// 		div.attr("data-top",0);	//添加属性索引
	// 		div.attr("data-type",1);
	// 		div.html(spanDome(this.data,1));				//添加节点
	// 	//添加节点到dome
	// 	that.initialize.id.append(div);
	// 	startArea(div,this.initialize.provinceValue);
	// 	touch(div);
	// }
	//获取城市的方法
	// this.city = function(){
	// 	var div = $("<div id='d_city'></div>");	//创建div节点
	// 		div.addClass("areaItem");	//添加class类
	// 		div.attr("data-top",0);	//添加属性索引
	// 		div.attr("data-type",2);
	// 		div.html(spanDome(this.data,2));				//添加节点
	// 	//添加节点到dome
	// 	that.initialize.id.append(div);
	// 	startArea(div,this.initialize.cityValue);
	// 	touch(div);
	// }
	//获取地区的方法
	// this.address = function(){
	// 	var div = $("<div id='d_address'></div>");	//创建div节点
	// 		div.addClass("areaItem");	//添加class类
	// 		div.attr("data-top",0);	//添加属性索引
	// 		div.attr("data-type",3);
	// 		div.html(spanDome(this.data,3));				//添加节点
	// 	//添加节点到dome
	// 	that.initialize.id.append(div);
	// 	startArea(div,this.initialize.addressValue);
	// 	touch(div);
	// }

	//返回dome节点
	var spanDome = function(array,type){ //传数组和类型
		var span = "";	
		array.forEach(function(v,i){
			if(type == 1){
				span += "<span data-index='"+i+"' class='areaSpan' style='height:"+that.childH+"' data-value='"+v.value+"'>"+v.label+"</span>";
			}else if(type == 2){
				if(v.value == that.initialize.provinceValue){//判断省份
					v.children.forEach(function(val,index){
						span += "<span data-index='"+index+"' class='areaSpan' style='height:"+that.childH+"'  data-value='"+val.value+"'>"+val.label+"</span>";
					})
				}
			}else if(type == 3){
				if(v.value == that.initialize.provinceValue){ //判断省份
					v.children.forEach(function(val){
						if(val.value == that.initialize.cityValue){ //判断城市
							val.children.forEach(function(vals,k){
								span += "<span data-index='"+k+"' class='areaSpan' style='height:"+that.childH+"'  data-value='"+vals.value+"'>"+vals.label+"</span>";
							})
						}	
					})			
				}
			}
		})
		return span;
	}
	//设置初始地址
	var startArea = function(parent,value){	//parent是父元素对象，value是省份，城市，地区的值
		var topY = parent.attr("data-top");	//保存的top 偏移量
		var childs = parent.children();	
		//获取一个高度
		var childH = that.childH = parseInt(childs.eq(0).outerHeight());
		$.each(childs,function(i,n){
			$(this).css("height",childH)
			if($(this).attr("data-value") == value){
				parent.attr("data-label",$(this).html());
				parent.attr("data-index",i);
				parent.css({"transform":"translate3d(0,"+(topY- (i-2)*childH)+"px"+",0)"});
				parent.attr("data-top",(topY- (i-2)*childH));
			}
		})
	}
	//绑定触摸方法touch
	var touch = function(self){
		//手指触摸到屏幕会触发
		self.on("touchstart",function(event){
			event.preventDefault();
			that.startY = event.changedTouches[0].clientY;
			touchstart(this)
		})
		//当手指在屏幕上移动时，会触发
		self.on("touchmove",function(event){
			event.preventDefault();
			that.endY = event.changedTouches[0].clientY;
			touchmove(this);	
		})
		//当手指离开屏幕时，会触发
		self.on("touchend",function(event){
			that.endY = event.changedTouches[0].clientY;
			touchend(this);
		})
		// //鼠标进入
		// self.on("mouseover",function(event){
		// 	that.startY = event.clientY;
		// 	console.log(that.startY)
		// 	touchstart(event,this)
		// })
		// //鼠标移动
		// self.on("mousemove",function(event){
		// 	that.endY = event.clientY;
		// 	touchmove(event,this);	
		// })
		// //鼠标按下触发
		// self.on("mousedown",function(event){
		// 	touchend(event,this);
		// })
	}
	//手指触摸到屏幕会触发
	var touchstart = function(self){
		that.topY = parseInt($(self).attr("data-top"));
	}
	//当手指在屏幕上移动时，会触发
	var touchmove = function(self){
		var childs = $(self).children();
		var childH = parseInt(childs.eq(0).outerHeight());
		var topY = that.topY;
		var valY = Math.abs(that.endY - that.startY);
		var leng = Math.round(valY/childH);
		var index = 0;
		if(that.endY - that.startY > 0){ //向下
			if((topY + leng*childH) > childH*2){
				$(self).css({"transform":"translate3d(0,"+(childH*3)+"px"+",0)"});
				$(self).attr("data-top",childH*3);
				index = 0;
			}else{ 
				$(self).css({"transform":"translate3d(0,"+(topY + leng*childH)+"px"+",0)"});
				$(self).attr("data-top",(topY + leng*childH));
				index = (topY + leng*childH)>0?2-Math.abs(topY + leng*childH) / childH:Math.abs(topY + leng*childH) / childH +2;
			}	
		}else{//向上
			if (Math.abs(topY - leng*childH) > childH*(childs.length - 3)) {
				$(self).css({"transform":"translate3d(0,"+(-childH*(childs.length - 2))+"px"+",0)"});
				$(self).attr("data-top",(-childH*(childs.length - 2)));
				index = (childs.length - 1)
			}else{
				$(self).css({"transform":"translate3d(0,"+(topY - leng*childH)+"px"+",0)"});
				$(self).attr("data-top",(topY - leng*childH));
				index = (topY - leng*childH)>0?2-Math.abs(topY - leng*childH) / childH:Math.abs(topY - leng*childH) / childH +2;
			}
		}
		//设置当前索引和值
		$(self).attr("data-index",index)
		$(self).attr("data-value",childs.eq(index).attr("data-value"));
		//重新设置值
		if($(self).attr("data-type")==1){//滚动省份
			that.initialize.provinceValue = childs.eq(index).attr("data-value");
			$("#d_city").html(spanDome(that.data,2));				//添加城市节点索引是
			if(($("#d_city").children().length - 1) < $("#d_city").attr("data-index")){//判断子节点的个数是否小于当前位置,重新设置位置和索引
				$("#d_city").css({"transform":"translate3d(0,"+(2*childH)+"px"+",0)"});
				$("#d_city").attr("data-top",(2*childH));
				$("#d_city").attr("data-index",0);
			}
			that.initialize.cityValue = $("#d_city").children().eq($("#d_city").attr("data-index")).attr("data-value");
			$("#d_city").attr("data-value",that.initialize.cityValue);
			$("#d_city").attr("data-label",$("#d_city").children().eq($("#d_city").attr("data-index")).html());

			$("#d_address").html(spanDome(that.data,3));				//添加地区节点
			if(($("#d_address").children().length -1) < $("#d_address").attr("data-index")){//判断子节点的个数是否小于当前位置,重新设置位置和索引
				$("#d_address").css({"transform":"translate3d(0,"+(2*childH)+"px"+",0)"});
				$("#d_address").attr("data-top",(2*childH));
				$("#d_address").attr("data-index",0);
			}
			$("#d_address").attr("data-value",$("#d_address").children().eq($("#d_address").attr("data-index")).attr("data-value"));
			$("#d_address").attr("data-label",$("#d_address").children().eq($("#d_address").attr("data-index")).html());
		}else if($(self).attr("data-type")==2){	//滚动城市
			that.initialize.cityValue = childs.eq(index).attr("data-value");
			$("#d_address").html(spanDome(that.data,3));				//添加节点
			if(($("#d_address").children().length -1) < $("#d_address").attr("data-index")){//判断子节点的个数是否小于当前位置,重新设置位置和索引
				$("#d_address").css({"transform":"translate3d(0,"+(2*childH)+"px"+",0)"});
				$("#d_address").attr("data-top",(2*childH));
				$("#d_address").attr("data-index",0);
			}
			$("#d_address").attr("data-value",$("#d_address").children().eq($("#d_address").attr("data-index")).attr("data-value"));
			$("#d_address").attr("data-label",$("#d_address").children().eq($("#d_address").attr("data-index")).html());
		}
	}
	//当手指离开屏幕时，会触发
	var touchend = function(self){
		var childs = $(self).children();
		var childH = parseInt(childs.eq(0).outerHeight());
		var topY = that.topY;
		var valY = Math.abs(that.endY - that.startY);
		var leng = Math.round(valY/childH);
		var index = 0;
		if(that.endY - that.startY > 0){	//向下	
			if((topY + leng*childH) > childH*2){
				$(self).css({"transform":"translate3d(0,"+(childH*2)+"px"+",0)"});
				$(self).attr("data-top",childH*2);
				index = 0;
			}else{                 
				$(self).css({"transform":"translate3d(0,"+(topY + leng*childH)+"px"+",0)"});
				$(self).attr("data-top",(topY + leng*childH));
				index = (topY + leng*childH)>0?2-Math.abs(topY + leng*childH) / childH:Math.abs(topY + leng*childH) / childH +2;
			}
			$(self).attr("data-index",index);
		}else{//向上
			if (Math.abs(topY - leng*childH) > childH*(childs.length - 3)) {
				$(self).css({"transform":"translate3d(0,"+(-childH*(childs.length - 3))+"px"+",0)"});
				$(self).attr("data-top",(-childH*(childs.length - 3)));
				index = (childs.length - 1)
			}else{
				$(self).css({"transform":"translate3d(0,"+(topY - leng*childH)+"px"+",0)"});
				$(self).attr("data-top",(topY - leng*childH));
				index = (topY - leng*childH)>0?2-Math.abs(topY - leng*childH) / childH:Math.abs(topY - leng*childH) / childH +2;
			}
			$(self).attr("data-index",index);		
		}
		$(self).attr("data-label",childs.eq(index).html());
	}
}
//实例化对象
var address = new area();
