//http://blog.sklambert.com/html5-canvas-game-the-player-ship/

var game;
var landPos = 300;
var churn = 0;
var currency;
var duration =0;
var countdown;
var countframe;
var level
var stoprender = 0;

function CallMyMethod() {
     CallPageMethod(OnSucceeded, OnFailed);
}

function CallPageMethod(OnSucceeded, OnFailed) {
    $(document).ready(function(){
        $.ajax({
            type: "POST",
            url: "inGame.aspx/churnAnalysis",
            data: "{ c: '" + currency  + "',d:'"+ duration + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSucceeded,
            fail: OnFailed
        });
    });
}

/**
 * Initialize the Game and starts it.
 */
function newGame() {

    currency = 100;
    level = 1;
    game = new Game();
    init();
}

function init() {
    /////////////////////////////////////////////////////
    countdown = 60;
    countframe = 0;
    if (game.init())
        game.start();
}

// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
pokeball.prototype = new Drawable();
pokemon.prototype = new Drawable();
masterball.prototype = new Drawable();
judge.prototype = new Drawable();


/**
 * Creates the Game object which will hold all objects and data for
 * the game.
 */
function Game() {
    /*
	 * Gets canvas information and context and sets up all game
	 * objects.
	 * Returns true if the canvas is supported and false if it
	 * is not. This is to stop the animation script from constantly
	 * running on older browsers.
	 */
    this.init = function () {
        // Get the canvas element
        this.bgCanvas = document.getElementById('background');
        this.bgpokeball = document.getElementById('pokeball');
        this.bgmasterball = document.getElementById('pokeball');
        this.bgpokemon = document.getElementById('pokemon');
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.bgpokeball = this.bgpokeball.getContext('2d');
            this.bgmasterball = this.bgmasterball.getContext('2d');
            this.bgpokemon = this.bgpokemon.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            pokeball.prototype.context = this.bgpokeball;
            pokeball.prototype.canvasWidth = this.bgpokeball.width;
            pokeball.prototype.canvasHeight = this.bgpokeball.height;
            masterball.prototype.context = this.bgmasterball;
            masterball.prototype.canvasWidth = this.bgmasterball.width;
            masterball.prototype.canvasHeight = this.bgmasterball.height;
            pokemon.prototype.context = this.bgpokemon;
            pokemon.prototype.canvasWidth = this.bgpokemon.width;
            pokemon.prototype.canvasHeight = this.bgpokemon.height;
            judge.prototype.context = this.bgpokemon;
            judge.prototype.canvasWidth = this.bgpokemon.width;
            judge.prototype.canvasHeight = this.bgpokemon.height;
            // Initialize the background object
            this.background = new Background();
            this.background.init(0, 0, 0, 0); // Set draw point to 0,0

            this.judge = new judge();

            //Load pokeball and pokemon
            this.pokeballComponent = new BallBag();
            this.pokeballComponent.init();
            this.pokemonComponent = new PoolPokemon();
            this.pokemonComponent.init();

            cleancanvas();

            return true;
        } else {
            return false;
        }
    };

    // Start the animation loop
    this.start = function () {
        animate();
    };
}

function cleancanvas() {
    game.bgContext.clearRect(0, 0, Background.prototype.canvasWidth, Background.prototype.canvasHeight);
    game.bgpokeball.clearRect(0, 0, Background.prototype.canvasWidth, Background.prototype.canvasHeight);
    game.bgpokemon.clearRect(0, 0, Background.prototype.canvasWidth, Background.prototype.canvasHeight);
}

function PoolPokemon() {
    var size = 3; // Max bullets allowed in the pool
    this.pool = [];
    var count = 1;
    /*
	 * Populates the pool array with Bullet objects
	 */
    this.init = function () {
        for (var i = 0; i < size; i++) {
            this.pool[i] = null;
        }
    };
    /*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
    this.get = function () {
        var temp = Math.round(Math.random());
        var x;
        if(temp == 0){
            
            x = ((Math.random() * 5 * Math.floor(level/3 + 1)) + 1) % 15;
        }
        else{
            
            x = (-1) * (((Math.random() * 5 * Math.floor(level / 5 + 1)) + 1)) % 15;
        }
        if (this.pool[size - 1] == null || !this.pool[size - 1].alive) {
            // Initalize the pokemon object
            var _pokemon = new pokemon(Math.floor(Math.random() * 14.9));
            _pokemon.init(0, Background.prototype.canvasHeight * 7 / 16 + Math.round(Math.random() * 200) - 100, imageRepository.pokemon[0].width, imageRepository.pokemon[0].height);
            this.pool[size - 1] = _pokemon;
            this.pool[size - 1].spawn(x);
            this.pool.unshift(this.pool.pop());
        }
    };
    /*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
    this.animate = function () {
        var temp = Math.round(Math.random() * 50) + 100;
        count+=1;
        for (var i = 0; i < size; i++) {
            // Only draw until we find a bullet that is not alive
            if (this.pool[i] != null && this.pool[i].alive) {
                if (this.pool[i].draw()) {
                    this.pool.push((this.pool.splice(i, 1))[0]);
                }
            }
            else {
                if (count > temp) {

                    this.get();
                    count = 1;
                }
            }
        }
    };
}

function BallBag() {
    var size = 1; // Max bullets allowed in the pool
    this.pool = [];
    /*
	 * Populates the pool array with Bullet objects
	 */
    this.init = function () {
        for (var i = 0; i < size; i++) {
            // Initalize the bullet object
            var _ball = new pokeball();
            _ball.init(20, Background.prototype.canvasHeight - 60, imageRepository.pokeball.width, imageRepository.pokeball.height);
            this.pool[i] = _ball;
        }
    };
    /*
	 * Grabs the last item in the list and initializes it and
	 * pushes it to the front of the array.
	 */
    this.get = function () {
        if (!this.pool[size - 1].active) {
            this.pool[size - 1] = null;
            CallMyMethod();
             if (churn == 0 && Math.random()> 0.07) {
                var _ball = new pokeball();
                _ball.init(20, Background.prototype.canvasHeight - 60, imageRepository.pokeball.width, imageRepository.pokeball.height);
                this.pool[0] = _ball;
            }
            else {
                //create superball
                var _ball = new masterball();
                _ball.init(20, Background.prototype.canvasHeight - 60, imageRepository.masterball.width, imageRepository.masterball.height);
                this.pool[0] = _ball;
            }
        }
    };
    /*
	 * Draws any in use Bullets. If a bullet goes off the screen,
	 * clears it and pushes it to the front of the array.
	 */
    this.animate = function () {
        for (var i = 0; i < size; i++) {
            // Only draw until we find a bullet that is not alive
            if (this.pool[i].active) {
                this.pool[i].draw();
            }
            else {

                    this.get();
            }
        }
    };
}

function Background() {
    // Implement abstract function
    this.draw = function () {

        this.context.clearRect(this.x, this.y, Background.prototype.canvasWidth, Background.prototype.canvasHeight);
        this.context.drawImage(imageRepository.background, this.x, this.y);
        this.context.drawImage(imageRepository.scoreboard, this.x, this.y, 150, 100);
        var t1 = Background.prototype.canvasWidth - 150;
        this.context.drawImage(imageRepository.countdown, Background.prototype.canvasWidth - 150, 0, 150, 100);


        this.context.font = "bolder 60px Verdana";
        this.context.textAlign = 'center';
        this.context.fillText(countdown, Background.prototype.canvasWidth - 75, 70);

        this.context.font = "bolder 40px Arial";
        this.context.textAlign = 'center';
        // Create gradient
        var gradient = this.context.createLinearGradient(10, 0, 100, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // Fill with gradient
        this.context.fillStyle = gradient;
        this.context.fillText(currency, 75, 60);

    };
}

function judge() {
    this.aim = level * 100 + (1 + level) * level * 250;
    this.nextaim = this.aim + 100 + 500 * (level+1);
    this.draw = function () {
        if (this.aim <= currency) {
            this.context.font = "bolder 30px Verdana";
            this.context.textAlign = 'center';
            this.context.fillStyle = 'blue';
            this.context.fillText("You Pass the Level!!", Background.prototype.canvasWidth / 2, Background.prototype.canvasHeight / 2 - 30);
            this.context.fillText("Your next aim is " + this.nextaim, Background.prototype.canvasWidth / 2 + 20, Background.prototype.canvasHeight / 2 + 20);
            this.context.font = "20px Verdana";
            this.context.fillStyle = 'black';
            this.context.fillText("Press [SPACE] to LEVEL " + level, Background.prototype.canvasWidth / 2, Background.prototype.canvasHeight - 100);
            if (KEY_STATUS.space) {
                KEY_STATUS.space = false;
                stoprender = 1;
                level++;
                init();
            }
        }
        else {
            var rank = 1000000;
            if(currency > 0)
                rank = Math.round(1000000 / currency);
            this.context.fillStyle = 'red';
            this.context.font = "bolder 30px Verdana";
            this.context.textAlign = 'center';
            this.context.fillText("You Don't know Professor Oak's Mind!", Background.prototype.canvasWidth / 2, Background.prototype.canvasHeight / 2 - 30);
            this.context.fillText("You are at Rank " + rank, Background.prototype.canvasWidth / 2, Background.prototype.canvasHeight / 2 + 20);
            this.context.font = "20px Verdana";
            this.context.fillStyle = 'black';
            this.context.fillText("Press [SPACE] to RESTART", Background.prototype.canvasWidth / 2, Background.prototype.canvasHeight - 100);
            if (KEY_STATUS.space) {
                KEY_STATUS.space = false;
                stoprender = 1;
                newGame();
            }
        }
    }

}
function pokeball() {

    this.active = 1;
    var s = (5 + Math.floor(level / 3));
    if (s > 15) {
        this.speed = 15;
    }
    else {
        this.speed = s
    }
    this.iniX = this.speed / 2;
    this.iniY = -20;
    this.speedX = this.iniX;
    this.speedY = this.iniY;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.inhand = 1;

    this.draw = function () {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        //detectcollision
            if(this.gravitySpeed > 20){
                var myleft = this.x + 10;
                var myright = this.x + (this.width) - 10;
                var mytop = this.y + 10;
                var mybottom = this.y + (this.height) - 10;
                var len = game.pokemonComponent.pool.length;
                for (var i = 0; i < len; i++) {
                    if (game.pokemonComponent.pool[i] != null) {

                        var otherobj = game.pokemonComponent.pool[i];
                        var otherleft = otherobj.x;
                        var otherright = otherobj.x + (otherobj.width);
                        var othertop = otherobj.y;
                        var otherbottom = otherobj.y + (otherobj.height);
                        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                        }
                        else {
                            if (otherobj.imgIdx == 14) {
                                currency -= 2000;
                            }
                            else if (otherobj.imgIdx == 12) {
                                currency += 1000;
                            }
                            else if (otherobj.imgIdx == 3) {
                                currency += 777;
                            }
                            else {
                                currency += 200;
                            }
                            this.active = 0;
                            //not disappearing?
                            game.pokemonComponent.pool[i].goOff = true;
                            break;
                        }
                    }
                }
                
            }
            if (this.active != 0) {
                if (KEY_STATUS.space || this.inhand == 0) {
                    if (KEY_STATUS.space && this.inhand == 1) {
                        KEY_STATUS.space = false;
                        this.inhand = 0;
                        currency -= 20;
                    }
                    if (this.speed < 0 && this.speedX > 0) {
                        this.speedX *= -1;
                    }
                    this.gravitySpeed += this.gravity;
                    this.x += this.speedX;
                    this.y += this.speedY + this.gravitySpeed;


                }
                else {
                    if ((this.x > Background.prototype.canvasWidth - imageRepository.pokeball.width) || (this.x < 5)) {
                        this.speed *= -1;
                    }
                        this.x += this.speed;
                }
                if (this.x >= pokeball.prototype.canvasWidth || (this.y > landPos && this.gravitySpeed > 20)) {
                    this.active = 0;
                }
                else {
                    this.context.drawImage(imageRepository.pokeball, this.x, this.y, imageRepository.pokeball.width, imageRepository.pokeball.height);
                }
            }
    };
    
}

function masterball() {

    this.active = 1;
    var s = (3 + Math.floor(level / 4));
    if (s > 10) {
        this.speed = 10;
    }
    else {
        this.speed = s
    }
    this.iniX = this.speed / 2;
    this.iniY = -20;
    this.speedX = this.iniX;
    this.speedY = this.iniY;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.inhand = 1;

    this.draw = function () {
        this.context.clearRect(this.x, this.y, this.width, this.height);
        //detectcollision
        if (this.gravitySpeed > 20) {
            var myleft = this.x + 10;
            var myright = this.x + (this.width) - 10;
            var mytop = this.y + 10;
            var mybottom = this.y + (this.height) - 10;
            var len = game.pokemonComponent.pool.length;
            for (var i = 0; i < len; i++) {
                if (game.pokemonComponent.pool[i] != null) {

                    var otherobj = game.pokemonComponent.pool[i];
                    var otherleft = otherobj.x;
                    var otherright = otherobj.x + (otherobj.width);
                    var othertop = otherobj.y;
                    var otherbottom = otherobj.y + (otherobj.height);
                    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    }
                    else {
                        if (otherobj.imgIdx == 14) {
                            currency -= 2000;
                        }
                        else if (otherobj.imgIdx == 12) {
                            currency += 1000;
                        }
                        else if (otherobj.imgIdx == 3) {
                            currency += 777;
                        }
                        else {
                            currency += 200;
                        }
                        this.active = 0;
                        //not disappearing?
                        game.pokemonComponent.pool[i].goOff = true;
                        break;
                    }
                }
            }

        }
        if (this.active != 0) {
            if (KEY_STATUS.space || this.inhand == 0) {
                if (KEY_STATUS.space && this.inhand == 1) {
                    KEY_STATUS.space = false;
                    this.inhand = 0;
                    currency -= 20;
                }
                if (this.speed < 0 && this.speedX > 0) {
                    this.speedX *= -1;
                }
                this.gravitySpeed += this.gravity;
                this.x += this.speedX;
                this.y += this.speedY + this.gravitySpeed;
            }
            else {
                if ((this.x > Background.prototype.canvasWidth - imageRepository.masterball.width) || (this.x < 5)) {
                    this.speed *= -1;
                }
                    this.x += this.speed;
            }
            if (this.x >= masterball.prototype.canvasWidth || (this.y > landPos && this.gravitySpeed > 20)) {
                this.active = 0;
            }
            else {
                this.context.drawImage(imageRepository.masterball, this.x, this.y, imageRepository.masterball.width, imageRepository.masterball.height);
            }
        }
    };

}

function pokemon(index) {
    this.alive = false; // Is true if the bullet is currently in use
    this.goOff = false;
    this.imgIdx = index;
    /*
	 * Sets the bullet values
	 */
    this.spawn = function (speed) {
        if (speed > 0) {

        }
        else {

            this.x = Background.prototype.canvasWidth - this.x;
        }

        this.speed = speed;
        this.alive = true;
    };
    /*
	 * Uses a "drity rectangle" to erase the bullet and moves it.
	 * Returns true if the bullet moved off the screen, indicating that
	 * the bullet is ready to be cleared by the pool, otherwise draws
	 * the bullet.
	 */
    this.draw = function () {
        this.context.clearRect(this.x, this.y, 70,70);
        this.x += this.speed;
        if (this.x <= 0 - this.width || this.x >= Background.prototype.canvasWidth + this.width || this.goOff == true) {
            this.clear();
            return true;
        }
        else {
            this.context.drawImage(imageRepository.pokemon[this.imgIdx], this.x, this.y, 70, 70);
        }
    };
    /*
	 * Resets the bullet values
	 */
    this.clear = function () {
        this.x = 0;
        this.speed = 0;
        this.alive = false;
        this.goOff = false;
    };
}




/**
 * Define an object to hold all our images for the game so images
 * are only ever created once. This type of object is known as a
 * singleton.
 */
var imageRepository = new function () {
    // Define images
    this.background = new Image();
    this.scoreboard = new Image();
    this.countdown = new Image();
    this.pokeball = new Image();
    this.masterball = new Image(100,100);
    this.pokemon = [];
    for (var i = 0; i < 15; i++) {
        this.pokemon[i] = new Image();
    }
    // Set images src
    this.background.src = "Asset/pokemon/background.png";
    this.scoreboard.src = "Asset/scoreboard.jpg";
    this.countdown.src = "Asset/countdown.jpg";
    this.pokeball.src = "Asset/pokemon/Pokeball.png";
    this.masterball.src = "Asset/pokemon/masterball.png";
    this.pokemon[0].src = "Asset/pokemon/charizard1.png";
    this.pokemon[1].src = "Asset/pokemon/charmander2.png";
    this.pokemon[2].src = "Asset/pokemon/pichu1.png";
    this.pokemon[3].src = "Asset/pokemon/pika1.png";
    this.pokemon[4].src = "Asset/pokemon/pokemon.gif";
    this.pokemon[5].src = "Asset/pokemon/dugtrio1.png";
    this.pokemon[6].src = "Asset/pokemon/raichu1.png";
    this.pokemon[7].src = "Asset/pokemon/weezing1.png";
    this.pokemon[8].src = "Asset/pokemon/voltorb1.png";
    this.pokemon[9].src = "Asset/pokemon/pika4.png";
    this.pokemon[10].src = "Asset/pokemon/magmeton1.png";
    this.pokemon[11].src = "Asset/pokemon/koffing1.png";
    this.pokemon[12].src = "Asset/pokemon/exeggutor1.png";
    this.pokemon[13].src = "Asset/pokemon/charmeleon1.png";
    this.pokemon[14].src = "Asset/damu/Professor_Oak_color.png";

    for (var i = 0; i < 15; i++) {

        this.pokemon[i].onload = function () {
            this.width = 70;
            this.height = 70;
        }
    }
    this.pokeball.onload = function () {
        this.width = 50;
        this.height = 50;
    }
    this.masterball.onload = function () {
        this.width = 70;
        this.height = 70;
    }
}

/**
 * Creates the Drawable object which will be the base class for
 * all drawable objects in the game. Sets up default variables
 * that all child objects will inherit, as well as the default
 * functions.
 */
function Drawable() {
    this.init = function (x, y, width, height) {
        // Default variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // Define abstract function to be implemented in child objects
    this.draw = function () {
    };
}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function animate() {
    if (!stoprender) {

        requestAnimFrame(animate);
        if (countdown >= 0 && currency >= 0) {
            game.background.draw();
            game.pokeballComponent.animate();
            game.pokemonComponent.animate();
            updateTime();
        }
        else {
            game.judge.draw();
        }

        duration++;
    }
    else {
        stoprender = 0;
    }
}
/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (/* function */ callback, /* DOMElement */ element) {
			    window.setTimeout(callback, 1000 / 60);
			};
})();

function updateTime() {
    countframe++;
    if (countframe > 50) {
        countdown--;
        countframe = 0;
    }
}

// Callback function invoked on successful 
// completion of the page method.
function OnSucceeded(result, userContext, methodName) {
    //alert(result);
    churn = result.d;

}

// Callback function invoked on failure 
// of the page method.
function OnFailed(error, userContext, methodName) {
    window.alert("Fail to trigger Churn Analysis. Please try to refresh page.");

}
// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}
// Creates the array to hold the KEY_CODES and sets all their values
// to false. Checking true/flase is the quickest way to check status
// of a key press and which one was pressed when determining
// when to move and which direction.
KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}
/**
 * Sets up the document to listen to onkeydown events (fired when
 * any key on the keyboard is pressed down). When a key is pressed,
 * it sets the appropriate direction to true to let us know which
 * key it was.
 */
document.onkeydown = function (e) {
    // Firefox and opera use charCode instead of keyCode to
    // return which key was pressed.
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
}
/**
 * Sets up the document to listen to ownkeyup events (fired when
 * any key on the keyboard is released). When a key is released,
 * it sets teh appropriate direction to false to let us know which
 * key it was.
 */
document.onkeyup = function (e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
}

