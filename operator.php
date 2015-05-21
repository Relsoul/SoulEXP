<?php 
//operator为运算符的意思
function br(){
	echo "<br>";
}


$english=110;//英语成绩哪有这么好- -
$math=118;//向前移一个小数点就差不多了
$biological=80;//生物
$physical=90;//物理

$sum=$english+$math+$biological+$physical;
$avg=$sum/4;
$x=$math-$english;
$x2=$english*$english;


echo "总分:".$sum."<br>";
echo "平均分:".$avg."<br>";
echo "数学比英语高多少分:".$x."<br>";
echo "英语平方:".$x2."<br>";

//现在开始赋值运算符
$word1="soul";
$s_word1=$word1;
$c_word1=&$word1;//&符号只相当于别名,当数据发生变化后赋值一样会发生变化
$word1="soulseeker";
echo $s_word1."<br>";
echo $c_word1."<br>";
//现在开始比较运算符

$t1=1;
$t2="1";

var_dump( $t1==$t2);//普通=，只会比较值是否一样
br();
var_dump($t1===$t2);//严格等于,会连类型都判断
br();
var_dump($t1!=$t2);//普通不等
br();
var_dump($t1!==$t2);//如果t1不等于t2,或者他们类型不同返回true
br();
var_dump($t1<>$t2);//不等 同等于!=
br();
var_dump($t1>=$t2);//大于等于，小于等于都不会去判断数据类型
br();
var_dump($t1<=$t2);//
br();
var_dump($t1>$t2);//大于，小于会严格判断数据和数据类型
br();

//现在开始三元运算符

$t3=78;

$t4=$t3>60?"我及格了":"我没及格";
echo $t4;
br();
//现在开始逻辑运算符
    $a = TRUE; //A同意
	$b = TRUE; //B同意
	$c = FALSE; //C反对
	$d = FALSE; //D反对
	//咱顺便复习下三元运算符
	echo ($a and $b)?"通过":"不通过";
	echo "<br />";
	echo ($a or $c)?"通过":"不通过";
	echo "<br />";
	echo ($a xor $c xor $d)?"通过":"不通过";//a或者b只有一个为true返回true
	echo "<br />";
	echo !$c?"通过":"不通过";
	echo "<br />";
	echo ($a&&$d)?"通过":"不通过";
	echo "<br />";
    echo($a||$b||$c)?"通过":"不通过";
	
//现在开始字符串连接符
      $a = "张先生";
	$tip=$a.",欢迎您在慕课网学习PHP";
	
    $b = "东边日出西边雨";
    $b.=",道是无晴却有晴";//等同于$c=$c.",道是无晴却有晴";
    
    
	$c = "东边日出西边雨";	
    $c=$c.",道是无晴却有晴";
    
	echo  $tip."<br />";
	echo  $b."<br />";
	echo  $c."<br />";

//错误运算符
$conn=@mysql_connect("localhost","username","password");//@只能放在表达式中,不能放在foreach等循环中
 echo "出错了，错误原因是：".$php_errormsg;

//运算符2
      $maxLine = 4; //每排人数
	 $no = 17;//学生编号
    $line=ceil($no/$maxLine);//判断座位
	$row=$no%$maxLine?$no%$maxLine:$maxLine;//是否除尽？ 否取余数 是取$maxLine

	 echo "编号<b>".$no."</b>的座位在第<b>".$line."</b>排第<b>".$row."</b>个位置";



?>