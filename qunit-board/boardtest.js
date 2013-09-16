test("testing board",function(){
    //init assigns square objects to the board object
    init();
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var pad = Pad(canvas);
    //set four squares to be black
    setBlack(10,1,context,pad);
    setBlack(10,2,context,pad);
    setBlack(20,1,context,pad);
    setBlack(20,2,context,pad);
    //Check whether the fill argument is changed
    equal(board[10][1].fill,true);
    equal(board[10][2].fill,true);
    setWhite(10,2,context,pad);
    equal(board[10][2].fill,false);
    //Check whether countNeighbors work
    equal(countNeighbors(0,0,board),1);
    equal(countNeighbors(10,2,board),3);
    setBlack(0,1,context,pad);
    setBlack(0,2,context,pad);
    setBlack(0,3,context,pad);
    equal(countNeighbors(10,2,board),6);
    //check border cases
    equal(countNeighbors(0,2,board),3);
    setBlack(590,0,context,pad);
    equal(countNeighbors(590,1,board),1);
    setBlack(590,49,context,pad);
    equal(countNeighbors(590,48,board),1);
    
});