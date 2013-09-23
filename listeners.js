$(document).ready(function(){
	var boardObject = Board();
	boardObject.init(); //initializes the board
	var display = Display(boardObject);
	display.init(); //initializes display
	var stepGameofLife = function(){
		var change = boardObject.updateBoard();
		for (i in change.white) {
			display.changeWhite(change.white[i].x,change.white[i].y);
		}
		for (i in change.black){
			display.changeBlack(change.black[i].x,change.black[i].y);
			
		}
	}	
	
	// function called by the start button
	var begin;
	var startButton = $('#start')[0];
	startButton.onclick = function(){
		begin = window.setInterval(function(){
			stepGameofLife();
		},100);
	}
	// function called by the stop button
	var stopButton = $('#stop')[0];
	stopButton.onclick = function(){
		begin = window.clearInterval(begin);
	}
	// function called by the step button to updateBoard one step at a time
	var stepButton = $('#step')[0];
	stepButton.onclick = function(){
		stepGameofLife();
	}
});