// a very simple graphics library using HTML5 canvas features

// constructor for 2D coordinate
var Coord = function (x, y) {
	return {'x':x,'y':y};
	};

// constructor for color
var Color = function (red, green, blue) {
	return {red: red, green: green, blue: blue};
	};

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
	canvas.addEventListener('mousemove',function(evt){
		var position = getMousePos(canvas,evt);
		var x = Math.floor(position.x/10)*10;
		var y = Math.floor(position.y/10)*10;
		context.fillStyle = "#000000";
		context.fillRect(x,y,10,10);
		board[x][y/10].fill = true;
	});
}
// function called by the start button
var begin;
var start = function(){
	begin = window.setInterval(function(){
		updateBoard(board);
	},500);
}
var stop = function(){
	begin = window.clearInterval(begin);
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
	for (row in board) {
		for (var i=0;i<50;i++) {
			update(row,i,board);
		}
	}
}
// counts the neighbor of the cell and applies Game of Life rules
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
function update(x,y,board) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var pad = Pad(canvas);
	if (board[x][y].fill == true) {
		if (countNeighbors(x,y,board)<2) {
			board[x][y].fill = false;
			context.fillStyle="#FFFFFF";
			context.fillRect(x,y*10,10,10);
			pad.draw_rectangle(Coord(x,y*10),10,10,0.5,Color(0,0,0));
		}
		else if (countNeighbors(x,y,board)>3) {
			board[x][y].fill = false;
			context.fillStyle="#FFFFFF";
			context.fillRect(x,y*10,10,10);
			pad.draw_rectangle(Coord(x,y*10),10,10,0.5,Color(0,0,0));
		}
	}
	else{
		if (countNeighbors(x,y,board)==3){
			board[x][y].fill = true;
			context.fillStyle="#000000";
			context.fillRect(x,y*10,10,10);
		}
	}
}
// counts the number of filled squares adjacent to the current square
function countNeighbors(x,y,board) {
	var count = [];
	x = parseInt(x);
	y = parseInt(y);
	if (x<=10 && y<=1) {
		count.push(checkBottom(x,y,board),checkBottomRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x>=590 && y<=1) {
		count.push(checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board));
	}
	else if (x<=10 && y>=49) {
		count.push(checkTop(x,y,board),checkTopRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x>=590 && y>=49) {
		count.push(checkMidLeft(x,y,board),checkTopLeft(x,y,board),checkTop(x,y,board));
	}
	else if (x<=10) {
		count.push(checkTop(x,y,board),checkTopRight(x,y,board),checkMidRight(x,y,board),checkBottom(x,y,board),checkBottomRight(x,y,board));
	}
	else if (y<=1) {
		count.push(checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board),checkBottomRight(x,y,board),checkMidRight(x,y,board));
	}
	else if (x>=590) {
		count.push(checkTop(x,y,board),checkTopLeft(x,y,board),checkMidLeft(x,y,board),checkBottomLeft(x,y,board),checkBottom(x,y,board));
	}
	else if (y>=49) {
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


// an abstraction for drawing in a canvas
var Pad = function (canvas) {
	var DEFAULT_CIRCLE_RADIUS = 5;
	var DEFAULT_LINE_WIDTH = 1;

	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;
	

	// sets the line width for subsequent drawing
	var apply_line_width = function (ctx, line_width) {
		ctx.lineWidth = (line_width) ? line_width : DEFAULT_LINE_WIDTH;
		}

	// sets the color for subsequent drawing and a default stroke width
	var apply_color = function (ctx, color) {
		if (color) {
			ctx.strokeStyle = 'rgba(' + color.red + ',' + color.green + ',' + color.blue + ', 1)';
			}
		}

	// sets the fill color for subsequent drawing
	var apply_fill_color = function (ctx, color) {
		if (color) {
			ctx.fillStyle = 'rgba(' + color.red + ',' + color.green + ',' + color.blue + ', 1)';
			ctx.fill();
			}
		}

	// return the abstract object from the constructor

	return {
		// Draws a circle at the given coordinate (as returned by the
		// Coord function) of the given radius (defaulting to
		// DEFAULT_CIRCLE_RADIUS if the radius is 0 or omitted). An
		// optional line width can be supplied (defaults to
		// DEFAULT_LINE_WIDTH otherwise), as well as an optional color
		// and fill color (both objects returned by the Color
		// function).
		draw_circle: function(coord, radius, line_width, color, fill_color) {
			context.beginPath();
			context.arc(coord.x, coord.y, (radius) ? radius : DEFAULT_CIRCLE_RADIUS, 0, Math.PI * 2, true);
			context.closePath();
			apply_line_width(context, line_width);
			apply_color(context, color);
			apply_fill_color(context, fill_color);
			context.stroke();
			},

		// Draws a line between the given coordinates (as returned by
		// the Coord function). An optional line width can be supplied
		// (defaults to DEFAULT_LINE_WIDTH otherwise), as well as an
		// optional color (returned by the Color function).
		draw_line: function(from, to, line_width, color) {
			context.beginPath();
			context.moveTo(from.x, from.y);
			context.lineTo(to.x, to.y);
			apply_line_width(context, line_width);
			apply_color(context, color);
			context.lineWidth = (line_width) ? line_width : DEFAULT_LINE_WIDTH;
			context.closePath();
			context.stroke();
			},

		// Draws a rectangle starting at the top left corner (as
		// returned by the Coord function) of the given width and
		// height. An optional line width can be supplied (defaults to
		// DEFAULT_LINE_WIDTH otherwise), as well as an optional color
		// and fill color (both returned by the Color function).
		draw_rectangle: function(top_left, width, height, line_width, color, fill_color) {
			context.beginPath();
			context.rect(top_left.x, top_left.y, width, height);
			apply_line_width(context, line_width);
			apply_color(context, color);
			apply_fill_color(context, fill_color);
			context.closePath();
			context.stroke();
			},

		// Clears the entire board
		clear: function() {
			context.clearRect(0, 0, width, height);
			},

		// return width and height of the drawing area
		get_width: function() {
			return width;
			},
		get_height: function() {
			return height;
			},
	}
}