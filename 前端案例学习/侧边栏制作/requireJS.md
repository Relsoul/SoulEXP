###为什么使用RequireJS
1. 有效的防止命令**冲突**
2. 声明不同js文件之间的**依赖**
3. 可以让我们的代码以**模块化**的方式组织

###[RequireJS官网](http://requirejs.org/)

###RequireJS常用方法
1.requirejs.config
```
requirejs.config({
	//配置别名
	paths:{
		//无需.js
		jquery:"jquery-1.11.3.min"
	}
})
```
2.requirejs
```
//第一个为数组，后面为回调函数
requirejs(['jquery','vadata'],function($,vadata){
	console.log(vadata.isEqual(1,2))
})

```
3.define
```
define(['jquery'],function($){

	//暴露借口
	return{
		isEmpty:function(){},
		isEqual:function(str1,str2){
			return str1===str2;
		}
	}
});

```

data-main(入口文件):require.js加载完毕后执行的文件 js文件无需后缀

