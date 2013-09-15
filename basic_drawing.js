(function () {
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);
	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	// create the drawing pad object and associate with the canvas
	pad = Pad(canvas);
	pad.clear();
  
	// draw a box
	pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 1, black);
	
	// draw the rows and columns
	var RADIUS = 10;
	var LINE_WIDTH = 0.5;
	for (var i = 0; i < pad.get_width(); i +=RADIUS) {
		for (var j = 0; j < pad.get_height(); j +=RADIUS) {
			pad.draw_rectangle(Coord(i,j),RADIUS,RADIUS,LINE_WIDTH,black);
		}
	}
	init();
}) ()
