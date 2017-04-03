const MovingObject = require("./moving_object");
const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}
// [[15, 145], [120, 15], [15, 15] , [120, 270], [15, 270]]
const spriteWalk = [[15, 15], [120, 270], [15, 270], [15, 15], [120, 15], [15, 145]]
const spriteStill = [[15, 15]]

class player extends MovingObject {
  constructor(options) {
    options.radius = player.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = "#FFF";
    super(options);
    this.spriteIndex = 0
  }


  power(impulse) {
    if (impulse === "boost") {
      this.vel[0] = this.vel[0] * 2;
      this.vel[1] = this.vel[1] * 2;
    } else {
      this.vel[0] = impulse[0];
      this.vel[1] = impulse[1];
    }
  }


  calcAngle() {
    let angle
    let xOffset
    let yOffset
    if (this.vel[0] > 0){
      // + X  movement
      if (this.vel[1] > 0){
        // + Y  movement ~
        angle = 135
        xOffset = 1.3
        yOffset = 0.1
      } else if  (this.vel[1] < 0){
        // - Y  movement UP ~
        angle = 45
        xOffset = -0.1
        yOffset = 1.3
      } else {
        // no Y  movement ~
        angle = 90
        xOffset = 1
        yOffset = 1
      }

    } else if (this.vel[0] < 0){
      // - X movement
      if (this.vel[1] > 0){
        // + Y  movement ~
        angle = 225
        xOffset = 0.1
        yOffset = -1.3
      } else if  (this.vel[1] < 0){
        // - Y  movement UP
        angle = 315
        xOffset = -1.3
        yOffset = -0.1
      } else {
        // no Y  movement ~
        angle = 270
        xOffset = - 1
        yOffset = -1
      }
    } else {
      // no X movement
      if (this.vel[1] > 0){
        // + Y  movement ~
        angle = 180
        xOffset = 1
        yOffset = -1
      } else if  (this.vel[1] < 0){
        // - Y  movement UP ~
        angle = 0
        xOffset =  -1
        yOffset =  1
      } else {
        // no Y  movement ~
        angle = 90
        xOffset =  1
        yOffset =  1
      }
    }
    return [angle, xOffset, yOffset]
  }

  speedAdjuster() {
    return ((Math.abs(this.vel[0]) > 5) ||
        (Math.abs(this.vel[1]) > 5)) ? 1 : 0.3;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    const anglePack = this.calcAngle()
    ctx.save();
    ctx.translate(this.pos[0] + anglePack[1] * 35, this.pos[1] - anglePack[2] * 35);
    ctx.rotate(anglePack[0]  * Math.PI / 180);
    const spritePos = (this.vel[0] === this.vel[1] && this.vel[0] === 0 ) ? spriteStill  : spriteWalk
    this.spriteIndex = (this.spriteIndex + this.speedAdjuster()) % spritePos.length
    const idx = Math.floor(this.spriteIndex)
    ctx.fill();
    var image = new Image();
		image.src = "./img/walking2.png";
    ctx.drawImage(image, spritePos[idx][0], spritePos[idx][1], 120, 120, 0, 0, 70, 70);
    ctx.restore();
  }

  keepOnBoard(dimX, dimY){
    this.pos[0] = this.pos[0] > dimX ? dimX : this.pos[0]
    this.pos[0] = this.pos[0] < 0 ? 0 : this.pos[0]
    this.pos[1] = this.pos[1] > dimY ? dimY : this.pos[1]
    this.pos[1] = this.pos[1] < 0 ? 0 : this.pos[1]

  }
}

player.RADIUS = 32;
module.exports = player;
