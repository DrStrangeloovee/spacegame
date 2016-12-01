/**
 * Created by marco on 24.11.16.
 */

// Init the Stage and variables

var stage,
    stageX,
    stageY,
    stageHeight,
    stageWidth,
    playerObject,
    playerObjectX,
    playerObjectY,
    gridContainer,
    gridPositions,
    movementArrowX,
    movementArrowY;

var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;



function init() {
    stage = new createjs.Stage("stage");
    stageX = stage.x;
    stageY = stage.y;
    //stageWidth = stage.canvas.width;
    //stageHeight = stage.canvas.height;
    gridPositions = [];
    gridContainer = new createjs.Container();
    movementArrowX = new createjs.Shape();
    movementArrowY = new createjs.Shape();

    createjs.Ticker.setFPS(1);
    createjs.Ticker.addEventListener("tick", updateStage, false);

    this.document.onkeydown = keyPressed;

    //createPlayerObject();
    //Drawing the stage and other background tasks
    //createGrid();
    //createObstacles();
    //drawMovement();
    start();
    drawLine();
    drawArrow();


    console.log("init");
}

/*
* Starts the game and redraws a clean new stage with default values
*/
function start() {
    console.log("start");
    updateStage();
}

/*
* Draws the moveable playerObject
*/
function createPlayerObject() {
    playerObjectX = 0;
    playerObjectY = 0;
    playerObject = new createjs.Shape();
    playerObject.graphics.beginFill("red").drawCircle(playerObjectX, playerObjectY, 25);
    stage.addChild(playerObject);
}

/*
* Draws the grid of dots, used for navigating the stage with the playerObject
* The grid is placed in a separate container for
*/
function createGrid() {
    var indicator = new createjs.Shape();
    indicator.graphics.drawCircle(0, 0, 5).beginFill("white");

    for (var i = 0; i < stageWidth + 1; i += 100) {
        for (var j = 0; j < stageHeight + 1; j += 100) {
            indicator.graphics.drawCircle(i, j, 5).beginFill("white");
            gridContainer.addChild(indicator);

            gridPositions.push([i , j]);

            //console.log(gridPositions[j]);
        }
    }
    stage.addChild(gridContainer);

    /*TODO
     * May be useful if performance is important, still dont know if it works tho
     * gridContainer.cache(stageX, stageY, stageWidth, stageHeight);
     */
}

//TODO
/*function createObstacles() {
    //not that hardcoded as of before, need to define a pattern where the obstacles may be placed
    for (var i = 0; i < 10; i++) {
        var temp = new createjs.Shape();
        temp.graphics.beginFill("blue").drawCircle(20 + i * 5, 40 + i * 5, 25);
        obstacles.push(temp);
        //stage.addChild(obstacles[i]);
        console.log(obstacles[i]);
        //maybe useful in the future for random placing of obstacles
        // playerObject.x = Math.floor(Math.random()*(stage.canvas.width-200+200)+20);
        // playerObject.y = Math.floor(Math.random()*(stage.canvas.height-200+200)+20);

    }
}*/

/*
* Handles the keypresses
*/
function keyPressed(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
            playerObjectX = moveX(-1);
            console.log("left");
            break;
        case KEYCODE_RIGHT:
            playerObjectX = moveX(1);
            console.log("right");
            break;
        case KEYCODE_UP:
            playerObjectY = moveY(-1);
            console.log("up");
            break;
        case KEYCODE_DOWN:
            playerObjectY = moveY(1);
            console.log("down");
            break;
    }
    updateStage();
}

/*
* Moves the x position of playerObject
*/
function moveX(x) {
    if((playerObjectX + x) > stage.canvas.width || (playerObjectX + x) < 0){
        console.log("error out of stage");
        return playerObjectX;
    }
    return playerObjectX + x;
}

/*
* Moves the y position of playerObject
*/
function moveY(y) {
    if((playerObjectY + y) > stage.canvas.height || (playerObjectY + y) < 0){
        console.log("error out of stage");
        return playerObjectY;
    }
    return playerObjectY + y;
}

function drawArrow() {
    console.log("draw arrow");
    var arrow = new createjs.Shape();
    arrow.graphics.moveTo(playerObjectX, playerObjectY).setStrokeStyle(3).beginStroke("#000000").lineTo(300,60);
    stage.addChild(arrow);
    updateStage();
}

function drawLine(){
    var myGraphics = new createjs.Graphics();
    myGraphics.beginStroke("#ffffff").setStrokeStyle(4);
    myGraphics.moveTo(100,300);
    myGraphics.lineTo(300,300);
    var shape3 = new createjs.Shape(myGraphics);
    stage.addChild(shape3);
}


stage.mouseMoveOutside = true;
stage.on("stagemousemove", function(evt) {
    console.log("stageX/Y: "+evt.stageX+","+evt.stageY); // always in bounds
    console.log("rawX/Y: "+evt.rawX+","+evt.rawY); // could be < 0, or > width/height
});

/*
Redraws the stage with the changes
*/
function updateStage() {
    //console.log("update");
    stage.update();
}

window.addEventListener("load", init, false);