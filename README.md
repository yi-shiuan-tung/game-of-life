Project 1
=====

HOW TO USE
To set initial conditions, you can click on the squares to color them. You can also change the setting to mouseover, which allows you to darken the squares by hovering your mouse over the squares.
Click on start to start the game. You can also step through the game.
Enjoy!

BASIC STRUCTURE

The board is an object where the keys are the rounded indices of the x axis and the value is a list of Square objects accessible by the indexes of y.
X ranges from 0 to 590 while y ranges from 0 to 49. 
For example, to get the square on the top right corner, you would call board[590][0], which would return a Square object. 
Each square is an instance of Square where its arguments are x, y and fill (a boolean indicating whether a square is black or white). 
The code works by checking the neighboring cells of each square and applying the rules of the game of life.

TESTING STRATEGY
1. getMousePos function returns the x and y position on the canvas. Tested this function by printing values onto the console and checking each edge and random values.
2. By filling certain number of square initially, I called each of the checkTop, checkTopLeft... functions to see if they are returning the correct values. Checked border cases. An error is reached when a square does not exist.
3. The function countNeighbors check the number of filled squares in its neighbor. Used similar technique as above. Checked border cases and made sure no error is reached.
4. setWhite and setBlack functions are easy to test. Simply put in a coordinate and see if that corresponding coordinate changes to black or white.
5. The whole updateBoard process is more difficult to check. I opened up the sample implementation of game of life and created multiple simple shapes. I created the same ones on my board and stepped through the changes to observe if I get the same shape at the same steps. 

