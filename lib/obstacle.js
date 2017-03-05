const Util = require("./util");
const MovingObject = require("./moving_object");
const helicopter = require("./helicopter");

const DEFAULTS = {
	COLOR: "#505050",
	RADIUS: 15,
	SPEED: 4
};


function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Obstacle extends MovingObject {
  constructor(options = {}) {
    options.color = randomColor();
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
				const thisVelY = this.vel[1]
				const otherVelY = otherObject.vel[1]
				// if (otherObject.vel[1] > 0) {
				// 	if (this.vel[1] > 0) {
				// 		//both +
				// 		this.vel[1] = otherVelY
				// 		otherObject.vel[1] = thisVelY
				// 	} else {
				// 		//other +, this -
				// 		this.vel[1] = otherVelY * -1
				// 		otherObject.vel[1] = thisVelY * -1
				// 	}
				// } else {
				// 	if (this.vel[1] > 0) {
				// 		//other -, this +
				// 		this.vel[1] = otherVelY * -1
				// 		otherObject.vel[1] = thisVelY * -1
				// 		console.log("COLLISION")
				// 		console.log(thisVelY)
				// 		console.log(this.vel[1])
				// 		console.log(otherVelY)
				// 		console.log(otherObject.vel[1] )
				// 	} else {
				// 		//both -
				// 		this.vel[1] = otherVelY
				// 		otherObject.vel[1] = thisVelY
				// 	}
				// }
				this.vel[1] = otherVelY
				otherObject.vel[1] = thisVelY
				// this.vel[1] = otherObject.vel[1]
				// otherObject.vel[1] = temp * -1
		}
  }

	isCollidedWith(otherObject) {
		const centerDist = Util.dist(this.pos, otherObject.pos);
		return centerDist <= (this.radius + otherObject.radius);
	}

	draw(ctx) {
		const image = document.getElementById('dodgeball');


		// ctx.fillStyle = this.color;
		//
		// ctx.beginPath();
		// ctx.arc(
		// 	this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
		// );
		// ctx.fill();
		ctx.drawImage(image, 0, 0, 500, 500, this.pos[0] - this.radius, this.pos[1] - this.radius, 43, 43);
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
