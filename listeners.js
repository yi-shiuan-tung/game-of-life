$(document).ready(function(){
	var boardObject = Board();
	boardObject.init(); //initializes the board
	var display = Display(boardObject);
	display.init(); //initializes display
	
	//Function that steps through a single iteration of Game of Life
	var stepGameofLife = function(){
		var change = boardObject.updateBoard();
		for (i in change.white) {
			display.changeWhite(change.white[i].x,change.white[i].y);
		}
		for (i in change.black){
			display.changeBlack(change.black[i].x,change.black[i].y);
			
		}
	}	
	
	// this variable keeps track of the state of the board
	// there are two states: start and stop
	var started = false;
	
	// function called by the start button
	var begin;
	var startButton = $('#start')[0];
	startButton.onclick = function(){
		if (!started) {
			started = true;
			begin = window.setInterval(function(){
				stepGameofLife();
			},50);
		}
	}
	// function called by the stop button
	var stopButton = $('#stop')[0];
	stopButton.onclick = function(){
		if (started) {
			started = false;
			begin = window.clearInterval(begin);
		}
	}
	// function called by the step button to updateBoard one step at a time
	var stepButton = $('#step')[0];
	stepButton.onclick = function(){
		if (!started) {
			stepGameofLife();
		}
	}
});