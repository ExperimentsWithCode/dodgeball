const Util = require("./util");

const NORMAL_FRAME_TIME_DELTA = 1000/60;

class Static_Object {
  constructor(options) {
    this.pos = options.pos;
    this.size = options.size;
    this.game = options.game;
    this.isWrappable = false;
  }

  collideWith(otherObject) {
    this.remove()
  }


  draw(ctx) {
    var image = new Image();
    image.src = "./img/sportsDrink.png";
    ctx.drawImage(image, 0, 0, 500, 500, this.pos[0] - this.size[0], this.pos[1] -  this.size[1], 43, 100);
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
