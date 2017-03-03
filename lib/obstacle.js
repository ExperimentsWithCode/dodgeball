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
        otherObject.relocate();
            return true;
      }
    }
}

module.exports = Obstacle;
