requirejs.config({
	paths:{
		jquery:"../jquery-1.11.3.min",
	}
})

requirejs(["jquery","backtop"],function($,backtop){
	new backtop.BackTop($("#backtop"),{
		mode:"go"
	})
	
	
//	var scroll=new scrolltop.ScrollTo({
//		dest:0,
//		speed:800
//	});
//	//$.proxy this指向为scroll
//	$("#backtop").on("click",$.proxy(scroll.move,scroll));
//	$(window).on("scroll",function(){
//		checkPosition($(window).height())
//	});
//	checkPosition($(window).height())
//	function move(){
//		$("html,body").animate({
//			scrollTop:0,
//		},800)
//	}
//	
//	function go(){
//		$("html,body").scrollTop(0)
//	}
//	
//	function checkPosition(pos){
//		if($(window).scrollTop()>pos){
//			$("#backtop").fadeIn()
//		}else{
//			$("#backtop").fadeOut()
//		}
//	}

})
