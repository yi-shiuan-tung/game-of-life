/**
 * Constructor for display
 * This deals with displaying the cells and coloring the cells
 * Event listeners are set in this object
 **/
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
    
    self.changeBlack = function(x,y){
        boardObject.getSquare(x,y).fill = true;
        displayList[x/10].children[y/10].className = 'square_on';
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
    //Event Listener function for coloring cells
    var Color = function() {
        var pos = getMousePos();
        var x = parseInt(pos.x);
        var y = parseInt(pos.y);
        self.changeBlack(x,y);
    }
    //Event Listener function for erasing cells
    var Erase = function(){
        var pos = getMousePos();
        var x = parseInt(pos.x);
        var y = parseInt(pos.y);
        boardObject.getSquare(x,y).fill = false;
        self.changeWhite(x,y);
    }
    //On button click, the user can draw the board by mousemove
    var draw = $('#mousemove')[0];
    draw.onclick = function() {
        display.removeEventListener('mousedown',Erase,false);
        display.removeEventListener('mousemove',Erase,false);
        display.removeEventListener('mousedown',Color,false);
        display.addEventListener('mousemove',Color,false);
    }
    //the user draws the board by clicking
    var click = $('#onclick')[0];
    click.onclick = function() {
        display.removeEventListener('mousedown',Erase,false);
        display.removeEventListener('mousemove',Erase,false);
        display.removeEventListener('mousemove',Color,false);
        display.addEventListener('mousedown',Color,false);
    }
    //the user erases board by mousemove
    var hovererase = $('#hovererase')[0];
    hovererase.onclick = function(){
        display.removeEventListener('mousedown',Color,false);
        display.removeEventListener('mousemove',Color,false);
        display.removeEventListener('mousedown',Erase,false);
        display.addEventListener('mousemove',Erase,false);
    }
    //the user erases board by clicking
    var clickerase = $('#clickerase')[0];
    clickerase.onclick= function(){
        display.removeEventListener('mousedown',Color,false);
        display.removeEventListener('mousemove',Color,false);
        display.removeEventListener('mousemove',Erase,false);
        display.addEventListener('mousedown',Erase,false);
    }
    //Event Listener function that sets the color of the preview box
    var ChangePreview = function(){
        var preview = $('#preview')[0];
        var r = $('#r').val();
        var g = $('#g').val();
        var b = $('#b').val();
        preview.style.backgroundColor = "rgb("+r+","+g+","+b+")";
    }
    // Attaches event listeners to the three input boxes
    var r = $('#r')[0];
    var g = $('#g')[0];
    var b = $('#b')[0];
    r.addEventListener('change',ChangePreview,false);
    g.addEventListener('change',ChangePreview,false);
    b.addEventListener('change',ChangePreview,false);
    
    var rgb = $('#submit')[0];
    rgb.onclick = function(){
        var r = $('#r').val();
        var g = $('#g').val();
        var b = $('#b').val();
        var square_on = $('.square_on');
        square_on.style.backgroundColor = "rgb("+r+","+g+","+b+")";
    }
    
    Object.freeze(self);
    return self;
}

Display.prototype = {};
