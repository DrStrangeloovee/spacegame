/**
 * Created by student on 30/11/16.
 */
/*
*edited by ilija
*/
var canvas;
var stage;
var rocket1=new Image();
var rocket;
var bg1=new Image();
var bg;
var bg2=new Image();
var bg_2;
var ast=new Image();
var lives=new Container();
var asteroids=new Container();
var score;
var gfxLoaded=0;
var centerX=160;
var center=240;
var tkr = new Object();
var timerSource;

function Main(){
    canvas=document.getElementById('Shooter');
    stage=new Stage(canvas);
    stage.mouseEventsEnabled=true;

    /*
    Hier kommen die ganzen Grafiken rein(Background, Gegner, Raumschiff)
     */
    bg1.src='background.jpg';
    bg1.name='bg';
    bg1.onload=loadGfx;

    rocket1.src='../rakete.png';
    rocket1.name='rocket';
    rocket1.onload=loadGfx;

    bg2.src='background2.jpg';
    bg2.name='bg_2';
    bg2.onload=loadGfx;

    l.src='live.png';
    l.name='live';
    l.onload=loadGfx;
    /*
    Den Ticker benutze ich um die Framerate auf 30 zu setzen
     */
    Ticker.setFPS(30);
    Ticker.addEventListener(stage);
}
/*
Diese Funktion wird verwendet um die Grafiken zu laden
 */
function loadGfx(e){
    if(e.target.name='bg1'){bg=new Bitmap(bg1);}
    if(e.target.name='rocket1'){bg=new Bitmap(rocket);}
    gfxLoaded++;
    if(gfxLoaded==9){
        addGameView();
    }
}
/*
Hinzufügen von der Rocket, Lebens counter, den Score und den Hintergrund zur stage
 */
function addGameView() {

    rocket1.x=centerX-18.5;
    rocket1.y=500+34;
/*
Leben hinzufügen
 */
for(var i=0;i<3;i++){
    var li = new Bitmap(l);
    l.x=250+(25*i);
    l.y=463;
    lives.addChild(li);
    stage.update();
}
/*
Score
 */
score=new Text('0', 'bold 14px Courier New', '#FFFFFF');
    score.maxWidth=1000;
    score.x=2;
    score.y=478;
    /* Zweiter Hintergrund*/
    bg_2.y=-480;
    /* Add gfx to Stage*/
    stage.addChild(bg1,bg_2,rocket,lives,score,asteroids);

}
function moveShip(e){
    rocket.x=e.stageX-18.5;
}

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

    asteroids.addChild(a);
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

function startGame(){
    stage.onmousemove=moveShip();
    bg.onpress=shoot;
    bg_2.onpress=shoot;

    Ticker.addEventListener(tkr,false);
    tkr.tick=update;
    timerSource=setInterval('addAsteroid()',1000);
}

function update(){
    bg.y+=5;
    bg_2.y+=5;
    if(bg.y>=500){
        bg.y=-500;
    }else if(bg_2.y>=500){
        bg_2.y=-500;
    }
}


