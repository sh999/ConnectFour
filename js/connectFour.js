function colorCell(cell){
	var row = $(cell).data("row");
	var col = $(cell).data("col");
	$("#box22").addClass("clicked");	// Figure out how to drop piece in correct cell
}

$(document).ready(function() {
	$(".cell").hover(function () {
		$("#box22").addClass("hover");	// Figure out how to highlight bottom-most cell of each column
	}, function(){
		$("#box22").removeClass("hover");
	}); // End hover

	$(".cell").click(function(){
		colorCell(this);
	});
})

