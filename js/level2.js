/**
 * Created by marco on 11.01.17.
 */

var lines = [];

var stage,
    stageHeight,
    stageWidth,
    playerObject,
    startX,
    startY,
    line,
    targetX,
    targetY;


//line which is drawn when ship is moved
var movementLine;

var obstacles = [];

//amount of obstacles to be created
var amountObstacles = 20;

//playerState
var alive = true;

var currentTargetNumber = 0;

var movementContainer = new createjs.Container();


function init() {

    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.setInterval(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick);
    stage.enableMouseOver(60);

    stageHeight = stage.canvas.height;
    stageWidth = stage.canvas.width;

    startX = 0;
    startY = 0;

    console.log("loaded");
    console.log("starting game...");
    startGame();
}

function createPlayerObject() {
    playerObject = new createjs.Shape();
    playerObject.graphics.setStrokeStyle(1).beginStroke("red").beginFill("red").drawCircle(0, 0, 15);
    playerObject.x = 0;
    playerObject.y = 0;
    stage.addChild(playerObject);
}

/**
 * handles the tick
 */
function tick(e) {
    var movementLine = null;
    playerObject.on("pressmove", function(e) {

        // Create a new arrow on stage press
        //current = new createjs.Shape().set({x:stage.mouseX, y:stage.mouseY});
        movementLine = new createjs.Shape();
        movementLine.graphics.setStrokeStyle(5).beginStroke("#ffffff");
        movementLine.graphics.moveTo(playerObject.x, playerObject.y);
        //this shit helps a lot
        stage.addChild(movementLine);

        // Update the current arrow on move
        var moveListener = stage.on("stagemousemove", function(e) {

            // Determine the length between the start and end point using pythagoras
            var w = stage.mouseX - movementLine.x;
            var h = stage.mouseY - movementLine.y;

            movementLine.graphics.clear();
            movementLine.graphics.setStrokeStyle(5).beginStroke("#ffffff");
            movementLine.graphics.moveTo(playerObject.x,playerObject.y);
            movementLine.graphics.lineTo(stage.mouseX, stage.mouseY);
            //var l = Math.sqrt(w*w+h*h);

            // Draw the arrow.
            // Math.sqrt on the amplitude and frequency make it scale as it gets larger
            //drawArrow(current, l, Math.sqrt(l), Math.sqrt(l));

            // Rotate to touch the mouse
            movementLine.graphics.rotation = Math.atan2(h,w) * 180/Math.PI;
            stage.update();
        });

        // Stop the drag
        var upListener = stage.on("stagemouseup", function() {
            stage.off("stagemousemove", moveListener);
            stage.off("stagemouseup", upListener);
            movementLine = null;
        });
    });
}

/**
 * Ends the somehow
 * @returns {boolean}
 */
function endGame() {
    console.log("dead");
    return false;
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
 * Creates the asteroids
 */
function createObstacles(){
    for(var i = 0; i < amountObstacles; i++){
        var obstacle = new createjs.Shape();
        obstacle.graphics.setStrokeStyle(1).beginStroke("#ffffff").beginFill("white").drawCircle(2,2,25);
        obstacle.x = stageWidth-Math.floor(Math.random()*1000);
        obstacle.y = stageHeight-Math.floor(Math.random()*1000);
        //g.setBounds();
        obstacle.name = "obst_" + i;
        obstacles.push(obstacle);
        stage.addChild(obstacle);
        //console.log(stage.getChildAt(i));
    }
}

/**
 * after game hast started, the obstacles start to move from right to left
 */
function moveObstacles() {
    //console.log("in move");
    for(var i in obstacles){
        //console.log(obstacles[i].name + " moves from x: " + obstacles[i].x + " y: " + obstacles[i].y);
        createjs.Tween.get(obstacles[i], { loop: false}).to({ x: 0, y: obstacles[i].y}, 20000).addEventListener("complete");
        stage.update();
    }
}

/**
 * Starts the game
 */
function startGame() {
    //lines begin to draw at left upper corner

    //old stuff
    /*
    var g = new createjs.Graphics().setStrokeStyle(5).beginStroke("#ffffff");
    line = new createjs.Shape(g);
    line.graphics.moveTo(0, 0);
    stage.addChild(line);
*/
    createPlayerObject();
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



    //old stuff
/*    console.log("tween completed");
    playerObjectX = playerObject.x;
    playerObjectY = playerObject.y;
    targetX = lines[currentTargetNumber][0];
    targetY = lines[currentTargetNumber][1];

    console.log(playerObjectX);
    console.log(playerObjectY);
    stage.update();
    currentTargetNumber += 1;*/
}



window.addEventListener("loaded", init, false);