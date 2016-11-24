/**
 * Created by marco on 24.11.16.
 */

/** Init the Stage and variables */

//define the stage
var stage;

//define the player character
var playerObject;

//holds all the obstacles on the current level
var obstacles = [];

function init(){
    stage = new createjs.Stage(document.getElementById("stage"));
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", updateStage, false);

    playerObject = new createjs.Shape();
    //playerObject.graphics.beginFill("red").drawCircle(0, 0, 50);

    playerObject.graphics.beginFill("red").drawCircle(0, 0, 25);

    stage.addChild(playerObject);

    //create obstacles to display
    createObstacles();



    
    start();
}

//function for the start of the game and resetting
function start() {

}

//moves the playerObject
function move() {

}

//updating the stage
function updateStage() {
    stage.update();
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

window.addEventListener("load", init, false);