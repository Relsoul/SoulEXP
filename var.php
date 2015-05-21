<?php 
$int=1;
$int1=0x123;
echo $int+$int1;
echo "<br>";

$bool1=true;
var_dump($bool1);
echo "<br>";

$str="hello";
$str1="soul";
echo $str.$str1;
echo "<br>";
echo "$str\n$str1";
echo "<br>";
echo <<<GOD
测试GOD标记法<br>
GOD;

echo "现在开始输出系统常量<br>";
echo "php物理路径".__FILE__."<br>";
echo "代码所在行数".__LINE__."<br>";
echo "PHP版本".PHP_VERSION."<br>";
echo "PHP服务器".PHP_OS."<br>";

echo "开始常量<br>";
define("MY","soul");
define('MY1',"seeker");
$system=true;
if ($system) {
	$cons="MY1";
	# code...
}else{
	$cons="MY";
}

$area=constant($cons);
echo "$area"."<br>";

//利用defined来判断常量是否被定义
define('test', 'test1');
$p="test";

var_dump(defined($p));//true
var_dump(defined("test2"));//false


?>