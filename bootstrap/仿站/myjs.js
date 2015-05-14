var save_scroll;
var nav_scroll;
$(window).scroll( function() { 

	save_scroll=$(document).scrollTop();
	console.log(save_scroll);
	if(save_scroll>=300){
		$('#nav').stop().animate({
			left:'0',width:"0"},300,function(e){$('#nav').children('li').hide()});
	}else{
		$('#nav').stop().animate({left:'80px', width:'90%'},300,function(e){$('#nav').children('li').show()})
	}


} );