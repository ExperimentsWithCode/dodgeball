const MovingObject = require("./moving_object");
const Util = require("./util");
const key = require('keymaster')

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class helicopter extends MovingObject {
  constructor(options) {
    options.radius = helicopter.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || randomColor();
    super(options);
  }


  power(impulse) {
    debugger
    if (impulse === "boost") {
      this.vel[0] = this.vel[0] * 2;
      this.vel[1] = this.vel[1] * 2;
    } else {
      this.vel[0] = impulse[0];
      this.vel[1] = impulse[1];
    }
  }

  relocate() {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  }
}

helicopter.RADIUS = 15;
module.exports = helicopter;