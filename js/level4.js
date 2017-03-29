/**
 * Created by marco on 16.03.17.
 */
var stage, obstacleContainer, playerContainer;
var navigationPoint;
var navigationPointSet;
var isFlying;
var obstacles;
//stores tweens for every obstacle
var obstacleTweens;
var obstacleCount;
//distance which player travelled aka points
var distanceTravelled;
//how many times player has clicked
var amountFlights;
//playerstate
var alive;

function init() {
    stage = new createjs.Stage("stage");
    createjs.MotionGuidePlugin.install(createjs.Tween);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.setInterval(30);
    //createjs.Ticker.addEventListener("tick", tick);

    stage.enableMouseOver(10);

    //variable declaration
    navigationPointSet = false;
    isFlying = false;
    obstacles = [];
    obstacleTweens = [];
    obstacleCount = 15;
    distanceTravelled = 0;
    amountFlights = 0;
    alive = true;

    playerContainer = stage.addChild(new createjs.Container()).set({name: "playerContainer"});
    obstacleContainer = stage.addChild(new createjs.Container()).set({name: "obstacleContainer"});

    //places playerContainer over all other obstacles
    stage.setChildIndex( playerContainer, stage.getNumChildren()-1);

    playerImage = new Image();
    playerImage.src = "assets/spaceship.png";
    playerImage.onload = handleImageLoad;

    createObstacles();

    console.log("loaded");
    console.log("starting game...");

    createjs.Ticker.on("tick", tick);
}

function createObstacles() {
    var obstacle = new createjs.Shape();
    obstacle.graphics.setStrokeStyle(1).beginStroke("#ffffff").beginFill("white").drawCircle(2,2,25);

    for(var i = 0; i < obstacleCount; i++){
        var obstacleClone = obstacle.clone(true);
        obstacleClone.x = stage.canvas.width-Math.floor(Math.random()*1000);
        obstacleClone.y = stage.canvas.height-Math.floor(Math.random()*1000);
        obstacleClone.name = "obst_" + i;
        obstacles.push(obstacleClone);

        for(var j in obstacles){
            var currentTween;
            //calculates randomly how much each obstacle goes down or up
            var random = Math.floor(Math.random()*399) - 99;
            //recalc if 0
            if(random === 0){
                random = Math.floor(Math.random()*399) - 99;
                currentTween = createjs.Tween.get(obstacleClone, { loop: false}).to({ x: -50, y: obstacleClone.y + random}, 20000).setPaused(true);
            }else if(random > 0){
                currentTween = createjs.Tween.get(obstacleClone, { loop: false}).to({ x: -50, y: obstacleClone.y + random}, 20000).setPaused(true);
            }else{
                currentTween = createjs.Tween.get(obstacleClone, { loop: false}).to({ x: -50, y: obstacleClone.y + random}, 20000).setPaused(true);
            }
            obstacleTweens.push(currentTween);
        }


        obstacleContainer.addChild(obstacleClone);
    }
}

/**
 * loads image for playerobject - rocket
 */
function handleImageLoad(event) {
    createPlayerObject();
    console.log("IMAGES LOADED");
}

/**
 * places playerObject to top left corner and loads image
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

    //calculates degrees for rotation of playerObject, starts tween for rotation and
    var rads = Math.atan2(stage.mouseY - playerObject.y, stage.mouseX - playerObject.x);
    var angle = rads * (180 / Math.PI);
    console.log("angle: "+ angle);
    //playerObject.rotation = angle;
    createjs.Tween.get(playerObject, { loop: false }).to({rotation: angle}, 500, createjs.Ease.getPowInOut(2));
    fly(navigationPoint.x, navigationPoint.y);
}

/**
 * handles tick actions and hit collision
 * @param event
 */
function tick(event) {
    /**
     * action for when mouse is pressed
     */
    stage.on("stagemousedown", function(event) {
        //checks first if there is currently one navigation point set, prevents spamming of clicks
        if(!navigationPointSet && alive){
            handleMouseClick(event);
        }
    });


    //hitcollision - fuck yessssss first try
    var l = obstacleContainer.getNumChildren();
    for (var i=0; i<l; i++) {
        var child = obstacleContainer.getChildAt(i);
        var pt = child.globalToLocal(playerObject.x, playerObject.y);
        if (child.hitTest(pt.x, pt.y)) {
            //console.log("hit");
            alive = false;
            endGame();
        }
    }

    stage.update();

//old stuff
/*
    while(isFlying){
        console.log("currently flying and checking for collision");
        obstacleContainer.hitTest(playerObject.x, playerObject.y);
    }
*/

/*    stage.on("stagemousemove", function (event) {
            console.log("stagemousemove - movementarrow");
    });*/

/*    var moveListener = stage.on("stagemousemove", function(event) {
        // Determine the length between the start and end point using pythagoras
        var w = stage.mouseX - movementLine.x;
        var h = stage.mouseY - movementLine.y;

        //var l = Math.sqrt(w*w+h*h);

        // Draw the arrow.
        // Math.sqrt on the amplitude and frequency make it scale as it gets larger
        //drawArrow(current, l, Math.sqrt(l), Math.sqrt(l));

        // Rotate to touch the mouse, i dont know why but setting the playerObject rotation the same with the movementLine makes the whole thing more smooth
        movementLine.graphics.rotation = playerObject.rotation = Math.atan2(h,w) * 180/Math.PI;
        stage.update();
    });*/


}
/**
 * ends the game if player hits obstacle and restarts it(somewhat)
 */
function endGame() {
    //stop the whole game
    //createjs.Ticker.paused = true;
    //gameover text
    var text = new createjs.Text("Du verlierst!", "30px Arial", "#be0a00");
    text.baseLine = "middle";
    text.textAlign = "center";
    text.x = stage.canvas.width/2;
    text.y = stage.canvas.height/2;
    text.outLine = 1;


    var text2 = new createjs.Text("Klicke hier um neu zu starten!", "20px Arial", "#fff");
    text2.baseLine = "middle";
    text2.textAlign = "center";
    text2.x = stage.canvas.width/2;
    text2.y = text.y + 30;
    text2.outLine = 1;

    stage.on("stagemousedown", function(event) {
        //console.log("click on text");
        //restart game
        init();
    });


    stage.addChild(text, text2);
    stage.update();
}

/**
 * when player reaches end he wins the game and displays distance travelled
 */
function winGame(){
    //stop the whole game
    //createjs.Ticker.paused = true;
    //winning text
    var text = new createjs.Text("Du gewinnst!", "30px Arial", "#10b346");
    text.baseLine = "middle";
    text.textAlign = "center";
    text.x = stage.canvas.width/2;
    text.y = stage.canvas.height/2;
    text.outLine = 1;

    var text2 = new createjs.Text("Deine Punkte:\n " + distanceTravelled, "20px Arial", "#fff");
    text2.baseLine = "middle";
    text2.textAlign = "center";
    text2.x = stage.canvas.width/2;
    text2.y = text.y + 30;
    text2.outLine = 1;

    var text3 = new createjs.Text("Klicke hier um neu zu starten!", "20px Arial", "#fff");
    text3.baseLine = "middle";
    text3.textAlign = "center";
    text3.x = stage.canvas.width/2;
    text3.y = text2.y + 30;
    text3.outLine = 1;

    stage.on("stagemousedown", function(event) {
        //console.log("click on text");
        //restart game
        init();
    });


    stage.addChild(text, text2, text3);
    stage.update();
}

/**
 * animations for moving the rocket from dot to dot
 */
function fly(targetX, targetY) {

    //starts tweens for obstacles
    for(var i = 0; i<obstacleTweens.length; i++){
        //wtf createjs, cannot access tween inside array and need to pull it out first???????
        var currentTween = obstacleTweens[i];
        currentTween.setPaused(false);
    }

    isFlying = true;
    console.log("lets fly");

    createjs.Tween.get(playerObject, { loop: false }).to({ x: targetX , y: targetY}, 2500, createjs.Ease.getPowInOut(4)).call(handleDestination);

    //calculate distance for points
    console.log("target: " + targetY);
    console.log("playerob: " + playerObject.y);
    var xDistance = parseInt(playerObject.x)+ parseInt(targetX);
    console.log("xdist: " + xDistance);

    var yDistance = parseInt(playerObject.y) + parseInt(targetY);
    console.log("ydist: " + yDistance);

    var distance = Math.floor(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));

    distanceTravelled += distance;
    //eventlistener on tween end, just chain to the line before -> .addEventListener("oncomplete", handleDestination);
}

/**
 * After the tween animation is finished you can do here some stuff, for now it only updates the playerObject coordinates to the new ones
 */
function handleDestination(event) {
    //pauses tweens for obstacles
    for(var i = 0; i<obstacleTweens.length; i++){
        //wtf createjs, cannot access tween inside array and need to pull it out first???????
        var currentTween = obstacleTweens[i];
        currentTween.setPaused(true);
    }

    //if player reached right end he wins the game
    if(playerObject.x > 1000){
        winGame();
    }

    amountFlights++;
    console.log("amount flights: " + amountFlights);
    console.log("distance travelled: " + distanceTravelled);
    isFlying = false;
    navigationPointSet = false;
    stage.removeChild(navigationPoint);
    console.log("reached destination");
}


window.addEventListener("loaded", init, false);