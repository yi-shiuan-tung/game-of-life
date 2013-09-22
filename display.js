var Display = function(){
    var self = Object.create(Display.prototype);
    var RADIUS = 10;
    var HEIGHT = 500;
    var WIDTH = 600;
    var board = $("#board").get(0);
    
    //initializes the div elements in the board
    self.init = function(){
        for (var i=0;i<HEIGHT;i+=10){
            var row = document.createElement("div");
            row.className = 'row';
            for (var j=0;j<WIDTH;j+=10){
                var square = document.createElement("div");
                square.className = 'square_off';
                row.appendChild(square);
            }
            board.appendChild(row);
        }
    }
    
    // function that gets the mouse position on the canvas
    var getMousePos = function() {
        return{
                x:$('#xpos')[0].innerHTML,
                y:$('#ypos')[0].innerHTML
        }
    }
    
    var MouseMove = function() {
        var position = getMousePos();
        console.log(x,y);
        board.getSquare(x,y).fill = true;
        
    }
    
    var OnClick = function() {
        var position = getMousePos();
        board.getSquare(x,y).fill = true;
    }
    
    var draw = $('#mousemove')[0];
    draw.onclick = function() {
            display.removeEventListener('click',OnClick,false);
            display.addEventListener('mousemove',MouseMove,false);
    }
    
    var click = $('#onclick')[0];
    click.onclick = function() {
            display.removeEventListener('mousemove',MouseMove,false);
            display.addEventListener('click',OnClick,false);
    }
}

Display.prototype = {};