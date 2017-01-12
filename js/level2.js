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
    obstacleContainer,
    targetX,
    targetY;

var currentTargetNumber = 0;


function init() {

    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.setInterval(30);
    createjs.Ticker.addEventListener("tick", stage);

    stageHeight = stage.canvas.height;
    stageWidth = stage.canvas.width;

    startX = 0;
    startY = 0;

    var g = new createjs.Graphics().setStrokeStyle(1).beginStroke("red").beginFill("red").drawCircle(0, 0, 30);
    playerObject = new createjs.Shape(g);
    stage.addChild(playerObject);

    console.log("loaded");
    console.log("starting game...");
    startGame();
}

/**
 * handles the tick
 */
function tick(event) {
    console.log("tick tock");
}

/**
 * Adds a new line to the planned routes and stores it as array in lines
 */
function addLine(){
    var x = parseInt(document.getElementById("x").value);
    var y = parseInt(document.getElementById("y").value);

    if(x > stageWidth || x < 0 || y > stageHeight || y < 0){
        console.log("out of space, try again");
    }else if(lines.length < 1){
        targetX = x;
        targetY = y;
        lines.push([x, y]);
        drawLine();
        console.log(lines);
    }else{
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
 * after game hast started, the obstacles start to move from right to left
 */
function moveObstacles() {

}

/**
 * Starts the game
 */
function startGame() {
    //lines begin to draw at left upper corner



    var g = new createjs.Graphics().setStrokeStyle(5).beginStroke("#ffffff");
    line = new createjs.Shape(g);
    line.graphics.moveTo(0, 0);
    stage.addChild(line);

    createObstacles();

    stage.update();
}

/**
 * animations starts
 */
function fly() {
    if(lines.length < 0){
        console.log("no routes defined!");
        return false;
    }
    //define the index of the current destination
    console.log("lets fly");
    createjs.Tween.get(playerObject, { loop: false }).to({ x: targetX , y: targetY}, 1000, createjs.Ease.getPowInOut(4)).addEventListener("complete", handleDestination);
}

/**
 * After the tween animation is finished you can do here some stuff, for now it only updates the playerObject coordinates to the new ones
 */
function handleDestination() {
    console.log("tween completed");
    playerObjectX = playerObject.x;
    playerObjectY = playerObject.y;
    targetX = lines[currentTargetNumber][0];
    targetY = lines[currentTargetNumber][1];

    console.log(playerObjectX);
    console.log(playerObjectY);
    stage.update();
    currentTargetNumber += 1;
}

window.addEventListener("loaded", init, false);