var configs = {
    //autoplay:true == autoplay:{delay：1000}
    autoplay:true,
    loop : true,                //环路
    // 如果需要分页器
    pagination: {
        el: 'swiper-pagination',
    },
    //速度
    speed:1000, 
    //方向，垂直,vertical,水平,horizontal
    direction:"horizontal"
}
var Swiper = function (divId="swiper_content",config = configs){
    this.Width = document.body.clientWidth ;
    this.height = document.getElementById(divId).children[0].clientHeight ;
    this.child = document.getElementById(divId).children[0];          
    this.index = 0 ;                    //索引    
    //配置数据
    this.config = config;
    //初始化
    this.initialize();
}
Swiper.prototype.initialize = function(){
    this.start();
    this.touch();
    //自动循环
    this.timer()
    //自动循环
    if(this.hasLoop()){
        this.Loop()
    }
}
// start
Swiper.prototype.start = function(){
    this.offset = this.config.direction == "horizontal"?this.Width:this.height
    var index = this.hasLoop()?1:this.index;
    var topOffset = this.hasLoop()?-this.offset*index:0;
    this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- index*this.Width)+"px,0,0)":"translate3d(0,"+(- index*this.height)+"px,0)";
    this.child.setAttribute("data-topOffset",topOffset);
    var childrens = this.child.children;
    this.length = childrens.length;
    for(var i=0; i < this.length; i++){
        if(this.config.direction == "horizontal"){
            childrens[i].style.width = this.Width + "px";
        }else{
            childrens[i].style.height = this.height + "px";
        }
        
    }
    //判断是否需要分页
    if(this.hasPagination()){
        this.paginationId = document.getElementById(this.config.pagination.el);
        var html;
        for(var i=0; i < this.length; i++){
            html = document.createElement("span");
            if(i==this.index){
                html.className = "active";
            }
            this.paginationId.appendChild(html);
        }
    }
}
//手指触摸
Swiper.prototype.touch = function(){
    //手指触摸到屏幕会触发
    this.child.addEventListener("touchstart",function(event){   
        this.touchstart(event)    
    }.bind(this),{passive:true})
    //当手指在屏幕上移动时，会触发
    this.child.addEventListener("touchmove",function(event){
        this.touchmove(event)
    }.bind(this),{passive:false})
    //当手指离开屏幕时，会触发
    this.child.addEventListener("touchend",function(event){
        this.touchend(event)
    }.bind(this),{passive:true})
}
//手指触摸到屏幕会触发
Swiper.prototype.touchstart = function(event){
     //清除循环
     clearInterval(this.autoplay);
     this.startOffset = this.config.direction == "horizontal"? event.changedTouches[0].clientX:event.changedTouches[0].clientY;
     this.topOffset = parseInt(this.child.getAttribute("data-topOffset"));
}
//当手指在屏幕上移动时，会触发
Swiper.prototype.touchmove = function(event){ 
    event.preventDefault();	
    this.endOffset = this.config.direction == "horizontal"?event.changedTouches[0].clientX:event.changedTouches[0].clientY;
    if(Math.abs(this.endOffset - this.startOffset)<= this.offset){
        //环形
        if(this.hasLoop()){
            let topOffset;
            if((this.endOffset - this.startOffset) > 0){ //向右滑动
                //判断是否第一个
                if(this.index == 0){
                    //当滑动距离》=屏幕2/1就到下一个
                    if(Math.abs((this.endOffset - this.startOffset))>this.offset/3){
                        this.topOffset = -(this.offset*(this.length+1))
                        this.child.style.transitionDuration = "0ms";
                    }
                }
            }else{  //向左滑动
                //当滑动到最后一个
                if(this.index == this.length - 1){
                    //当滑动距离》=屏幕2/1就到下一个
                    if(Math.abs((this.endOffset - this.startOffset))>this.offset/3){
                        this.topOffset = 0;
                        this.child.style.transitionDuration = "0ms";
                    }
                }
            }
            topOffset = this.topOffset + (this.endOffset - this.startOffset);
            this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+topOffset+"px"+",0,0)":"translate3d(0,"+topOffset+"px,0)";
        }else{
            if((this.endOffset - this.startOffset) > 0){ //向右滑动
                //判断是否第一个
                if(this.index == 0){
                    //当滑动距离》=屏幕2/1就到下一个
                    if(Math.abs((this.endOffset - this.startOffset))>this.offset/2){
                        this.child.style.transform = "translate3d("+(this.offset/2 + this.index*this.offset)+"px"+",0,0)";
                        return;
                    }
                }
            }else{  //向左滑动
                //当滑动到最后一个
                if(this.index == this.child.children.length - 1){
                    //当滑动距离》=屏幕2/1就到下一个
                    if (Math.abs((this.endOffset - this.startOffset))>this.offset/2) {
                        this.child.style.transform = "translate3d("+(-(this.offset/2 + this.index*this.offset))+"px"+",0,0)";
                        return;
                    }
                }
            }
            this.child.style.transform = "translate3d("+((this.endOffset - this.startOffset) - this.index*this.offset)+"px"+",0,0)";
        }
    }
}
//当手指离开屏幕时，会触发
Swiper.prototype.touchend = function(event){
    this.endOffset = this.config.direction == "horizontal"?event.changedTouches[0].clientX:event.changedTouches[0].clientY;
    if(this.hasLoop()){
        if(this.endOffset - this.startOffset > 0){//向右滑-
            //判断是否第一个
            if(this.index == 0){
                if (Math.abs(this.endOffset - this.startOffset) >= this.offset/3) {
                    this.index = this.length - 1;
                }
            }else{
                //当滑动距离》=屏幕3/1就到下一个
                if (Math.abs(this.endOffset - this.startOffset) >= this.offset/3) {
                    this.index--;
                }
    
            }
        }else{//向左滑+
            //当滑动到最后一个
            if(this.index == this.length - 1 ){
                if (Math.abs(this.endOffset - this.startOffset) >= this.offset/3) {
                    this.index = 0;					
                }
            }else{
                //当滑动距离》=屏幕一半就到上一个
                if (Math.abs(this.endOffset - this.startOffset) >= this.offset/3) {
                    this.index++;						
                }
            }
        }
        this.child.setAttribute("data-topOffset",(- (this.index + 1)*this.offset));
        this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- (this.index + 1)*this.offset)+"px"+",0,0)":"translate3d(0,"+(- (this.index + 1)*this.offset)+"px,0)";
        this.child.style.transitionDuration = this.config.speed + "ms";
        //分页
        this.pagination(this.index);
    }else{
        if(this.endX - this.startX > 0){//向右滑-
            //判断是否第一个
            if(this.index == 0){
                this.index == 0
            }else{
                console.log()
                //当滑动距离》=屏幕3/1就到下一个
                if (Math.abs(this.endX - this.startX) >= this.Width/3) {
                    this.index--;
                }
    
            }
        }else{//向左滑+
            //当滑动到最后一个
            if(this.index == (this.child.children.length - 1)){
                this.index == (this.child.children.length - 1)
            }else{
                //当滑动距离》=屏幕一半就到上一个
                if (Math.abs(this.endX - this.startX) >= this.Width/3) {
                    this.index++;						
                }
            }
        }
        this.child.style.transform = "translate3d("+(- this.index*this.Width)+"px"+",0,0)";
        this.child.style.transitionDuration = this.config.speed + "ms";
        //分页
        this.pagination(this.index);
    }
    //启动定时器
    this.timer()
}
//判断是否需要分页
Swiper.prototype.hasPagination = function(){
    if(!this.config.pagination){
        return false;
    }
    return true;
}
//分页
Swiper.prototype.pagination = function(index){
    if(!this.hasPagination()){
        return false;
    }
    for(var i=0; i<this.length;i++){
        this.paginationId.children[i].className = "";
        if(i == index){
            this.paginationId.children[i].className = "active";
        }
    }
}
//是否自动循环
Swiper.prototype.hasAutoplay = function(){
    if(this.config.autoplay){
        return true;
    }
    return false;
}
//自动循环定时器
Swiper.prototype.timer = function(){
    if(this.hasAutoplay()){
        this.delay =  this.config.autoplay.delay?this.config.autoplay.delay:3000;
        this.delay = this.delay = this.config.speed?(this.delay + 1000) :this.delay;
        this.autoplay = setInterval(function(){
            this.index++;
            //是否闭环
            if(this.hasLoop()){    
                //当滑动到最后一个，分页回到第一个
                if(this.index == this.length){
                    this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- (this.index + 1)*this.offset)+"px"+",0,0)":"translate3d(0,"+(- (this.index + 1)*this.offset)+"px"+",0)";
                    //速度
                    this.child.style.transitionDuration = this.config.speed + "ms";
                    this.index = 0;
                    this.pagination(this.index);
                }else{
                    //速度
                    this.child.style.transitionDuration = this.config.speed + "ms";
                    this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- (this.index + 1)*this.offset)+"px"+",0,0)":"translate3d(0,"+(- (this.index + 1)*this.offset)+"px,0)";
                    this.pagination(this.index);
                }
                var Timeout = setTimeout(function(){
                    this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- (this.index + 1)*this.offset)+"px"+",0,0)":"translate3d(0,"+(- (this.index + 1)*this.offset)+"px"+",0)";
                    this.child.style.transitionDuration = "0s";
                    clearTimeout(Timeout)
                }.bind(this),this.config.speed)
            }else{
                //判断是否是最后一个
                if(this.index == this.length){
                    this.index = 0;
                }
                // if(this.config.direction == "horizontal"){
                //     this.child.style.transform = "translate3d("+(- this.index*this.Width)+"px"+",0,0)";
                // }else{
                    
                //     this.child.style.transform = "translate3d(0,"+(- this.index*this.height)+"px"+",0)";
                // }
                //速度
                this.child.style.transitionDuration = this.config.speed + "ms";
                this.child.style.transform = this.config.direction == "horizontal"?"translate3d("+(- this.index*this.offset)+"px"+",0,0)":"translate3d(0,"+(- this.index*this.offset)+"px,0)";
                this.pagination(this.index);
            }
        }.bind(this),(this.delay>this.config.speed?this.delay:this.config.speed));
    }
}
//是否闭合环路
Swiper.prototype.hasLoop = function(){
    if(this.config.loop){
        return true;
    }
    return false;
}
//闭合环路
Swiper.prototype.Loop = function(){
    if(this.hasLoop()){
        let div = document.createElement("div");
        div.appendChild(this.child.children[this.length-1].cloneNode(true))
        for(let i=0; i < this.length;i++){
            div.appendChild(this.child.children[i].cloneNode(true))
        }
        div.appendChild(this.child.children[0].cloneNode(true))
        this.child.innerHTML = div.innerHTML;
    }
}