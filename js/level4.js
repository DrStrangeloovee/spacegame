/**
 * Created by marco on 16.03.17.
 */
var stage, obstacleContainer, playerContainer;
var navigationPoint;
var navigationPointSet = false;

function init() {
    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.setInterval(30);
    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.addEventListener("tick", stage);

    stage.enableMouseOver(10);

    obstacleContainer = stage.addChild(new createjs.Container()).set({name: "obstacleContainer"});
    playerContainer = stage.addChild(new createjs.Container()).set({name: "playerContainer"});
    /*

    container.addEventListener("click", mousePressed, true);
*/


    playerImage = new Image();
    playerImage.src = "assets/spaceship.png";
    playerImage.onload = handleImageLoad;


    console.log("loaded");
    console.log("starting game...");


}

/**
 * loads image for playerobject - rocket
 */
function handleImageLoad(event) {
    createPlayerObject();
    console.log("IMAGES LOADED");
}

/**
 * places playerobject to top left corner and loads image
 */
function createPlayerObject() {
    playerObject = new createjs.Bitmap(playerImage);
    playerObject.x = 10;
    playerObject.y = 10;
    playerObject.regX = playerImage.width/2;
    playerObject.regY = playerImage.height/2;
    //because asset is in wrong rotation, rotate it into acceptable position

    playerContainer.addChild(playerObject);
}

/**
 * handles mouseclick and places new dot for navigation
 */
function handleMouseClick(event){
    navigationPoint = new createjs.Shape();
    navigationPoint.graphics.setStrokeStyle(1).beginStroke("#ffffff").beginFill("white").drawCircle(2,2,5);
    navigationPoint.x = event.stageX;
    navigationPoint.y = event.stageY;
    stage.addChild(navigationPoint);
    navigationPointSet = true;


    //TODO: TWEEN rotation of this shit
    var rads = Math.atan2(stage.mouseY - playerObject.y, stage.mouseX - playerObject.x);

    var angle = rads * (180 / Math.PI);
    console.log("angle: "+ angle);
    playerObject.rotation = angle;
    createjs.Tween.get(playerObject, { loop: false }).to({rotation: rads}, 1000, createjs.Ease.getPowInOut(4));
    fly(navigationPoint.x, navigationPoint.y);
}


/**
 * handles tick actions
 * @param event
 */
function tick(event) {
    /**
     * action for when mouse is pressed
     */
    stage.on("stagemousedown", function(event) {
        //checks first if there is currently one navigation point set, prevents spamming of clicks
        if(!navigationPointSet){
            handleMouseClick(event);
        }
    });

/*    playerContainer.on("stagemousemove", function (event) {

    });*/

    stage.update();
}

/**
 * animations for moving the rocket from dot to dot
 */
function fly(targetX, targetY) {
    console.log("lets fly");
    createjs.Tween.get(playerObject, { loop: false }).to({ x: targetX , y: targetY}, 1000, createjs.Ease.getPowInOut(4)).call(handleDestination);
    //eventlistener on tween end, just chain to the line before -> .addEventListener("oncomplete", handleDestination);


}

/**
 * After the tween animation is finished you can do here some stuff, for now it only updates the playerObject coordinates to the new ones
 */
function handleDestination() {
    navigationPointSet = false;
    stage.removeChild(navigationPoint);
    console.log("reached destination");
}


window.addEventListener("loaded", init, false);