var interval;
$(window).bind("load", function() {
	$("#slideshow").show();
	$("#slideshow > div:gt(0)").hide();
	interval = setInterval(slide_right,  3000);

});
function slide_left(){
	clearInterval(interval);
	var x1 = $('#slideshow > div:first');
	var x2 = x1.fadeOut(100)
	var x3 = $('#slideshow > div:last');
	var x4 = x3.fadeIn(500)
	var x6 = $('#slideshow > div:first').before(x4);
	interval = setInterval(slide_right,  3000);
}
function slide_right(){
	clearInterval(interval);
	var x1 = $('#slideshow > div:first');
	var x2 = x1.fadeOut(100);
	var x3 = x2.next();
	var x4 = x3.fadeIn(500);
	var x5 = x4.end();
	var x6 = x5.appendTo('#slideshow');
	interval = setInterval(slide_right,  3000);
}
larrow.onclick = slide_left;
rarrow.onclick = slide_right;;