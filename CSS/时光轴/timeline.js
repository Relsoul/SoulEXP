window.onload=function(){
star.init();
star.scrubberMerge();
}


function Timeline(){
	this.list={};
	this.html_list=[];
}

//定义通用函数
Timeline.prototype.g=function(id){
	return document.getElementById(id)
}

Timeline.prototype.g_tpl=function(id){
	return this.g("tpl_"+id).innerHTML;
}

//格式化数据

Timeline.prototype.init=function(){

	var list=this.list;
	for (var i = 0; i < data.length; i++) {
		var date=new Date(data[i].date);
		var year=date.getFullYear();
		var month=date.getMonth()+1;
		var lunar=GetLunarDateString(date);

		if(!list[year]){list[year]={}}
		if(!list[year][month]){list[year][month]=[]}

		var item=data[i]
		//对象添加属性
		item.lunar=lunar[0]+"<br>&nbsp;&nbsp;&nbsp;"+lunar[1];
		item.year=year;
		item.month=month;

		item.like_format=item.like>=10000?(item.like/10000).toFixed(1)+"万":item.like
		//list[2013][2].push(Object)
		list[year][month].push(item)

	};
}

//时序菜单 HTML 生成
Timeline.prototype.scrubberMerge=function(){
	var html_list=this.html_list;
	//获取模板标签-year中的html
	var tpl_year=this.g_tpl("scrubber_year");
	var tpl_month=this.g_tpl("scrubber_month");
	for(y in this.list){
		//用list中的year来替换模板标签中的year
		var html_year=tpl_year.replace(/\{year\}/g,y);
		var html_month=[]
		for(m in this.list[y]){
			html_month.unshift(tpl_month.replace(/\{month\}/g,m))
		}

		html_year=html_year.replace(/\{list\}/g,html_month.join(""));

		html_list.push(html_year);
	}

	this.g("scrubber").innerHTML=html_list.join("")

}


Timeline.prototype.












var star=new Timeline();



