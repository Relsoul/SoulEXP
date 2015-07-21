requirejs.config({
	//配置别名
	paths:{
		//无需.js
		jquery:"jquery-1.11.3.min"
	}
})

//第一个为数组，后面为回调函数
requirejs(['jquery','vadata'],function($,vadata){
	console.log(vadata.isEqual(1,2))
})
