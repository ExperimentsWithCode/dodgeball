const Util = require("./util");

const NORMAL_FRAME_TIME_DELTA = 1000/60;

class Static_Object {
  constructor(options) {
    this.pos = [300, 300]//options.pos || 300;
    this.size = [30, 30]//options.size || 300;
    this.game = options.game;
    this.isWrappable = false;
  }

  collideWith(otherObject) {
    this.remove()
  }


  draw(ctx) {
    ctx.fillStyle =  "#DD443C"; //#FFF000
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true
    );
    ctx.fill();
    var image = new Image();
    image.src = "./img/sportsDrink.png";
    ctx.drawImage(image, 0, 0, 500, 500, this.pos[0] - (this.size[0]/2), this.pos[1] - (this.size[1]/2), 30, 30);
    // ctx.drawImage(image, 0, 0, 1000, 1000, 300, 300, 30, 30);


  }


  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  remove() {
  this.game.remove(this);
  }
}


module.exports = Static_Object;
