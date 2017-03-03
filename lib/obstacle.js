const Util = require("./util");
const MovingObject = require("./moving_object");
const helicopter = require("./helicopter");

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 25,
	SPEED: 4
};

class Obstacle extends MovingObject {
  constructor(options = {}) {
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos || options.game.randomObstaclePosition();
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
		super(options);
  }

  collideWith(otherObject) {
    if (otherObject instanceof helicopter) {
      otherObject.relocate()
      return true
    } else {
				const temp = this.vel[1]
				this.vel[1] = otherObject.vel[1]
				otherObject.vel[1] = temp * -1
		}
  }

	isCollidedWith(otherObject) {
		const centerDist = Util.dist(this.pos, otherObject.pos);
		return centerDist <= (this.radius + otherObject.radius);
	}
}

module.exports = Obstacle;


// if (this.pos[1] > otherObject.pos[1]) {
// 	// in this case, otherObject is higher
// 	if (otherObject.vel[1] > 0) {
// 		this.vel[1] = otherObject.vel[1]
// 	} else {
// 		this.vel[1] = otherObject.vel[1] * -1
// 	}
// } else {
// 	// in this case, this is higher
// 	if (temp[1] > 0) {
// 		otherObject.vel[1] = temp[1] * -1
// 	} else {
// 		otherObject.vel[1] = temp[1]
// 	}
// }
