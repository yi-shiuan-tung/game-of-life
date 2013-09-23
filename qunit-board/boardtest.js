test("testing board",function(){
    var board = Board();
    board.init();
    
    //set four squares to be black
    board.setBlack(10,10);
    board.setBlack(10,20);
    board.setBlack(20,10);
    board.setBlack(20,20);
    //Check whether the fill argument is changed
    equal(board.getSquare(10,10).fill,true);
    equal(board.getSquare(10,20).fill,true);
    board.setWhite(10,20);
    equal(board.getSquare(10,20).fill,false);
    //Check whether countNeighbors work
    equal(board.countNeighbors(0,0),1);
    equal(board.countNeighbors(10,20),3);
    board.setBlack(0,10);
    board.setBlack(0,20);
    board.setBlack(0,30);
    equal(board.countNeighbors(10,20),6);
    //check border cases
    equal(board.countNeighbors(0,20),3);
    board.setBlack(490,0);
    equal(board.countNeighbors(490,10),1);
    board.setBlack(490,490);
    equal(board.countNeighbors(490,480),1);
    
});

test("test update",function(){
    var board = Board();
    board.init();
    /**                 * *      gives you   * *       after one step
     *                    *                  * *     
     **/
    board.setBlack(100,100);
    board.setBlack(100,110);
    board.setBlack(110,110);
    
    board.updateBoard();
    equal(board.getSquare(110,100).fill,true);
    equal(board.getSquare(100,100).fill,true);
    equal(board.getSquare(100,110).fill,true);
    equal(board.getSquare(110,110).fill,true);
    
});