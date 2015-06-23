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
}

function checkDown(pR, pC, len){	// Check how many consecutive pieces is below the placed piece
	var cursorRow = pR;
	var cursorCol = pC;
	var limit = len
	var checkedRow;
	var keepLooping = true;
	var consec = 1;
	var checkedCol = cursorCol;

	while (keepLooping === true){
		if(cursorRow == limit-1){	// If piece is at bottom don't keep checking
			keepLooping = false;
			return consec;
		}
		else {
			checkedRow = cursorRow + 1;  //	The first row that will be checked first will be the one below where piece was placed
			if(fieldStatus[checkedRow][checkedCol] == "filled"){
				consec += 1;
				cursorRow += 1;
			}
		}
	}

	 // = pC;		// The first column that will be checked first will be the same one where piece was placed

	$("#generalLog").text("checked Row = " + checkedRow + " checked Col = " + checkedCol);
	return consec;
}

function checkConditions(cell){	// Check if anyone has won, and if not, keep playing
	var placedRow = $(cell).data("row");
	var placedCol = $(cell).data("col");
	var checkedRow = placedRow + 1; //	The first row that will be checked first will be the one below where piece was placed
	var checkedCol = placedCol;	// The first column that will be checked first will be the same one where piece was placed
	// Check consecutive pieces under
	var keepLooping = false;
	var consecutive = 0;

	
	consecutive = checkDown(placedRow, placedCol, fieldStatus.length);
	while(keepLooping === true){
		
		if(placedRow == fieldStatus.length-1){	// If dropped piece is at bottom
			keepLooping = false;
		}
		else{
			checkDown(placedRow, placedCol, fieldStatus.length);
		}
		testCell = "#box"+placedRow+placedCol;
		/*
		//Something is keeping the loop too long here
		
		if(fieldStatus[r][c] === "filled"){
			// consecutive = consecutive + 1;
		}
		else{

		} 	 	
		*/
	}
	$("#logEndLoop").text("looping end");
	$("#logPlacement").text("placement = " +placedRow+" "+placedCol + " " + ", consecutive = " + consecutive + "field length = " + fieldStatus.length);
	
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
		checkConditions(freeCell);
		freeCell = getFreeCell(this);	// Ensures hovering shows up after playing a piece
		hoverEffect(freeCell);
	});
})

