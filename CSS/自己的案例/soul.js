$(function(){

	function obj(){
		this.timer=null;
	}


	//初始化WH
	obj.prototype.initWH=function(){
		var w=document.documentElement.clientWidth||$("body").width();
		var h=document.documentElement.clientHeight||$("body").width();
		
		if($("#overlay").css("display")=="none"){
			return false;

		}else{
			console.log("ok");
			$("#overlay").css({
				height:h,
				width:w
			})

			var myH=$("#my").height();
			var myW=$("#my").width();

			$("#my").css({
				marginTop:-(myH/2),
				marginLeft:-(myW/2)
			})

			clearTimeout(this.timer)
			this.timer=setTimeout(this.myClose,5000)

		}

	}

	//延迟监听函数
	obj.prototype.throttle=function(method,context){
            clearTimeout(method.tId);
            method.tId=setTimeout(function(){
                method.call(context);
            },300);
       }


    obj.prototype.myClose=function(){

    	$("#overlay").stop().animate({
    		opacity:0,
    		width:0},
    		1000, function() {
    		$("#overlay").css("display","none")
    	});
    }

    obj.prototype.msitu=function(){
    	$("#my").click(function() {
    		$(this).snabbt({
					  rotation: [0, Math.PI, 0],
 					 easing:"ease",
				}).snabbt({
					rotation:[0,0,0]
				})

    	});
    }





var soul=new obj();
soul.initWH();
soul.msitu()

//调用监听函数
window.onresize=function(){
	soul.throttle(soul.initWH,window);
}
})





