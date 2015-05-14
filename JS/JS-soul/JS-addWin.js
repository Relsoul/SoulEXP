
function addWin(func){//定义函数addWin并且自定义一个变量func
			var oldevent=window.onload;//设置oldevent等于window.onload 意思就是把原来的函数存储起来
			if(typeof window.onload == "function"){//如果win.onload类型是函数，当然如果原来没写过window.onload那么就不是函数了
				window.onload =function(){//设置window.onload
					oldevent();//添加上原来的老函数
					func();//添加上新的函数
					console.log(oldevent)
					console.log(func)
				}
			}else{//如果原来没写过window.onload那么执行
				window.onload =func;//设置window.onload=func
				console.log(func)
			}
		}
