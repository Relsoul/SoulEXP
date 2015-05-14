window.onload=function(){
	getCliwidth("cont","box");
	window.onscroll=function(){
		if(checkFlag()){
		var imgData={
			"data":[
			{"src":"m-3.jpg"},{"src":"m-4.jpg"},{"src":"m-5.jpg"},{"src":"m-6.jpg"},{"src":"m-7.jpg"},
			{"src":"m-8.jpg"}
			]
		};
		var parent=document.getElementById("cont");
		console.log(imgData.data.length);//输出imgDatajson字符串中data属性的长度
		for (var i = 0; i < imgData.data.length; i++) {
			var new_box=document.createElement("div");
			new_box.className="box";
			parent.appendChild(new_box);
			var new_boximg=document.createElement("div");
			new_boximg.className="box_img";
			new_box.appendChild(new_boximg);
			var new_img =document.createElement("img");
			new_img.src=imgData.data[i].src;
			new_boximg.appendChild(new_img);
			
		};

		getCliwidth("cont","box");
			
		}
	}
}

//思路 盒子可以理解为图片
//1先获取到cont元素下面的盒子
//2在判断一列能够放多少个这样的盒子
//3然后获取到第一列当中高度最小的盒子
//4然后获取到第一列当中最小高度盒子的位置 也就是数组下标
//4.5 设置第二列图片的顶部距离为第一列盒子的最小高度
//5把第二列图片的居左属性设置为最小高度盒子的居左属性
//6然后把第一列最小盒子的高度加上第二列图片的高度
//滚动监听思路
//1获取到最后一张图片距离浏览器顶部的距离
//2获取滚动条距离浏览器顶部距离
//3获取当前页面可见的高度
//4如果当前页面的可见高度加上滚动条移动的像素 大于整个页面像素（也就是第一张图片距离浏览器顶部距离）
//循环输出思路
//1用json字符串来保存需要循环加载的图片src和地址
//2遍历json字符串data属性的长度
//3然后创建一个<div class="box"><div class="box_img"><img src="m-4.jpg" alt=""></div></div>
//因为是遍历循环 所以我们创建一次就ok了
//4设置img src等于imgData.data[i].src 
//5创建后给新创建的元素添加上瀑布流效果getCliwidth("cont","box");
function checkFlag(){
	var parent=document.getElementById("cont");
	var boximglist=saveBox(parent,"box");
	// console.log(boximglist);//页面有多少图片
	var last_boximglist=boximglist[boximglist.length-1];
	// console.log(last_boximglist);//获取到最后一个图片
	var last_boximgtop=last_boximglist.offsetTop;
	// console.log(last_boximgtop)//获取到最后一张图片距离页面顶部多长
	//开始第二步 获取滚动条滚动了多少像素
	var scroll_px =document.documentElement.scrollTop||document.body.scrollTop;
	// console.log(scroll_px);//滚动条滚动了多少像素
	//第三步 获取当前可见页面的高度
	var page_height=document.documentElement.clientHeight||document.body.clientHeight;
	console.log("最后一张图片距离顶部高度:"+last_boximgtop+"|滚动条滚动了:"+scroll_px+"像素|"+"页面可见高度："+page_height);
	if(scroll_px+page_height>last_boximgtop){
		return true;
		
	}


}

function getCliwidth(parent,content){
	var parent =document.getElementById(parent);//先获取到最高级的父级元素
	var allbox=saveBox(parent,content);//现在已经获取到sava_box数组了 所有的盒子全部保存在这里
	// console.log(allbox);//控制台展示获取到多少盒子
	var firstwidth =allbox[0].offsetWidth;//获取到图片的宽度 因为css已经固定了宽度为200px
	var scnwidth = document.documentElement.clientWidth;//然后获取到屏幕的宽度
	var cols =Math.floor(scnwidth/firstwidth);//用屏幕总宽度除以图片的宽度 就可以获取到第一列可以放多少个图片了
	parent.style.cssText="width:"+cols*firstwidth+"px;margin:0px auto";//设置cont的宽度为列数乘以图片宽度
	var eboxheight=[];//设置个数组来储存盒子的高度
	for (var i = 0; i < allbox.length; i++) {
		if(i<cols){//只获取第一列的图片高度
			eboxheight[i]=allbox[i].offsetHeight;//在数组eboxheight存储第一列每个盒子的高度
			
		}else{
			var minheightbox=Math.min.apply(null,eboxheight);//设置一个变量来存储高度数组中最小高度的盒子高度 而不是位置
			console.log(minheightbox)
			var minheightboxpostion =getMinheight(eboxheight,minheightbox);//获取到高度最小盒子的位置 这才是位置 也就是数组下标
			allbox[i].style.position="absolute";//设置第二列盒子的定位为绝对定义 这样才可以设置 top left属性
			allbox[i].style.top=minheightbox+"px";//设置第二列图片的顶部距离为 第一列最小图片的高度
			allbox[i].style.left=allbox[minheightboxpostion].offsetLeft+"px";//设置第二列图片的居左为第一列最小图片的居左属性
			eboxheight[minheightboxpostion]=eboxheight[minheightboxpostion]+allbox[i].offsetHeight;//把第一列最小盒子的高度加上第二列图片的高度



		}
	};

}

function getMinheight(eboxheight,minheightbox){//获取第一列最小图片高度的位置
	var i;//定义个变量i来遍历
	for(i in eboxheight){//
		if(eboxheight[i]==minheightbox){
			//如果盒子高度数组的高度等于最小高度 返回这个图片的下标 也就是位置
			return i;
			
		}

	}

}

function saveBox(parent,content){
	var save_box=[];//创建个保存盒子数组
	var parentnum =parent.getElementsByTagName("*");//获取到cont元素下面有多少个元素
	for (var i = 0; i < parentnum.length; i++) {//开始遍历寻找cont元素下有多少个元素
		if(parentnum[i].className==content){//因为我们只要盒子所以 所以我们要判断元素的classname等于box就行了 
			//检测cont下面的div元素的className是否等于content
			save_box.push(parentnum[i]);//然后把这些元素全部存储进去
		}
		
	};
	return save_box;

}