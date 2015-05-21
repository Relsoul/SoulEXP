<!doctype html>
<?php
//定义常数
define('TIREPRICE', 100);
define('OILPRICE', 10);
define('SPARKPRICE',4);

//获取表单域中的数据
$tireqty=$_POST['tireqty'];
$oilqty=$_POST["oilqty"];
$sparkqty=$_POST["sparkqty"];
$totalqty=0;
$totalqty=$tireqty+$oilqty+$sparkqty;
$totalamount=0.00;//(float)$totalqty 整形转化为浮点，但是不会影响$totalqty
$totalamount=$tireqty*TIREPRICE+$oilqty*OILPRICE+$sparkqty*SPARKPRICE;
$taxrate=0.10;

?>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Bob的自动处理系统</title>
</head>
<body>
	<h1>BOb自动订单</h1>
	<h2>执行结果</h2>
	<?php
	echo "<p>命令处理时间于".date("H:i,jS F Y")."</p>";
	echo "<p>你选择的商品数量为</p>";
	echo "商品数量:".$totalqty."<br>";
	echo "折扣后:".number_format($totalamount,2)."<br>";//保留后两位小数点 
	$totalamount=$totalamount*(1+$taxrate);
	echo "原价".number_format($totalamount,2)."<br>"
	?>
</body>
</html>