const Obstacle = require("./obstacle");
const Helicopter = require("./helicopter");
const Util = require("./util");



class Game {
  constructor() {
  this.obstacles = [];
  this.helicopter = [];
  this.difficulty = 0.95;
  this.addObstacles();
  }


  add(object) {
    if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof Helicopter) {
      this.helicopter.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  adjustDifficulty() {
    this.difficulty -= 0.00001
  }

  addObstacles() {
    let fits = true
    for (let i = 0; i < Game.NUM_OBSTACLES; i++) {
      if (Math.random() > this.difficulty){
        const newObstacle = new Obstacle({ game: this })
        for (var j = 0; j < this.obstacles.length; j++) {
          const otherObstacle = this.obstacles[j];
          if (newObstacle.isCollidedWith(otherObstacle)) {
            fits = false
            j = this.obstacles.length
          }
        }
        if (fits === true) {
          this.add(newObstacle);
        }
      }
    }
  }

  addHelicopter() {
    const helicopter = new Helicopter({
      pos: this.randomPosition(),
      game: this
    });
    this.add(helicopter);
    return helicopter;
  }

  generateObstacleY() {
    let dy
    let works = false
    let dist
    while (works === false) {
      dy = Game.DIM_Y * Math.random()
      works = true
      for (var i = 0; i < this.obstacles.length; i++) {
        if (this.obstacles[i].pos[1] > Util.DIM_X - 5) {
          dist = Math.abs(dy - this.obstacles[i].pos[1]);
          if (dist <= (this.obstacles[i].radius * 2) ) {
            if (Math.abs(dy + 50 - this.obstacles[i].pos[1])<= (this.obstacles[i].radius * 2) ) {
              dy+= 50
              i = 0
            } else if ( Math.abs(dy - 50 - this.obstacles[i].pos[1]) <= (this.obstacles[i].radius * 2) ) {
              dy -= 50
              i = 0
            } else {
              debugger
              works = false
              i = this.obstacles.length
            }
          }
        }
      }
    }
    return dy
  }
  randomObstaclePosition() {
    return [
      Game.DIM_X,
      Game.DIM_Y * Math.random()
    ];
  }

  randomPosition() {
    return [
      Game.DIM_X * 0.25,
      Game.DIM_Y * Math.random()
    ];
  }

  allObjects() {
  return [].concat(this.helicopter, this.obstacles);
  }


  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length -1; i++) {
      for (let j = i+1 ; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);

        }
      }
    }
  }

  step(delta) {
  this.moveObjects(delta);
  this.checkCollisions();
  this.addObstacles()
  this.adjustDifficulty()
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
  }

  remove(object) {
    if (object instanceof Obstacle) {
      this.obstacles.splice(this.obstacles.indexOf(object), 1);
    } else if (object instanceof Helicopter) {
      this.helicopter.splice(this.helicopter.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
};

Game.BG_COLOR = "#000000";
Game.DIM_X = Util.DIM_X;
Game.DIM_Y = Util.DIM_Y;
Game.FPS = 64;
Game.NUM_OBSTACLES = 1;


module.exports = Game;
