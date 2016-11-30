/**
 * Created by student on 30/11/16.
 */
/*
*edited by ilija
*/
/*
Diese Funktion zeigt die derzeitigen Punkte an
 */
score=new Text('0', 'bold 14 px Courier','#FFFFFF');
score.maxWidth=100;
score.x=2;
score.y=476;

/*
Asteroiden hinzufügen. Diese fallen vom Himmel in einem abstand von 1.000 Millisekunde
Die Position auf der x Achse ist random
 */
function addAsteroid(){
    var a=new Bitmap();
    a.x=Math.floor(Math.random() * (320-50));
    a.y=-50;

    asteroid.addChild(a);
    stage.update();
}
/*
Bewegender Hintergrund
 */
function Backgr(){
    bg.y+=5;
    bg2.y+=5;
    if(bg.y>=480){
        bg.y=-480;
    }else if (bg2.y <= 480) {
    } else bg2.y = -480;
}



function updateStage() {
    //console.log("update");

    stage.update();
}

window.addEventListener("load", init, false);

