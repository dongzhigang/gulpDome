const config = {
    "areaValueId":$("#d_areaValue"),	//日期id
    "areaBoxId":$("#d_areaBox"),		//外层id
    "id":$("#d_area"),					//绑定dome的id
    "cancelId":$("#d_cancel"),			//取消id
    "confirmId":$("#d_confirm"),		//确定id
}
const Deta = function(config){
	this.date = new Date();                             //获取当前时间
	this.Year = this.date.getFullYear()                 //获取当前年份
	this.Month = this.date.getMonth()                   //获取当前月份 0-11
	this.Day = this.date.getDate()                      //获取当前日 1-31
	this.toDay = ""                                     //总天数
    this.firstDay = ""                                  //每月1号是星期几
    //配置数据
	this.config = config;   
    
    //启动初始化
    this.initialize()
}
//初始化
Deta.prototype.initialize = function(){
    //div
    this.nodeList();
    //dome点击
    this.domeIncident();
}
//判断闰年返回的总天数
Deta.prototype.days = function (year, munth){
    //判断2月
    if (munth == 2) {
        this.toDay = (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) ? 29 : 28;
    } else {
    //判断1-7月，单月为31
    if (munth < 8) {
        this.toDay = munth % 2 == 1 ? 31 : 30;
    } else {
    //判断8-12月，双月为31
        this.toDay = munth % 2 == 0 ? 31 : 30;
    }
    }
    return this.toDay;
}
//设置年数组
Deta.prototype.YearArray = function(){
    var leng = 200,year = this.Year;                                            //设置年份长度
    let array = new Array()                                    //存放数据		
    for(var i=0; i < leng; i++){
        array.unshift(year)
        year--;
    }
    return array;
}
//设置月数组
Deta.prototype.MonthArray = function(){
    return ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
}
//设置天数组
Deta.prototype.DayArray = function () { //Month+1
    let Year = this.Year,Month = this.Month;
    let array = new Array()                                    //存放数据		
    this.today = this.days(Year, parseInt(Month) + 1)          //获取每月的总天数
    let day;
    for (let i = 1; i <= this.today; i++) {
        array.push(i)
    }
    return array
}
//获取节点列表
Deta.prototype.nodeList = function(){
    let leng = 3,div,value;
    for(let i=1; i <= leng;i++){
        if(i==1){
            div = $("<div id='Month'></div>");	//创建月div节点
            value = this.Month;
        }else if(i==2){
            div = $("<div id='Day'></div>");	//创建日div节点
            value = this.Day;
        }else{
            div = $("<div id='Year'></div>");	//创建年div节点
            value = this.Year;
        }
        div.addClass("areaItem");	//添加class类
        div.attr("data-top",0);	//添加属性索引
        div.attr("data-type",i);
        div.html(this.spanDome(i));				//添加节点
        //添加节点到dome
        this.config.id.append(div);
        //设置初始状态
        this.initStart(div,value);
        //绑定触摸方法touch
        this.touch(div);
    }
}
//返回dome子节点
Deta.prototype.spanDome = function(type){ //传类型
    var span = "",array;	
    if(type == 1){  //月
        array = this.MonthArray();
        array.forEach(function(v,i){
            span += "<span data-index='"+i+"' class='areaSpan' style='height:"+Deta.childH+"' data-value='"+i+"'>"+v+"</span>";
        })
    }else if(type == 2){    //日
        array = this.DayArray();
        array.forEach(function(v,i){
            span += "<span data-index='"+i+"' class='areaSpan' style='height:"+Deta.childH+"' data-value='"+v+"'>"+v+"</span>";
        })
    }else if(type == 3){    //年
        array = this.YearArray();
        array.forEach(function(v,i){
            span += "<span data-index='"+i+"' class='areaSpan' style='height:"+Deta.childH+"' data-value='"+v+"'>"+v+"</span>";
        })
    }
    return span;
}
//设置初始状态
Deta.prototype.initStart = function(parent,value){	//parent是父元素对象，value是省份，城市，地区的值
    var topY = parent.attr("data-top");	//保存的top 偏移量
    var childs = parent.children();	
    //获取一个高度
    var childH = this.childH = parseInt(childs.eq(0).outerHeight());
    $.each(childs,function(i,n){
        $(this).css("height",childH)
        if($(this).attr("data-value") == value){
            parent.attr("data-value",$(this).html());
            parent.attr("data-index",i);
            parent.css({"transform":"translate3d(0,"+(topY- (i-2)*childH)+"px"+",0)"});
            parent.attr("data-top",(topY- (i-2)*childH));
        }
    })
}
//手指触摸
Deta.prototype.touch = function(self){
    var that = this;
    //手指触摸到屏幕会触发
		self.on("touchstart",function(event){
			event.preventDefault();
            Deta.startY = event.changedTouches[0].clientY;
			that.touchstart(this)
		})
		//当手指在屏幕上移动时，会触发
		self.on("touchmove",function(event){
			event.preventDefault();
			Deta.endY = event.changedTouches[0].clientY;
			that.touchmove(this);	
		})
		//当手指离开屏幕时，会触发
		self.on("touchend",function(event){
			Deta.endY = event.changedTouches[0].clientY;
			that.touchend(this);
		})
}
//手指触摸到屏幕会触发
Deta.prototype.touchstart = function(self){
    Deta.topY = parseInt($(self).attr("data-top"));
}
//当手指在屏幕上移动时，会触发
Deta.prototype.touchmove = function(self){
    var childs = $(self).children();
    var childH = parseInt(childs.eq(0).outerHeight());
    var topY = Deta.topY;
    var valY = Math.abs(Deta.endY - Deta.startY);
    var leng = Math.round(valY/childH);
    var index = 0;
    if(Deta.endY - Deta.startY > 0){ //向下
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
    if($(self).attr("data-type")== 1){//滚动月，返回的总天数
        this.Month = index;
        $("#Day").html(this.spanDome(2));				//添加日节点
    }else if($(self).attr("data-type")== 2){
        this.Day = childs.eq(index).attr("data-value");
    }else if($(self).attr("data-type")==3){	//滚动年份
        this.Year = childs.eq(index).attr("data-value");
        $("#Day").html(this.spanDome(2));				//添加日节点
    }
}
//当手指离开屏幕时，会触发
Deta.prototype.touchend = function(self){   
    var childs = $(self).children();
		var childH = parseInt(childs.eq(0).outerHeight());
		var topY = Deta.topY;
		var valY = Math.abs(Deta.endY - Deta.startY);
		var leng = Math.round(valY/childH);
		var index = 0;
		if(Deta.endY - Deta.startY > 0){	//向下	
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
        //重新设置值
        if($(self).attr("data-type")== 1){//滚动月，返回的总天数
            if(this.days(this.Year, parseInt(this.Month) + 1) < this.Day){//判断子节点的个数是否小于当前位置,重新设置位置和索引
                topY = -(parseInt(this.days(this.Year, this.Month + 1))-3)*childH
                $("#Day").css({"transform":"translate3d(0,"+topY+"px"+",0)"});
                $("#Day").attr("data-value",this.days(this.Year, parseInt(this.Month) + 1)); 
                $("#Day").attr("data-index",this.days(this.Year, parseInt(this.Month) + 1)-1);            
                this.Day = $("#Day").attr("data-value");
            }
        }else if($(self).attr("data-type")==3){	//滚动年份
            if(this.days(Year, parseInt(Month) + 1) < this.Day){//判断子节点的个数是否小于当前位置,重新设置位置和索引
                topY = -(parseInt(this.days(this.Year, this.Month + 1))-3)*childH
                $("#Day").css({"transform":"translate3d(0,"+topY+"px"+",0)"});
                $("#Day").attr("data-value",this.days(Year, parseInt(Month) + 1));   
                $("#Day").attr("data-index",this.days(this.Year, parseInt(this.Month) + 1)-1);               
                this.Day = $("#Day").attr("data-value");
            }
        }
}
//dome点击事件
Deta.prototype.domeIncident = function(){
    var that = this;
    //取消
    that.config.cancelId.on("click",function(){
        that.config.areaBoxId.css({"display":"none"});
    })
    //显示地区
    that.config.areaValueId.on("click",function(){
        that.config.areaBoxId.css({"display":"block"});
    })
    //确定获取地址
    that.config.confirmId.on("click",function(){
        let Month = that.Month+1;
            Month = Month>9?Month:"0"+Month;
        let Day = that.Day>9?that.Day:"0"+that.Day;
        var val = that.Year + "-" + Month + "-" + Day;
        that.config.areaValueId.val(val);
        that.config.areaBoxId.css({"display":"none"});
    })		
}

