var fieldStatus = [
	["empty","empty","empty"],
	["empty","empty","empty"],
	["empty","empty","empty"]
];

function colorCell(cell){
	var row = $(cell).data("row");
	var col = $(cell).data("col");
	$(cell).addClass("clicked");	// Figure out how to drop piece in correct cell
	fieldStatus[row][col] = "filled";
}

function getFreeCell(cell){
	var row = 2;
	var col = $(cell).data("col");
	for(i = 0; i <= 2; i++){
		if(fieldStatus[row][col] === "filled"){
			row = row - 1;
		}
	}
	return "#box"+row+col;
}

function getFreeRow(row){

	return "2";
}

$(document).ready(function() {
	$(".cell").hover(function () {
		freeCell = getFreeCell(this);
		$(freeCell).addClass("hover");	// Figure out how to highlight bottom-most cell of each column
	}, function(){
		$(freeCell).removeClass("hover");
	}); // End hover

	$(".cell").click(function(){
		colorCell(this);
	});
})

