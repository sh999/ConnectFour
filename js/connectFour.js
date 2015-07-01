// Current issue: Turning not right
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
		fieldStatus[row][col] = "red";
	}
	else{
		$(cell).addClass("blue");
		fieldStatus[row][col] = "blue";
	}
	$(cell).addClass("clicked");	// Figure out how to drop piece in correct cell
	// fieldStatus[row][col] = "filled";
}

function getFreeCell(cell){
	var row = fieldStatus.length-1;
	// var row = $(cell).data("row");
	var col = $(cell).data("col");
	for(i = 0; i <= fieldStatus.length-1; i++){
		if(fieldStatus[row][col] === "red" || fieldStatus[row][col] === "blue"){
			row = row - 1;
		}
	}
	return "#box"+row+col;
}

function checkConsecutive(_cursorRow, _cursorCol, _rowMaxLimit, _colMaxLimit, _player, checkingDirection){	// Returns how many consecutive pieces is below the placed piece
	var cursorRow = _cursorRow;
	var cursorCol = _cursorCol;
	var rowMaxLimit = _rowMaxLimit-1;
	var colMaxLimit = _colMaxLimit-1;
	var keepLooping = true;
	var consecutive = 1;
	var player;
	var checkDirectionRow = checkingDirection[0];	// Planning to generalize checking function by giving direction of checking to prevent copying of this function for all the different directions
	var checkDirectionCol = checkingDirection[1];
	var checkedRow = cursorRow + checkDirectionRow;
	var checkedCol = cursorCol + checkDirectionCol;
	if(_player === 1){ 
		player = "red";
	}
	else{
		player = "blue";
	}
	while(keepLooping === true){
		if((checkedRow > rowMaxLimit)||(checkedCol > colMaxLimit)
		 ||(checkedRow < 0) || (checkedCol < 0)){	// If piece is at bottom don't keep checking
			keepLooping = false;
			return consecutive;	// Returns default value 1
		}
		else {
			if(fieldStatus[checkedRow][checkedCol] == player){
				consecutive += 1;
				cursorRow += checkDirectionRow;
				cursorCol += checkDirectionCol;
			}
			else{
				keepLooping = false;
			}
		}
		checkedRow = checkedRow + checkDirectionRow;
		checkedCol = checkedCol + checkDirectionCol;
	}
	$("#generalLog").text("checked Row = " + checkedRow + " checked Col = " + checkedCol);
	return consecutive;
}

function checkConditions(cell){	// Check if anyone has won, and if not, keep playing
	var placedRow = $(cell).data("row");
	var placedCol = $(cell).data("col");
	var checkedRow = placedRow + 1; //	The first row that will be checked first will be the one below where piece was placed
	var checkedCol = placedCol;	// The first column that will be checked first will be the same one where piece was placed
	var keepLooping = false;
	var consecutiveDown = 0;
	var consecutiveRight = 0;
	var consecutiveUpRight = 0;
	var consecutiveDownRight = 0;
	var consecutiveDownLeft = 0;
	var consecutiveUpLeft = 0;
	var consecutiveLeft = 0;
	consecutiveDown = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [1,0]);
	consecutiveDownRight = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [1,1]);
	consecutiveRight = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [0,1]);
	consecutiveUpRight = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [-1,1]);
	consecutiveLeft = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [0,-1]);
	consecutiveDownLeft = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [1,-1]);
	consecutiveUpLeft = checkConsecutive(placedRow, placedCol, fieldStatus.length, fieldStatus[0].length, turn.getCurrentPlayer(), [-1,-1]);
	$("#logEndLoop").text("looping end");
	$("#logPlacement").text("placement = " +placedRow+" "+placedCol + " " + "field length = " + fieldStatus.length);
	$("#logCheckConsecutive").text("consecutive down = " + consecutiveDown + ", right = " + consecutiveRight + ", down-right = " + consecutiveDownRight + ", up-right = " + consecutiveUpRight
		+ ", UpLeft = " + consecutiveUpLeft + ", Left = " + consecutiveLeft + ", down left = " + consecutiveDownLeft);
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

