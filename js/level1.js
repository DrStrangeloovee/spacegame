/**
 * Created by marco on 24.11.16.
 */

/** Init the Stage and variables */

var stage, stageX, stageY, stageHeight, stageWidth, playerObject, gridContainer;

function init(){

    stage = new createjs.Stage(document.getElementById("stage"));
    stageX = stage.x;
    stageY = stage.y;
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;

    createjs.Ticker.setFPS(1);
    createjs.Ticker.addEventListener("tick", updateStage, false);

    console.log("init");

    //create obstacles to display
    //createObstacles();
    console.log(stageX, stageY, stageWidth, stageHeight);

    playerObject = new createjs.Shape();
    playerObject.graphics.beginFill("red").drawCircle(0, 0, 25);
    //stage.addChild(playerObject);

    createGrid();


    start();
}

//function for the start of the game and resetting
function start() {
}

//Create the grid of dots on the stage
function createGrid() {
    var indicator = new createjs.Shape();
    gridContainer = new createjs.Container();

    indicator.graphics.drawCircle(0, 0, 5).beginFill("white");

    for (var i = 0; i < stageWidth + 1; i += 100) {
        for (var j = 0; j < stageHeight + 1; j += 100) {
            indicator.graphics.drawCircle(i, j, 5).beginFill("white");
            gridContainer.addChild(indicator);
            console.log(i);
            console.log(j);
        }
    }

    stage.addChild(gridContainer);
}


//TODO
function createObstacles() {
    //not that hardcoded as of before, need to define a pattern where the obstacles may be placed
    for(var i = 0; i < 10; i++){
        var temp = new createjs.Shape();
        temp.graphics.beginFill("blue").drawCircle(20 + i*5, 40 + i*5, 25);
        obstacles.push(temp);
        //stage.addChild(obstacles[i]);
        console.log(obstacles[i]);
        //maybe useful in the future for random placing of obstacles
        // playerObject.x = Math.floor(Math.random()*(stage.canvas.width-200+200)+20);
        // playerObject.y = Math.floor(Math.random()*(stage.canvas.height-200+200)+20);

    }
}

function updateStage() {
    //console.log("update");
    stage.update();
}



window.addEventListener("load", init, false);