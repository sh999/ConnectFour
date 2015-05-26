$(document).ready(function() {
	$(".cell").hover(function () {
		$(this).addClass("hover");
	}, function(){
		$(this).removeClass("hover");
	}); // End hover
})