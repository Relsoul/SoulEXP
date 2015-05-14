$(function(){

	$('.link .button').hover(function(){ //给.link .button添加移动方法hover(移入,移除)
		var title=$(this).attr('data');//获取到this也就是鼠标移入的标签中的data值
		$('.tip em').text(title);//给.tip em添加上title
		var pos=$(this).position().left+10;//获取鼠标移入的标签相对于已经设置定位的父元素的left
		var dis=($('.tip').outerWidth()-$(this).outerWidth())/2;//这句话的意思是 用tip的宽度减去this的宽度这里的宽度指的是所有宽度加起来除以2
		var l=pos-dis;
		console.log(l)
		$('.tip').css({'left':l+"px"}).stop().animate({'top':140,'opacity':1},400)//设置tip的css的left为l
		//同时设置一个动画,top从100移动到140 opacity从0变成1 用时400秒
	},function(){
		//鼠标移出事件
		
			$(".tip").stop().animate({'top':100,'opacity':0},400)
		
		
	})
})