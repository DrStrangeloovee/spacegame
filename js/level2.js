/**
 * Created by marco on 11.01.17.
 */

var lines = [];

var stage,
    stageX,
    stageY,
    stageHeight,
    stageWidth,
    playerObject,
    playerObjectX,
    playerObjectY,
    startX,
    startY,
    line;


function init() {
    stage = new createjs.Stage("stage");
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);


    console.log("loaded");


    line = new createjs.Shape();
    line.graphics.setStrokeStyle(5).beginStroke("#ffffff");
    line.graphics.moveTo(0, 0);
    stage.addChild(line);
}

/**
 * Adds a new line to the planned routes and stores it as array in lines
 */
function addLine(){
    lines.push([parseInt(document.getElementById("x").value), parseInt(document.getElementById("y").value)]);

    drawLine();
    console.log(lines);
}

function drawLine() {
    line.graphics.lineTo(lines[lines.length - 1][0], lines[lines.length - 1][1]);
    stage.update();
    console.log("adding further lines, draw");
}

window.addEventListener("loaded", init, false);