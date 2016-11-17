/**
 * Created by marco on 17.11.16.
 * ilija
 */
function draw(){

    // zunächst muss ich eine Stage erzeugen, auf der gezeichnet werden kann
    stage = new createjs.Stage(document.getElementById("myCanvas"));

// jetzt erzeuge ich ein Graphics-Objekt mit einer Linienfarbe
    var g = new createjs.Graphics();
    g.beginStroke('#ffffff');

//jetzt geht es ans Zeichnen
    g.moveTo(0,0);
    g.lineTo(600,400);

// wir sind mit dem Zeichnen fertig und wollen nun unser
// Graphics-Object in eine Shape überführen, damit diese auf
// der Bühne angezeigt werden kann.
    var s = new createjs.Shape(g);

// die Shape ist fertig, aber es muss noch auf die Bühne gebracht werden
// und dann - man denke daran, dass im Canvas bei Änderungen immer die ganze
// Bühne neu gezeichnet werden muss - wird mit der Methode update() alles neu gezeichnet
    stage.addChild(s);
    stage.update();
}
windows.addEventListener("load",draw,false);
