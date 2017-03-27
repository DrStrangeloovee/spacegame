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

var startX, startY, nextX, nextY;

//Movement speed of arrow
var SPEED = 50;




function init() {

    stage = new createjs.Stage("stage");
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.addEventListener("tick", stage);


    //start position
    startX = 0;
    startX = 0;






    //set destination coordinates
    // nextX = 0;
    // nextY = 0;
    // line = new createjs.Shape();
    // stage.addChild(line);
    // line.graphics.moveTo(curX, curY);
    // line.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,0,1)");
    // var line = new createjs.Shape();
    // line.graphics.setStrokeStyle(3);
    // line.graphics.beginStroke("rgba(0,0,0,1)");
    // line.graphics.moveTo(startX, startY);
    // startY++;
    // line.graphics.lineTo(startX, startY);
    // line.graphics.endStroke();
    //keyboard handlers
    // this.document.onkeydown = keyPressed;

    stage.addEventListener("click", mouseOver());
}

function mouseOver() {
    console.log("click  ");
}

/**
 * Handles the keypresses
 * @param event
 */
function keyPressed(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
            line.graphics.lineTo(curX - SPEED, curY);
            curX -= SPEED;
            console.log("left");
            break;
        case KEYCODE_RIGHT:
            line.graphics.lineTo(curX + SPEED, curY);
            curX += SPEED;
            console.log("right");
            break;
        case KEYCODE_UP:
            line.graphics.lineTo(curX, curY - SPEED);
            curY -= SPEED;
            console.log("up");
            break;
        case KEYCODE_DOWN:
            line.graphics.lineTo(curX, curY + SPEED);
            curY += SPEED;
            console.log("down");
            break;
    }
    updateStage();
}


/**
 * Do something when tick event is fired
 * @param event
 */
function tick(event) {

    stage.on("mouseover", function () {
            console.log("over");
    });
    stage.update();
}


/**
 *
 */

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




//Snake game
// (function(){
//
//     var myCanvas = document.getElementById("myCanvas"),
//         stage = new createjs.Stage("myCanvas"),
//         //start line
//         startPoint = {x:myCanvas.width/2, y:myCanvas.height/2},
//         //end line
//         endPoint = {x:myCanvas.width/2 + 250, y:myCanvas.height/2},
//
// //dots
//         spaceBetween = 20,
//         radius = 4,
//         increment = 0,
//         line = new createjs.Shape();
//
//     stage.addChild(line);
//
//     function drawCanvas(stage) {
//         line.graphics.clear();
//         line.x = startPoint.x;
//         line.y = startPoint.y;
//
//         /* Different approach for rotation in CreateJS. Shape objects have a rotation property,
//          * which is measured in degrees. We don't translate positions or save/restore the context
//          * stack. We just let CreateJS do it for us. We'll make a horizontal line with all of the
//          * dots on it, and then we'll rotate that line.
//          */
//         var dy = endPoint.y - startPoint.y,
//             dx = endPoint.x - startPoint.x,
//             lineAngle = Math.atan2(dy, dx) * (180/Math.PI), // Converting from radians.
//             distance = getDistance(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
//         numDots = Math.floor(distance/spaceBetween),
//             partialDistance = distance / numDots;
//         line.x2 = startPoint.x + distance;
//
//
//         line.graphics
//             .setStrokeStyle(4,"round")
//             .beginStroke("rgba(255,255,255,1)")
//             .moveTo(0,0)
//             .lineTo(distance,0)
//             .endStroke();
//
//
//         var midPoint = {}; // Cleared on each loop
//         for (var i = 0; i < numDots; i++) {
//             midPoint.x = increment + partialDistance*i;
//             midPoint.y = 0;
//
//             line.graphics
//                 .setStrokeStyle(4,"round")
//                 .beginFill("rgba(255,255,255,1)")
//                 .moveTo(midPoint.x, midPoint.y)
//                 .arc(midPoint.x, midPoint.y, radius, 0, Math.PI * 2, true)
//                 .endFill();
//
//             increment = ( increment < partialDistance ) ? increment+.025 : 1;
//         }
//
//
//         //line.rotation = lineAngle; // Set the line at the correct angle between points.
//         line.rotation +=.3 // Forget the correct angle and just rotate.
//
//         line.rotation = ( line.rotation > 360 ) ? line.rotation - 360 : line.rotation;
//         stage.update();
//     }
//
//
//
//
//     function getDistance(x1, y1, x2, y2) {
//         return ( Math.sqrt( Math.pow( (x2 - x1) ,2) + Math.pow( (y2 - y1) ,2) ) );
//
//     }
//
//     // Animation Loop
//     window.requestAnimFrame = (function(){
//         return	window.requestAnimationFrame		||
//             window.webkitRequestAnimationFrame	||
//             window.mozRequestAnimationFrame		||
//             window.oRequestAnimationFrame		||
//             window.msRequestAnimationFrame		||
//             function( callback ){
//                 window.setTimeout(callback, 1000 / 60);
//             };
//     })();
//
//     (function animloop(){
//         requestAnimFrame(animloop);
//         drawCanvas(stage);
//     })();
//
//
// }());

