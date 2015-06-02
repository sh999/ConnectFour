var fieldStatus = [
	["empty","empty","empty","empty","empty","empty","empty"],
	["empty","empty","empty","empty","empty","empty","empty"],
	["empty","empty","empty","empty","empty","empty","empty"],
	["empty","empty","empty","empty","empty","empty","empty"],
	["empty","empty","empty","empty","empty","empty","empty"],
	["empty","empty","empty","empty","empty","empty","empty"],
];

var turn = {
	number: 0,
	getCurrentPlayer:function(){
		if(this.number % 2 === 0){
			return 1;
		}
		else{
			return 2;
		}
	},
	changeTurn:function(){
		this.number = this.number + 1;
	}
};

function colorCell(cell){
	var row = $(cell).data("row");
	var col = $(cell).data("col");
	if (turn.getCurrentPlayer() === 1){
		$(cell).addClass("red");
	}
	else{
		$(cell).addClass("blue");
	}
	$(cell).addClass("clicked");	// Figure out how to drop piece in correct cell
	fieldStatus[row][col] = "filled";
}

function getFreeCell(cell){
	var row = fieldStatus.length-1;
	// var row = $(cell).data("row");
	var col = $(cell).data("col");
	for(i = 0; i <= fieldStatus.length-1; i++){
		if(fieldStatus[row][col] === "filled"){
			row = row - 1;
		}
	}
	return "#box"+row+col;
	// return "#box00";
}

function checkConditions(){	// Check if anyone has won, and if not, keep playing
	turn.changeTurn();
}

function hoverEffect(freeCell){
	if(turn.getCurrentPlayer() === 1){
			$(freeCell).addClass("hoverPlayerOne");	// Figure out how to highlight bottom-most cell of each column
		}
	else {
		$(freeCell).addClass("hoverPlayerTwo");
	}
}

$(document).ready(function() {
	var freeCell;
	$(".cell").hover(function () {
		freeCell = getFreeCell(this);	
		hoverEffect(freeCell);
	}, function(){
		if(turn.getCurrentPlayer() === 1){
			$(freeCell).removeClass("hoverPlayerOne");	// Figure out how to highlight bottom-most cell of each column
		}
		else {
			$(freeCell).removeClass("hoverPlayerTwo");
		}
	}); // End hover
	$(".cell").click(function(){
		colorCell(freeCell);
		checkConditions();
		freeCell = getFreeCell(this);	// Ensures hovering shows up after playing a piece
		hoverEffect(freeCell);
	});
})

