function showPic(whichpic) 
{var source = whichpic.getAttribute(attributeName)("href");
var placeholder = document.getElementById("shit");
placeholder.setAttribute("src",source);
}