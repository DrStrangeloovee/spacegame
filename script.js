/**
 * Created by marco on 17.11.16.
 * ilija = hrn
 */

var stage = new createjs.Stage("mystage");

var circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(0, 0, 50);
circle.x = 100;
circle.y = 100;
stage.addChild(circle);