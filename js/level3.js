/**
 * Created by marco on 16.03.17.
 */
var comet = new createjs.Graphics();
var cometS = new createjs.Shape(comet);

var curve = new createjs.Graphics();
var curveS = new createjs.Shape(curve);



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
