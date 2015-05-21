<?php 

function br(){echo "<br>";}
if(@!$ss){
	echo "不存在ss变量,错误已经隐藏 <br>";
}else{
	echo "存在ss变量<br>";
}

$ron=mt_rand(1,10);
// if($ron){
// 	if($ron==2){
// 		echo "目前随机为:$ron";
// 	}elseif($ron==4){
// 		echo "目前随机为:$ron";
// 	}elseif($ron==8){
// 		echo "目前随机为:$ron";
// 	}else{
// 		echo "目前随机数不在2，4，8";
// 	}

// }

//用switch完成上面那串代码
br();
switch ($ron) {
	case 2:
		echo "目前随机为:$ron";
		break;
	case 4:
		echo "目前随机为:$ron";
		break;
	case 8:
		echo "目前随机为:$ron";
		break;	
	default:
		echo "目前随机数不在2，4，8";
		break;
}
//





?>