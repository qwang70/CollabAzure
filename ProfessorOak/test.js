//http://blog.sklambert.com/html5-canvas-game-the-player-ship/
function DoClick() {
    Form1.Message.value = 'Text from javascript';
};

function CallMyMethod() {
    CallPageMethod(OnSucceeded, OnFailed);
}

function CallPageMethod(OnSucceeded, OnFailed) {
    $.ajax({
        type: "POST",
        url: "inGame.aspx/churnAnalysis",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: OnSucceeded,
        fail: OnFailed
    });
}

/**
 * Initialize the Game and starts it.
 */
var game = new Game();
var landPos = 240;
var churn = 0;


function init() {

    if (game.init())
        game.start();
}


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
        this.bgpokemon = document.getElementById('pokemon');
        // Test to see if canvas is supported
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.bgpokeball = this.bgpokeball.getContext('2d');
            this.bgpokemon = this.bgpokemon.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            pokeball.prototype.context = this.bgpokeball;
            pokeball.prototype.canvasWidth = this.bgpokeball.width;
            pokeball.prototype.canvasHeight = this.bgpokeball.height;
            pokemon.prototype.context = this.bgpokemon;
            pokemon.prototype.canvasWidth = this.bgpokemon.width;
            pokemon.prototype.canvasHeight = this.bgpokemon.height;
            // Initialize the background object
            this.background = new Background();
            this.background.init(0, 0, 0, 0); // Set draw point to 0,0

            //Load pokeball and pokemon
            this.pokeballComponent = new pokeball();
            this.pokeballComponent.init(20, Background.prototype.canvasHeight - 60, imageRepository.pokeball.width, imageRepository.pokeball.height);
            this.pokemonComponent = new pokemon();
            this.pokemonComponent.init(0, Background.prototype.canvasHeight * 2 / 3, imageRepository.pokemon.width, imageRepository.pokemon.height);
            this.pokemonComponent.spawn(4);

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

function Background() {
    this.speed = 0; // Redefine speed of the background for panning
    // Implement abstract function
    this.draw = function () {

        this.context.drawImage(imageRepository.background, this.x, this.y);
        /*
        // Pan background
        this.x += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        // Draw another image at the top edge of the first image
        this.context.drawImage(imageRepository.background, this.x - this.canvasWidth, this.y);
        // If the image scrolled off the screen, reset
        if (this.x >= this.canvasWidth) {

            this.x = 0;
        }
        */
    };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();
pokeball.prototype = new Drawable();
pokemon.prototype = new Drawable();




function pokeball() {

    this.iniX = 2;
    this.iniY = -20;
    this.speedX = this.iniX;
    this.speedY = this.iniY;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.inhand = 1;

    this.draw = function () {
        this.context.clearRect(this.x, this.y, this.width, this.height);

        if (KEY_STATUS.space||this.inhand ==0) {
            this.inhand = 0;
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;


        }
        if (this.x >= pokeball.prototype.canvasWidth || (this.y > landPos && this.gravitySpeed > 5)) {
            this.inhand = 1;
        }
        else{
            this.context.drawImage(imageRepository.pokeball, this.x, this.y);
        }
    };
    
}

function pokemon() {
    this.alive = false; // Is true if the bullet is currently in use
    /*
	 * Sets the bullet values
	 */
    this.spawn = function (speed) {
        if (speed > 0) {

        }
        else {

            this.x = bgpokemon.prototype.canvasWidth - this.x;
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
        this.context.clearRect(this.x, this.y, this.width, this.height);
        this.x += this.speed;
        if (this.x <= 0 - this.width || this.x >= pokemon.prototype.canvasWidth + this.width) {
            return true;
        }
        else {
            this.context.drawImage(imageRepository.pokemon, this.x, this.y);
        }
    };
    /*
	 * Resets the bullet values
	 */
    this.clear = function () {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
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
    this.pokeball = new Image();
    this.pokemon = new Image();
    // Set images src
    this.background.src = "Asset/pokemon/background.png";
    this.pokeball.src = "Asset/pokemon/Pokeball.png";
    this.pokemon.src = "Asset/pokemon/pokemon.gif";
    this.pokemon.width = 100;
    this.pokemon.height = 100;
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
    requestAnimFrame(animate);
    game.background.draw();
    game.pokeballComponent.draw();
    game.pokemonComponent.draw();
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


// Callback function invoked on successful 
// completion of the page method.
function OnSucceeded(result, userContext, methodName) {
    //alert(result);
    window.alert(result.d);
    console.log(10);

}

// Callback function invoked on failure 
// of the page method.
function OnFailed(error, userContext, methodName) {
    window.alert(6 + 6);
    console.log(1000);

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

