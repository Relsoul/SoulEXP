var auto = setInterval(function() {
	var elem = document.getElementById("courseLearn-inner-box").getElementsByTagName("input")
	var arr = []
	for (var i = 0; i < elem.length; i++) {
		if (parseInt(elem[i].value) != 0) {
			arr.push(elem[i])
		}
	}
	console.log(arr)


	for (var j = 0; j < arr.length; j++) {
		arr[j].checked = true
	}


	function sibling(elem) {
		var r = [];
		var n = elem.parentNode.firstChild;
		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n !== elem) {
				r.push(n);
			}
		}
		return r;
	}
	

	var str = "写的很不错，开拓了我的眼界和思维，同时让我学习到了新的代码写法 给满分！"

	var textelem = document.getElementById("courseLearn-inner-box").getElementsByTagName("textarea")

	for (var z = 0; z < textelem.length; z++) {
		textelem[z].value = str

	}

	var submitebtn = document.querySelector(".j-submitbtn");
	submitebtn.click();
	var timer = setTimeout(function() {
		var elema = document.querySelector(".j-gotonext")
		elema.click()
	}, 3000)
}, 6000)