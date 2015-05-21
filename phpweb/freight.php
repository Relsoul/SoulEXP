<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<table>
	<tr>
		<td>距离</td>
		<td>费用</td>
	</tr>
	<?php 

	for($i=0,$sum=50;$i<5;$i++){
		echo "<tr>
		<td align=\"right\">".$sum."</td><td align=\"right\">".($sum/10)."</td></tr>";
		$sum+=50;
	}





	 ?>
	</table>
</body>
</html>