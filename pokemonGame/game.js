//TODO display the canvas when all the resources are loaded

var pokeballComponent;
var pokemon;

var myGameArea =  {
  canvas: document.createElement('canvas'),
  start: function(canvasWidth, canvasHeight) {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.backgroud = new Image();
    this.backgroud.src = 'background.png';
    this.backgroud.onload = function() {
      myGameArea.ctx.drawImage(this, 0, 0);
    this.intervalID = setInterval(updateGame, 20);
    };
  }
}; 

var gameboard = {
  digit1: 0,
  digit2: 0,
  digit3: 0,
  digit4: 0,

  init: function() {
    this.digitOne = Image();
    tihs.digitOne.src = 'one.jpeg';
  },

  update: function() {
  
  },
};

function startGame() {
  var canvasWidth = 480;
  var canvasHeight = 270;
  var pokemonStart = 100;
  pokeballComponent = new pokeball(
    20, canvasHeight - 60, 40, 'Pokeball.png');
  pokemon = new gameComponentFromImg(
    canvasWidth/2, pokemonStart, 80, 'pokemon.gif');
  myGameArea.start(canvasWidth, canvasHeight);
}

function updateGame() {
  pokeballComponent.update();
  //pokemon.update();
  //gameboard.update();
}

function gameComponentFromImg(startX, startY, size, src) {
  this.x = startX;
  this.y = startY;

  this.image = new Image();
  this.image.src = src;
  this.image.parent = this;
  this.isLoaded = false;
  this.width = size;
  this.speedX = 0;
  this.speedY = 0;
  
  this.image.onload = function() {
   //set the height of the image  
    this.parent.isLoaded = true;
    this.parent.height = this.parent.width * (this.height/this.width);
  };

  this.newPosition = function() {};
  
  this.draw = function() {
    //redraw the component
    var ctx = myGameArea.ctx;
    if (this.isLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  };

  this.update = function() {
    this.newPosition();
    this.draw(); 
  };
}

function pokeball(startX, startY, size, src) {
  this.prototype = new gameComponentFromImg(
    startX, startY, size, src);
  this.iniX = 2;
  this.iniY = -10;
  this.speedX = this.iniX;
  this.speedY = this.iniY;
  this.gravity = 2;
  this.gravitySpeed = 0;

  this.prototype.newPosition = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
  };
}

startGame();
