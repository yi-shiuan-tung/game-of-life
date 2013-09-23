var Display = function(boardObject){
    var self = Object.create(Display.prototype);
    var RADIUS = 10;
    var HEIGHT = 500;
    var WIDTH = 600;
    var boardDOM = $("#board").get(0);
    var display = $('#board').get(0); //DOM element of the board
    var displayList = [];
    
    self.getdisplayList = displayList;
    
    //initializes the div elements in the board
    self.init = function(){
        for (var i=0;i<HEIGHT;i+=10){
            var row = document.createElement("div");
            row.className = 'row';
            var rowlist = [];
            for (var j=0;j<WIDTH;j+=10){
                var square = document.createElement("div");
                square.className = 'square_off';
                row.appendChild(square);
                rowlist.push(square);
            }
            boardDOM.appendChild(row);
            displayList.push(row);
        }
    }
    
    self.changeBlack = function(x,y,size){
        for (var i=-size;i<size;i++){
            for (var j=-size;j<size;j++){
                boardObject.getSquare(x+size,y).fill = true;
                displayList[x/10].children[y/10].className = 'square_on';
            }
        }
    }
    
    self.changeWhite = function(x,y){
        boardObject.getSquare(x,y).fill = false;
        displayList[x/10].children[y/10].className = 'square_off';
    }
    
    //tracks the movement of the mouse and puts it in two hidden divs
    display.addEventListener('mousemove',function(client){
        var x = Math.floor((client.x-30)/10)*10;
        var y = Math.floor((client.y-80)/10)*10;
        if (x==600) x=590;
        if (y==500) y=490;
        $('#xpos').text(y);
        $('#ypos').text(x);
    });
    
    // function that gets the mouse position on the canvas
    var getMousePos = function() {
        return{
            x:$('#xpos').text(),
            y:$('#ypos').text()
        }
    }
    
    var MouseMove = function() {
        var pos = getMousePos();
        var x = parseInt(pos.x);
        var y = parseInt(pos.y);
        boardObject.getSquare(x,y).fill = true;
        self.changeBlack(x,y);
    }
    
    var OnClick = function() {
        var pos = getMousePos();
        var x = parseInt(pos.x);
        var y = parseInt(pos.y);
        boardObject.getSquare(x,y).fill = true;
        self.changeBlack(x,y);
    }
    
    var Erase = function(){
        var pos = getMousePos();
        var x = parseInt(pos.x);
        var y = parseInt(pos.y);
        boardObject.getSquare(x,y).fill = false;
        self.changeWhite(x,y);
    }
    
    var draw = $('#mousemove')[0];
    draw.onclick = function() {
        display.removeEventListener('mousemove',Erase,false);
        display.removeEventListener('mousedown',OnClick,false);
        display.addEventListener('mousemove',MouseMove,false);
    }
    
    var click = $('#onclick')[0];
    click.onclick = function() {
        display.removeEventListener('mousemove',Erase,false);
        display.removeEventListener('mousemove',MouseMove,false);
        display.addEventListener('mousedown',OnClick,false);
    }
    
    var erase = $('#erase')[0];
    erase.onclick = function(){
        display.removeEventListener('mousedown',OnClick,false);
        display.removeEventListener('mousemove',MouseMove,false);
        display.addEventListener('mousemove',Erase,false);
    }
    
    //checks whether the square at x, y is within the parameter of the board
    var inboard = function(x,y){
        return x>=0 && x<HEIGHT && y>=0 && y<WIDTH;
    }
    
    Object.freeze(self);
    return self;
}

Display.prototype = {};