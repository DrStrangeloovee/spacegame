/**
 * Created by marco on 20.12.2016.
 */

var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

var RECT_SIZE = 100;

var SPEED = 5;

var stage, line;

var curX, curY, nextX, nextY;

//Movement speed of arrow
var movement = 100;

var leftArrow, rightArrow, upArrow, downArrow = false;

function init()
{
    //setup createjs
    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    curX = 50;
    curY = 50;
    //add rectangle to stage
/*
    moveRectangle = new createjs.Shape();
    moveRectangle.graphics.beginFill("#000000");
    moveRectangle.graphics.drawRect(0,0,RECT_SIZE ,RECT_SIZE );
    moveRectangle.graphics.endFill();
    moveRectangle.x = stage.canvas.width/2 - RECT_SIZE/2;
    moveRectangle.y = stage.canvas.height/2 - RECT_SIZE/2;
    stage.addChild(moveRectangle);
*/


    // Set the 'brush stroke' style (basically the thickness of the line)
    // Then start drawing a black line
    line = new createjs.Shape();
    stage.addChild(line);
    line.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,0,1)");

// Tell EaselJS where to go to start drawing the line
    line.graphics.moveTo(curX, curY);

// Tell EaselJS where to draw the line to
    line.graphics.lineTo(280, 305);




    //keyboard handlers
    window.onkeyup = keyUpHandler;
    window.onkeydown = keyDownHandler;
}


function keyDownHandler(e)
{
    switch(e.keyCode)
    {
        case KEYCODE_LEFT:  leftArrow = true; break;
        case KEYCODE_RIGHT: rightArrow = true; break;
        case KEYCODE_UP:    upArrow = true; break;
        case KEYCODE_DOWN:  downArrow = true; break;
    }
}

function keyUpHandler(e)
{
    switch(e.keyCode)
    {
        case KEYCODE_LEFT:  leftArrow = false; break;
        case KEYCODE_RIGHT: rightArrow = false; break;
        case KEYCODE_UP:    upArrow = false; break;
        case KEYCODE_DOWN:  downArrow = false; break;
    }
}


function move()
{
    if(leftArrow){
        line.graphics.lineTo(curX - movement, curY);
        curX -= movement;
        //line.endStroke();
    }
    if(rightArrow){
        line.graphics.lineTo(curX + movement, curY);
        curX += movement;
        //line.endStroke();
    }
    if(upArrow){
        line.graphics.lineTo(curX, curY - movement);
        curY -= movement;
        //line.endStroke();
    }
    if(downArrow){
        line.graphics.lineTo(curX, curY + movement);
        curY += movement;
        //line.endStroke();
    }
}


function tick(e)
{
    move();
    stage.update();
}

function plan() {
    //remove previous line
    stage.removeChild(line);

    nextX = document.getElementById("x").value;
    nextY = document.getElementById("y").value;



}



/*
function init() {
    // Create a stage from the canvas tag below
    var stage = new createjs.Stage("stage");

    /!*
     * Create a crazy line that goes to multiple points
     *!/

    // Get a new 'shape' which comes with a 'graphics' property that allows us to draw
    var line = new createjs.Shape();

    // Add this line shape to the canvas
    stage.addChild(line);



    // Draw another line to a new point
    //line.graphics.lineTo(180, 96);

    // Do that again for good measure (and to get a crazy looking thing on screen
    //line.graphics.lineTo(96, 180);

    // Stop drawing this line
    //line.graphics.endStroke();

    /!*
     * Create a simple line that goes between 2 points
     *!/

    // Get another 'line shape' object (really just a shape we'll use to draw a line
    var line2 = new createjs.Shape();

    // Add the line shape to the canvas
    stage.addChild(line2);

    // Tell EaselJs that we want a thin like (1px) with a black color
    line2.graphics.setStrokeStyle(1).beginStroke("#000000");

    // Point EaselJS to the place where we want to start drawing
    line2.graphics.moveTo(70,10);

    // Tell EaselJS to draw a line to a different point
    line2.graphics.lineTo(10,50);

    // Stop drawing this line
    line2.graphics.endStroke();

    //
    // Update the canvas to reflect the changes
    //      Note:: This is very important: without the '.update()' call you will only see white
    //
    stage.update();
}
*/

