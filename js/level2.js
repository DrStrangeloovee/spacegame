/**
 * Created by marco on 11.01.17.
 */

var lines = [];

var stage,
    stageHeight,
    stageWidth,
    playerObject,
    playerObjectX,
    playerObjectY,
    startX,
    startY,
    line,
    obstacleContainer;


function init() {
    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);

    stageHeight = stage.canvas.height;
    stageWidth = stage.canvas.width;

    startX = 0;
    startY = 0;

    playerObject = new createjs.canvas.

    console.log("loaded");
    console.log("starting game...");
    startGame();
}

/**
 * Adds a new line to the planned routes and stores it as array in lines
 */
function addLine(){
    var x = parseInt(document.getElementById("x").value);
    var y = parseInt(document.getElementById("y").value);

    if(x > stageWidth || x < 0 || y > stageHeight || y < 0){
        console.log("out of space, try again");
    }else {
        lines.push([x, y]);
        drawLine();
        console.log(lines);
    }
}

/**
 * Draws the line from the given input
 */
function drawLine() {
    line.graphics.lineTo(lines[lines.length - 1][0], lines[lines.length - 1][1]);
    stage.update();
    console.log("adding further lines, draw");
}

/**
 * Creates the asteroids
 */
function createObstacles(){
    stage.addChild(obstacleContainer);
    for(var i = 0; i < 50; i++){
        var g = new createjs.Graphics().setStrokeStyle(1).beginStroke("#ffffff").beginFill("white").drawCircle(stageWidth-Math.floor(Math.random()*1000), stageHeight-Math.floor(Math.random()*1000), 30);
        var obstacle = new createjs.Shape(g);
        stage.addChild(obstacle);
    }
}

/**
 * Starts the game
 */
function startGame() {
    //lines begin to draw at left upper corner
    line = new createjs.Shape();
    line.graphics.setStrokeStyle(5).beginStroke("#ffffff");
    line.graphics.moveTo(0, 0);
    stage.addChild(line);

    createObstacles();

    stage.update();
}

window.addEventListener("loaded", init, false);