function init() {
    var stage = new createjs.Stage("canvas");
    var gridContainer = new createjs.Container();

    var lineList = [];

    const img = {
        ship: 'spaceship.png',
        fire: {
            1: 'spaceshooter/PNG/Lasers/laserBlue07.png',
            2: 'spaceshooter/PNG/Lasers/laserBlue06.png',
            3: 'spaceshooter/PNG/Lasers/laserBlue16.png',
            4: 'spaceshooter/PNG/Lasers/laserBlue16.png',
            enemie: 'spaceshooter/PNG/Lasers/laserRed07.png',
            hit: {blue: 'spaceshooter/PNG/Lasers/laserBlue10.png', red: 'spaceshooter/PNG/Lasers/laserBlue10.png'}
        },
        rocks: {
            small: 'spaceshooter/PNG/Meteors/meteorBrown_med1.png',
            big: 'spaceshooter/PNG/Meteors/meteorBrown_big3.png'
        },
        enemies: {
            0: 'spaceshooter/PNG/Enemies/enemyBlue1.png',
            1: 'spaceshooter/PNG/Enemies/enemyBlue2.png',
            2: 'spaceshooter/PNG/Enemies/enemyBlue3.png',
            3: 'spaceshooter/PNG/Enemies/enemyBlue4.png',
            4: 'spaceshooter/PNG/Enemies/enemyBlue5.png'
        },
        bosses: {
            0: 'spaceshooter/PNG/Enemies/enemyBlack5.png',
            1: 'spaceshooter/PNG/Enemies/enemyBlack4.png',
            2: 'spaceshooter/PNG/Enemies/enemyBlack3.png',
            3: 'spaceshooter/PNG/Enemies/enemyBlack2.png',
            4: 'spaceshooter/PNG/Enemies/enemyBlack1.png'
        },
        bonus: {
            life: 'spaceshooter/PNG/Power-ups/pill_yellow.png',
            shoot: 'spaceshooter/PNG/Power-ups/bolt_gold.png',
            points: 'spaceshooter/PNG/Power-ups/star_gold.png',
            speed: 'spaceshooter/PNG/Power-ups/powerupYellow_star.png',
            shield: 'spaceshooter/PNG/Power-ups/shield_gold.png'
        },
        life: 'spaceshooter/PNG/UI/playerLife1_orange.png',
        shield: 'spaceshooter/PNG/Effects/shield3.png'
    };

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(60);

    var ship = {
        bitmap: false,
        speed: 7,
        image: img.ship,
        lives: 3,
        direction: {left: false, right: false, up: false, down: false},

        append: function () {
            this.bitmap = new createjs.Bitmap('img/' + this.image);
            stage.addChild(this.bitmap);
            this.bitmap.x = (stage.canvas.width / 2) - (this.bitmap.image.width / 2);
            this.bitmap.y = stage.canvas.height - 100;
            //stage.update();
        },

        move: function (dir) {
            if (dir == 'left' && this.bitmap.x > 5)
                this.bitmap.x -= this.speed;
            draw();
            if (dir == 'right' && this.bitmap.x < (stage.canvas.width - this.bitmap.image.width) - 5)
                this.bitmap.x += this.speed;
            draw();
            if (dir == 'up' && this.bitmap.y > 5)
                this.bitmap.y -= this.speed;
            draw();
            if (dir == 'down' && this.bitmap.y < (stage.canvas.height - this.bitmap.image.height) - 5)
                this.bitmap.y += this.speed;
            draw();
            stage.update();
        }

    };

    var keys = {
        left: 37,
        right: 39,
        up: 38,
        down: 40,
        fire: 32,
        escape: 27,
        enter: 13
    };

    function draw() {
        stage.removeChild(stage.getChildByName("0"));
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3).beginStroke("white");
        line.graphics.moveTo(ship.bitmap.x, ship.bitmap.y);
        stage.addChild(line);

        line.graphics.lineTo(200, 200);
        line.graphics.endStroke();

        line.name = lineList.length + "";
        line.graphics.x = 100;
        line.graphics.y = 100;
        lineList.push(line);
        console.log(lineList);

        // stage.addChild(line);
        // line.graphics.moveTo(curX, curY);
        // line.graphics.setStrokeStyle(3).beginStroke("rgba(0,0,0,1)");
        // var line = new createjs.Shape();
        // line.graphics.setStrokeStyle(3);
        // line.graphics.beginStroke("rgba(0,0,0,1)");
// line.graphics.moveTo(startX, startY);
    }

    ship.append();

    function handleTick(event) {
        //console.log(ship.direction);
        for (var v in ship.direction) {
            if (ship.direction[v])
                ship.move(v);
        }
        stage.update()
    }

    function handleKeyDown(e) {
        e.preventDefault();
        var key = e.keyCode;
        if (key == keys.left)
            ship.direction.left = true;
        if (key == keys.right)
            ship.direction.right = true;
        if (key == keys.up)
            ship.direction.up = true;
        if (key == keys.down)
            ship.direction.down = true;
    }

    function handleKeyUp(e) {
        var key = e.keyCode;
        if (key == keys.left)
            ship.direction.left = false;
        if (key == keys.right)
            ship.direction.right = false;
        if (key == keys.up)
            ship.direction.up = false;
        if (key == keys.down)
            ship.direction.down = false;
    }

    /**
     * Draws the grid of dots, used for navigating the stage with the playerObject
     * The grid is placed in a separate container for
     */
    function createGrid() {
        var indicator = new createjs.Shape();
        indicator.graphics.drawCircle(0, 0, 5).beginFill("white");

        for (var i = 0; i < stage.canvas.width + 1; i += 100) {
            for (var j = 0; j < stage.canvas.height + 1; j += 100) {
                indicator.graphics.drawCircle(i, j, 5).beginFill("white");
                gridContainer.addChild(indicator);
                //console.log(gridPositions[j]);
            }
        }
        stage.addChild(gridContainer);

        /*TODO
         * May be useful if performance is important, still dont know if it works tho
         * gridContainer.cache(stageX, stageY, stageWidth, stageHeight);
         */
    }

    createGrid();
}