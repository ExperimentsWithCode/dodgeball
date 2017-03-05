const Obstacle = require("./obstacle");
const Helicopter = require("./helicopter");
const Util = require("./util");



class Game {
  constructor() {
  this.obstacles = [];
  this.helicopter = [];
  this.difficulty = 0.95;
  this.over = false
  this.score = 0
  this.highscore = 0
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

  homescreen(ctx, background) {
    background.src = "./img/notebookpaper.jpg";
    ctx.drawImage(background,-13,-112 );
    ctx.font = '48px  "Pangolin", cursive'
    ctx.fillStyle = "#DD443C"
    // if highscore, notify user
    if (this.highscore < this.score) {
      ctx.fillText(`High Score!!`, 200, 200);
      ctx.fillText(Math.floor(this.score), 200, 300);
    }

    ctx.font = '100px  "Permanent Marker", cursive';
    ctx.fillText("Dodgeball", (Game.DIM_X / 2) - 230, 180);
  }

  draw(ctx) {
      var background = new Image();
      background.src = "./img/basketballCourtFloor.png";
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

      if (this.over === false) {
        background.src = "./img/basketballCourtFloor.png";
        ctx.drawImage(background,-13,-112 );
        this.score += 1/8.0
        this.allObjects().forEach((object) => {
          object.draw(ctx);
        });
        ctx.fillStyle = "#F57C24"
        ctx.font = '48px  "Pangolin", cursive'
        ctx.fillText(Math.floor(this.score), 10, 50);
        ctx.font = '48px serif';
        ctx.fillText(this.difficulty, 800, 50);
    } else {
      this.homescreen(ctx, background)
    }
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
      this.over = true
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
Game.NUM_OBSTACLES = 2;


module.exports = Game;
