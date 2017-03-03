const Obstacle = require("./obstacle");
const Helicopter = require("./helicopter");
const Util = require("./util");



class Game {
  constructor() {
  this.obstacles = [];
  this.helicopter = [];
  this.difficulty = 0.99;
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
    for (let i = 0; i < Game.NUM_OBSTACLES; i++) {
      if (Math.random() > this.difficulty){
        this.add(new Obstacle({ game: this }));
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
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
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
Game.FPS = 32;
Game.NUM_OBSTACLES = 1;


module.exports = Game;
