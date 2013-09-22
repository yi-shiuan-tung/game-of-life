$(document).ready(function(){
	var board = Board();
	board.init(); //initializes the board
	var display = $('#board')[0]; //DOM element of the board
	
	display.addEventListener('mousemove',function(client){
		var x = Math.floor((client.x-30)/10)*10;
		var y = Math.floor((client.y-80)/10)*10;
		if (x==600) x=590;
		if (y==500) y=490;
		$('#xpos').innerHTML = y;
		$('#ypos').innerHTML = x;
	 });
	
	// function called by the start button
	var begin;
	var startButton = $('#start')[0];
	startButton.onclick = function(){
		begin = window.setInterval(function(){
			board.updateBoard();
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
		board.updateBoard(board);
	}
});