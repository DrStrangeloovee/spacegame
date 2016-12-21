/**
 * Created by marco on 24.11.16.
 */

/** Init the Stage and variables */

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
    obstacles,
    movementArrow,
    bitmap;

var KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40;

//if mouse is over a navi dot
var mouseOver = false;

var mouseX, mouseY;

function init() {

    stage = new createjs.Stage(document.getElementById("stage"));
    stage.enableMouseOver(30);
    stage.enableDOMEvents(true);
    stageX = stage.x;
    stageY = stage.y;
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    gridContainer = new createjs.Container();

    movementArrow = new createjs.Shape();
    stage.addChild(movementArrow);
    stage.addChild(gridContainer);

    stage.addEventListener("stagemousemove", mouseMove);
    stage.addEventListener("stagemousedown", mouseDown);
    stage.addEventListener("stagemouseup", mouseUp);
    //movementArrow.graphics.moveTo(startX, startY);


    var image = new Image();
    image.src = "img/spaceship.png";
    image.onload = createObstacles;

        // this.document.onkeydown = keyPressed;

    //Drawing the stage and other background tasks
    createGrid();
    //createPlayerObject();
    createObstacles();
    //drawMovement();
    start();

    console.log("init");



}

function mouseMove() {
    console.log(stage.mouseX + " " + stage.mouseY)
}
function mouseDown() {
    console.log(mouseX + " " + mouseY);
}
function mouseUp() {
    console.log(mouseX + " " + mouseY);
}

/**
 Starts the game and redraws a clean new stage with default values
*/
function start() {
    console.log("start");
    stage.update();
}

/**
 * Draws the playerobject
 */
function createPlayerObject() {


}

/**
 * Draws obstacles
 */
function createObstacles(event) {
    obstacles = [];
    var image = event.target;
    var container = new createjs.Container();
    stage.addChild(container);

    for (var i=0; i<10; i++){
        bitmap = new Bitmap(image);
        container.addChild(bitmap);
        bitmap.name="obst_"+i;
        resetEnemy(bitmap);
        bitmap.regX = bitmap.image.width/2|0;
        bitmap.regY = bitmap.image.height/2|0;
        obstacles.push(bitmap);
    }

    stage.addChild(container);
}

function resetEnemy(ship){
    ship.x = canvas.width + Math.random()*500;
    ship.y = canvas.height * Math.random()|0;
    ship.speed = (Math.random()*8)+6;
}


/**
* Draws the grid of dots, used for navigating the stage with the playerObject
* The grid is placed in a separate container for
*/
function createGrid() {
    var indicator = new createjs.Shape();
    gridPositions = [];
    indicator.graphics.drawCircle(0, 0, 5).beginFill("white");

    for (var i = 0; i < stageWidth + 1; i += 100) {
        for (var j = 0; j < stageHeight + 1; j += 100) {
            indicator.graphics.drawCircle(i, j, 5).beginFill("white");
            gridContainer.addChild(indicator);
            indicator.addEventListener("click", navigationClick);
            indicator.addEventListener("mouseover", navigationOver);
            indicator.name = i + ":" + j;
            gridPositions.push(indicator);

            //console.log(gridPositions[j]);
        }
    }
    stage.addChild(gridContainer);

    /*TODO
     * May be useful if performance is important, still dont know if it works tho
     * gridContainer.cache(stageX, stageY, stageWidth, stageHeight);
     */
}

function navigationClick(event) {
    console.log(event.type);
    console.log(mouseX + " " + mouseY);
    // movementArrow.graphics.lineTo(startX, startY);

}

function navigationOver(event) {
    mouseOver = true;
    mouseX = stage.mouseX;
    mouseY = stage.mouseY;
    console.log(event.target.x);
    console.log(gridContainer.getObjectsUnderPoint());
    console.log(mouseX + " " + mouseY);
    // movementArrow.graphics.lineTo(startX, startY);

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

/**
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


/**
* Moves the x position of playerObject
*/
function moveX(x) {
    if((playerObjectX + x) > stage.canvas.width || (playerObjectX + x) < 0){
        console.log("error out of stage");
        return playerObjectX;
    }
    return playerObjectX + x;
}

/**
* Moves the y position of playerObject
*/
function moveY(y) {
    if((playerObjectY + y) > stage.canvas.height || (playerObjectY + y) < 0){
        console.log("error out of stage");
        return playerObjectY;
    }
    return playerObjectY + y;
}


/**
* Draws the movement arrow for y
*/
function drawArrow() {
    movementArrowY.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)");
    movementArrowY.graphics.moveTo(playerObjectX, playerObjectY);
}

/**
Redraws the stage with the changes
*/
function handleTick(event) {
    //console.log("update");

    stage.update();
}

window.addEventListener("load", init, false);