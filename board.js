/**
 * Constructor
 * Square is an immutable object that represents each cell of the Game of Life
 * x is an integer that indicates the row of the board
 * y is an integer that indicates the column of the board
 * fill is a boolean value that indicates whether a cell is filled or not
 * all cells are defaulted to be unfilled; fill=false
 * 
 **/
var Square = function (x,y,fill){
	return {
		x: x,
		y: y,
		fill: fill
	};
}

/**
 * Constructor for a Board object
 *
 **/
var Board = function(){
	var that = Object.create(Board.prototype);
	//board is a list of lists that contain Square objects
	var board = []; 
	var WIDTH = 600;
	var HEIGHT = 500;
	var RADIUS = 10;
	
	that.board = board;
	
	/**
	 *Initialize Square objects in the board
	 **/
	that.init = function(){
		for (var i = 0; i < HEIGHT; i +=RADIUS) {
			board[i] = [];
			for (var j = 0; j < WIDTH; j +=RADIUS) {
				board[i].push(Square(i,j,false));
			}
		}
	};
	
	that.getSquare = function(x,y){
		return board[x][y/10];
	};

	that.updateBoard = function(){
		// iterates through each square and calls the update function
		// change keeps track of squares that will be changed in the next round
		var change = {'white':[],'black':[]};
		for (var i=0;i<HEIGHT;i+=RADIUS) {
			for (var j=0;j<WIDTH;j+=RADIUS) {
				var ans = that.update(i,j);
				if (ans) {
					if (ans==1) change.white.push(Square(i,j,false));
					else change.black.push(Square(i,j,true));
				}
			}
		}
		for (square in change.white) {
			setWhite(change.white[square].x,change.white[square].y);
		}
		for (square in change.black) {
			setBlack(change.black[square].x,change.black[square].y);
		}
		return change;
	};
	
	// counts the neighbor of the cell and applies Game of Life rules
	// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	// Any live cell with two or three live neighbours lives on to the next generation.
	// Any live cell with more than three live neighbours dies, as if by overcrowding.
	// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	that.update = function(x,y) {
		var ans = 0;
		if (that.getSquare(x,y).fill == true) {
			if (that.countNeighbors(x,y)<2) {
				ans = 1; //fill white
			}
			else if (that.countNeighbors(x,y)>3) {
				ans = 1;
			}
		}
		else{
			if (that.countNeighbors(x,y)==3){
				ans = 2; //fill black
			}
		}
		return ans;
	};
	//counts the number of neighboring cells that are filled
	that.countNeighbors = function(x,y){
		var count = 0;
		for (var i=-10;i<=10;i+=10){
			for (var j=-10;j<=10;j+=10){
				if (inboard(x+i,y+j) && !(x+i===x && y+j===y)) {
					//console.log(x+i,y+j);
					if (that.getSquare(x+i,y+j).fill==true) {
						count+=1;
					}
				}
			}
		}
		return count;
	};
	//sets a square to be unfilled, or white
	var setWhite = function(x,y) {
		that.getSquare(x,y).fill = false;
	}
	//sets a square to be filled, or black
	var setBlack = function(x,y) {
		that.getSquare(x,y).fill = true;
	}
	
	//checks whether the square at x, y is within the parameter of the board
	var inboard = function(x,y){
		return x>=0 && x<HEIGHT && y>=0 && y<WIDTH;
	}
	
	Object.freeze(that);
	return that;
}

Board.prototype = {};