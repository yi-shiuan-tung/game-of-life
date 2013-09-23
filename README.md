Project 1
=====

HOW TO USE

To set initial conditions, you can click on the squares to color them. You have the options to hover or click to draw in the squares. If you made an error, you can erase by clicking on corresponding buttons.
Click on start to start the game. You can also step through the game and stop the game.
Enjoy!

BASIC STRUCTURE

The code for the representation of the board board is in board.js. 

The board is a list of lists where the outer list includes the rounded indices of the x axis and the inner list is a list of Square objects accessible by the indexes of y.

X ranges from 0 to 490 (height of board) while Y ranges from 0 to 59 (width of board divided by 10).

For example, to get the square on the top right corner, you would call board[0][59], which would return a Square object. 

Each grid on the board is an instance of Square where its arguments are x, y and fill (a boolean indicating whether a square is black or white). 

The drawing of the board is in display.js.

The board is initialized by creating a row div element and appending individual square div elements to it. The board then appends enough row div elements  to fill up. Each individual square div elements can be accessed by the list displayList. By changing the className of the div elements, I can set it to be alive(black) or dead(white). 



