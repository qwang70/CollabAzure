var myGameArea =  {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.height = 270;
    this.canvas.width = 480;
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);
    this.backgroud = new Image();
    this.backgroud.src = 'background.png';
    this.backgroud.onload = function() {
      myGameArea.ctx.drawImage(this, 0, 0);
    };
  }
};

function startGame() {
  myGameArea.start();
  var pokeBall = new gameComponentFromImg(20,20,40,40, 'pokeball.png');
}

function updateGame() {

}

function gameComponentFromImg(startX, startY, width, height, src) {
  this.x = startX;
  this.y = startY;
  this.width = width;
  this.height = height;
  this.image = new Image();
  this.image.src = src;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function() {
    var ctx = myGameArea.ctx;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  };
}

startGame();
