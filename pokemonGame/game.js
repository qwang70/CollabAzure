var pokeball;
var pokemon;;

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

function startGame() {
  var canvasWidth = 480;
  var canvasHeight = 270;
  var pokemonStart = 100;
  pokeball = new gameComponentFromImg(20, canvasHeight - 60, 40, 'Pokeball.png');
  pokemon = new gameComponentFromImg(canvasWidth/2, pokemonStart, 80, 'pokemon.gif');
  myGameArea.start(canvasWidth, canvasHeight);
}

function updateGame() {
  pokeball.update();
  pokemon.update();
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
    console.log(this.parent);
    this.parent.isLoaded = true;
    this.parent.height = this.parent.width * (this.height/this.width);
  }
  
  this.update = function() {
    var ctx = myGameArea.ctx;
    if (this.isLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  };
}

function pokeMonToPokeBallAnimation() {
  //make the pokemon white
  //morph it into a ball
  this.width = this.width - this.xMorphSpeed;
  this.hieight = this.height - this.yMorphSpeed;
  
  
}

startGame();
