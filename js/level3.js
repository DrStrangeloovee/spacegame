/**
 * Created by marco on 16.03.17.
 */
var stage;

var comet = new createjs.Graphics();
var cometS = new createjs.Shape(comet);

var curve = new createjs.Graphics();
var curveS = new createjs.Shape(curve);


function init() {
    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.setInterval(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick);

    startGame();
}

/**
 * Starts a new game
 */
function startGame(){
    /**
     * comet object init
     */
    comet.setStrokeStyle(1);
    comet.beginStroke(createjs.Graphics.getRGB(255,255,255));
    comet.beginFill(createjs.Graphics.getRGB(255,255,255));
    comet.drawCircle(0,0,20);

    cometS.x = 100;
    cometS.y = 100;



    /**
     * path for spacestation
     */
    var path = new createjs.Shape();
    path.graphics.beginStroke("#ff00ff").moveTo(stage.canvas.height, stage.canvas.width).curveTo(0,300,300,300);
    stage.addChild(path);



    stage.addChild(cometS);
    stage.update();
}

function tick(event) {
    stage.update();
}


/**
 * circle moving on line
 */
var stage = new createjs.Stage("canvas");
createjs.Ticker.addEventListener("tick", tick);
createjs.MotionGuidePlugin.install();

var shape = new createjs.Shape();
shape.graphics.beginFill("#ff00ff").drawCircle(0,0,50);
stage.addChild(shape);

createjs.Tween.get(shape).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);

var path = new createjs.Shape();
path.graphics.beginStroke("#ff00ff").moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
stage.addChild(path);

function tick(event) {
    stage.update();
}
