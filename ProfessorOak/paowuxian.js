this.iniX = 0.3;
this.iniY = -3
this.speedX = iniX;
this.speedY = iniY;
this.x = x;
this.y = y;
this.gravity = 1;
this.gravitySpeed = 0;
this.landPos = 150;
this.ballPos = function () {
    //x = vt 
    //y -= g/2*(deltaT^2-0)+v0*deltaT
    this.draw = function () {//deletable
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }

    this.hitPokemon();
    if (this.hitOutlier()) {
        hideBall();
        nextBallEvent();
    }
};

this.hitPokemon = function(){
    //detect pokemon position
    //maybe the ball have to hit the head of the pokemon??
};

this.hitOutlier = function(){
    if (this.x >= width || (this.y > landPos && gravity > 2))//the last condition may change
        return true;
};