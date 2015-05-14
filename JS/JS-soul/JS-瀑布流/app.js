window.onload=function(){
	imgLocation("cont","box");//给imgLocation传递参数 "cont","box"
}
function imgLocation(parent,content){//定义函数imgLocation并且定义两个参数 一个parent,一个content 
	//接受上面传递下来的"cont","box"
	//将parent下所有内容全部取出

	var cparent =document.getElementById(parent);//设置变量 cparent等于id为parent
	var ccontent =getChildElement(cparent,content);//调用函数 并且传递两个参数cparent(id为cont);,content(box);
	// console.log(ccontent);//按F12 可以在控制台看到数组内容
	var imgwidth= ccontent[0].offsetWidth;//ccontent返回过来的是一个content_Arr数组
	//设置变量imgwidth等于数组中的第一个元素的宽度
	//.因为宽度在css当中是固定200px,所以你获取第二个，第三个也是ok的

	var cols =Math.floor(document.documentElement.clientWidth/imgwidth);//Math.floor是把浮点数转换为整数
	//获取整个屏幕宽度（document.documentElement.clientWidth）再除以你图片宽度（imgwidth）就是你一排能放多少列了！
	//比如我的屏幕是1366 然后1366/200 等于6.83获取整数 就是6列
	console.log(cols);//控制台输出列数
	cparent.style.cssText="width:"+cols*imgwidth+"px;margin:0px auto;";//给class="cont"的div添加css
	//css内容为 width:6*200px;也就是1200px;然后加一个居中的属性
	var colsimgheight=[];//设置一个变量
	for (var i = 0; i < ccontent.length; i++) {//ccontent=返回过来的content_Arr数组 数组内容是获取每个class为box
		//并且存储起来.那么这里就是遍历每个box盒子 一共遍历10次(因为有10个盒子)
		//i就相当于数组下标
		if(i<cols){//i从0开始计数 如果i小于列数 这句话的意思是 只获取一列当中的盒子
			//colsimgheight.push(ccontent[i].offsetHeight)//这个相等于下面那句话
			colsimgheight[i]=ccontent[i].offsetHeight;//设置colsimgheight[i]等于每个box的高度
			console.log(colsimgheight[i]);
		}else{//如果i等于大于cols 意思就是 设置第一列以外图片的最小高度
			var minheight=Math.min.apply(null,colsimgheight);//比较数组中哪个高度最小 具体函数意思推度娘一下
			var minheightbox=getColsminPosition(colsimgheight,minheight);//调用获取第一列最小高度的box位置
			ccontent[i].style.position="absolute";//设置cconten[i]的定位为绝对定位
			ccontent[i].style.top=minheight+"px";//设置除第一列以外的盒子的高度为 最小高度
			ccontent[i].style.left=ccontent[minheightbox].offsetLeft+"px"//设置除第一列以外的盒子的居左为
			//最小的盒子的居左宽度
			colsimgheight[minheightbox]=colsimgheight[minheightbox]+ccontent[i].offsetHeight;
			//首先第一次遍历 获取到第一列最小的图片位置colsimgheight[minheightbox]
			//第一列图片最小的位置等于第一列图片最小的图片高度加上当前第二列图片的高度
			//然后第二次遍历 8大于6 再次比较数组中哪个高度最小var minheight=Math.min.apply(null,colsimgheight);
			// 第一次遍历是第二个图片高度最小也就是[1];第二次遍历的时候 因为第二个图片已经加上了当前图片的高度
			//所以第二个图片不再是最小的,

			//举个例子：cconten[7].style.positon="absolute"因为7大于cols
// 			整体思路就是  
// 1.获取到屏幕有多宽
// 2.判断当前屏幕能够一列放几个图片
// 3.获取到第一列当中高度最小的图片
// 4.然后获取到第一列图片宽度最小图片的位置 也就是数组下标
// 5.然后把第二列图片居左属性设置为第一列最小图片的居左
// 6.然后把第一列最小图片的高度加上第二列图片的高度

		}
	};
}	

function getColsminPosition(colsimgheight,minheight){//获取第一列当中高度最小的图片的位置
	for(var i in colsimgheight){//遍历第一列最小高度数组
		if(colsimgheight[i]==minheight){//哪个box是最小高度
			return i;//返回i 也就是返回box的位置

			
		}
	}


}


function getChildElement(parent,content){//定义一个函数 并且传递两个参数 这个函数作用是把cont下的
	//class为box的函数存储在数组当中 也就是获取到"box"并且储存起来
	var content_Arr=[];//定义一个数组
	var allcontent= parent.getElementsByTagName("*");//定义变量allcontent等于parent(传递下来的是cont)下的全部标签(*)*是通配符
	for (var i = 0; i < allcontent.length; i++) {//遍历标签
		if(allcontent[i].className==content){//如果allcontent中的标签class等于content(box);
			content_Arr.push(allcontent[i]);//把allcontent[i]添加进数组 .push的意思是在数组最后添加
			//content_Arr[0]=div[0](第一个div标签) 
			//content_Arr[1]=div[1]（第二个div标签)等等

		}
	};
	return content_Arr;//返回content_Arr数组
}