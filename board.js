// constructor for square
var Square = function (x,y,fill){
	return {
		x: x, //integer, the x position of the square
		y: y, //integer, the y position of the square
		fill: fill //boolean, whether the square is filled or not
	};
}

//create a board object
var board = {};
var init = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	
	filled_squares = [];
	
	var RADIUS = 10;
	//initialize squares 
	for (var i = 0; i < width; i +=RADIUS) {
		board[i] = [];
		for (var j = 0; j < height; j +=RADIUS) {
			board[i].push(Square(i,j,false));
		}
	}
	canvas.addEventListener('click',OnClick,false);
}

///////////////////////////////////////////
////////////Event Listeners////////////////
///////////////////////////////////////////
function MouseMove(evt) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var position = getMousePos(canvas,evt);
	var x = Math.floor(position.x/10)*10;
	var y = Math.floor(position.y/10)*10;
	context.fillStyle = "#000000";
	context.fillRect(x,y,10,10);
	board[x][y/10].fill = true;
}
function OnClick(evt) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var position = getMousePos(canvas,evt);
	var x = Math.floor(position.x/10)*10;
	var y = Math.floor(position.y/10)*10;
	context.fillStyle = "#000000";
	context.fillRect(x,y,10,10);
	board[x][y/10].fill = true;
}
function switchMouse() {
	canvas.removeEventListener('click',OnClick,false);
	canvas.addEventListener('mousemove',MouseMove,false);
}
function switchClick() {
	canvas.removeEventListener('mousemove',MouseMove,false);
	canvas.addEventListener('click',OnClick,false);
}

// function called by the start button
var begin;
var start = function(){
	begin = window.setInterval(function(){
		updateBoard(board);
	},100);
}
// function called by the stop button
var stop = function(){
	begin = window.clearInterval(begin);
}
// function called by the step button to updateBoard one step at a time
var step = function(){
	updateBoard(board);
}
// function that gets the mouse position on the canvas
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

// iterates through each square and calls the update function
function updateBoard(board) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var pad = Pad(canvas);
	var change = {'white':[],'black':[]};
	for (row in board) {
		for (var i=0;i<50;i++) {
			var ans = update(row,i,board);
			if (ans) {
				if (ans==1) change.white.push(Coord(row,i));
				else change.black.push(Coord(row,i));
			}
		}
	}
	for (square in change.white) {
		setWhite(change.white[square].x,change.white[square].y,context,pad);
	}
	for (square in change.black) {
		setBlack(change.black[square].x,change.black[square].y,context,pad);
	}
}
// counts the neighbor of the cell and applies Game of Life rules
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function update(x,y,board) {
	var ans = 0;
	if (board[x][y].fill == true) {
		if (countNeighbors(x,y,board)<2) {
			ans = 1; //fill white
		}
		else if (countNeighbors(x,y,board)>3) {
			ans = 1;
		}
	}
	else{
		if (countNeighbors(x,y,board)==3){
			ans = 2; //fill black
		}
	}
	return ans;
}

function setWhite(x,y,context,pad) {
	board[x][y].fill = false;
	context.fillStyle="#FFFFFF";
	context.fillRect(x,y*10,10,10);
	pad.draw_rectangle(Coord(x,y*10),10,10,0.5,Color(0,0,0));
}

function setBlack(x,y,context,pad) {
	board[x][y].fill = true;
	context.fillStyle="#000000";
	context.fillRect(x,y*10,10,10);
}

// counts the number of filled squares adjacent to the current square
function countNeighbors(x,y,board) {
	var count = [];
	x = parseInt(x);
	y = parseInt(y);
	if (x==0 && y==0) {
		count.push(checkBottom(x,y,board),checkBottomRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x==590 && y==0) {
		count.push(checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board));
	}
	else if (x==0 && y==49) {
		count.push(checkTop(x,y,board),checkTopRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x==590 && y==49) {
		count.push(checkMidLeft(x,y,board),checkTopLeft(x,y,board),checkTop(x,y,board));
	}
	else if (x==0) {
		count.push(checkTop(x,y,board),checkTopRight(x,y,board),checkMidRight(x,y,board),checkBottom(x,y,board),checkBottomRight(x,y,board));
	}
	else if (y==0) {
		count.push(checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board),checkBottomRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x==590) {
		count.push(checkTop(x,y,board),checkTopLeft(x,y,board),checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board));
	}
	else if (y==49) {
		count.push(checkMidLeft(x,y,board),checkTopLeft(x,y,board),checkTop(x,y,board),checkTopRight(x,y,board),checkMidRight(x,y,board));
	}
	else{
		count.push(checkTopLeft(x,y,board),checkTop(x,y,board),checkTopRight(x,y,board),checkMidLeft(x,y,board),checkMidRight(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board),checkBottomRight(x,y,board));
	}
	return eval(count.join('+'));
}

function checkMidLeft(x,y,board) {
	if (board[x-10][y].fill == true) return 1;
	return 0;
}

function checkTopLeft(x,y,board) {
	if (board[x-10][y-1].fill==true) return 1;	
	else return 0;
}

function checkBottomLeft(x,y,board) {
	if (board[x-10][y+1].fill==true) return 1;
	else return 0;
}

function checkTop(x,y,board) {
	if (board[x][y-1].fill==true) return 1;
	else return 0;
}

function checkBottom(x,y,board) {
	if (board[x][y+1].fill==true) return 1;
	else return 0;
}

function checkMidRight(x,y,board) {
	if (board[x+10][y].fill==true) return 1;
	else return 0;
}

function checkTopRight(x,y,board) {
	if (board[x+10][y-1].fill==true) return 1;
	else return 0;
}

function checkBottomRight(x,y,board) {
	if (board[x+10][y+1].fill==true) return 1;
	else return 0;
}