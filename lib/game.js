const Obstacle = require("./obstacle");
const Player = require("./player");
const Util = require("./util");


const SETTING_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior", "Super Senior"]
class Game {
  constructor() {
  this.obstacles = [];
  this.player = [];
  this.difficulty = 0.01;
  this.setting = 0;
  this.over = true;
  this.gameOverCounter = 0;
  this.score = 0;
  this.highscore = 0;
  this.addObstacles();
  }

  reset(){
    this.over = false;
    this.obstacles = [];
    this.player = [];
    this.difficulty = 0.01;
    this.gameOverCounter = 0;
    this.addObstacles();
    if (this.score > this.highscore) { this.highscore = this.score }
    this.score = 0;
  }

  adjustSetting(adjustment){
    adjustment += this.setting
    if (adjustment < 0) {adjustment = 0}
    else if (adjustment > 4) {adjustment = 4}
    this.setting =  adjustment;
  };

  add(object) {
    if (object instanceof Obstacle) {
      this.obstacles.push(object);
    } else if (object instanceof Player) {
      this.player.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  renderScore(ctx){
    ctx.fillText("Score:", 125, 375);
    ctx.fillText(Math.floor(this.score), 280, 375);
    this.renderBullet(ctx, 355)
    if (this.highscore > this.score) { this.renderHighScore(ctx)}
  }

  renderHighScore(ctx){
    ctx.fillText("High Score:", 125, 275);
    ctx.fillText(Math.floor(this.highscore), 380, 275);
    this.renderBullet(ctx, 250)
  }

  renderBullet(ctx, dy, dx = 100){
    ctx.beginPath();
    ctx.arc(dx, dy, 10, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  renderInstructions(ctx){
    ctx.fillText("Instructions:    Don't get hit!!!", 125, 675);
    ctx.font = '38px  "Pangolin", cursive'
    ctx.fillText("     Arrow keys or WASD keys to move", 125, 720);
    ctx.fillText("     Space bar to sprint", 125, 770);
    this.renderBullet(ctx, 650)
  }
  homeScreen(ctx, background) {
    background.src = "./img/notebookpaper.jpg";
    ctx.drawImage(background,-13,-112 );
    ctx.font = '100px  "Permanent Marker", cursive';
    ctx.fillText("Dodgeball", (Game.DIM_X / 2) - 230, 180);
    ctx.font = '70px  "Permanent Marker", cursive';
    if (this.highscore < this.score) {
      ctx.fillText("High Score!!!", (Game.DIM_X / 2) - 200, 260);
    }
    ctx.font = '48px  "Pangolin", cursive'
    ctx.fillStyle = "#DD443C"
    if (this.score >= 0) { this.renderScore(ctx)}
    ctx.fillText(`Difficulty:`, 125, 475);
    ctx.fillText(
      `${this.setting === 0 ? "  " : "<"}  ${SETTING_OPTIONS[this.setting]}  ${this.setting === 4 ? " " : ">"}`,
         340, 475);
    this.renderBullet(ctx, 450)
    ctx.fillText(`Press "Space" to start`, 125, 575);
    this.renderBullet(ctx, 550)
    this.renderInstructions(ctx)
  }

  gameScreen(ctx, background) {
    background.src = "./img/basketballCourtFloor.png";
    ctx.drawImage(background,-13,-112 );
    this.score += (1/8.0) * (this.setting + 1)
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
    ctx.fillStyle = "#F57C24"
    ctx.font = '48px  "Pangolin", cursive'
    ctx.fillText(Math.floor(this.score), 10, 50);
    ctx.font = '48px serif';
    ctx.fillText(SETTING_OPTIONS[this.setting], 740, 50);SETTING_OPTIONS
    ctx.fillText(`Level: ${Math.floor((this.difficulty) * 100)}`, 740, 770);SETTING_OPTIONS
  }


  draw(ctx) {
    var background = new Image();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    if (this.over === false) {
      this.gameScreen(ctx, background)
    } else {
      this.homeScreen(ctx, background)
    }
  }

  adjustDifficulty() {
    this.difficulty += 0.00001
  }

  addObstacles() {
    let fits = true
    for (let i = 0; i < (this.setting + 1); i++) {
      if (Math.random() < this.difficulty){
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

  addPlayer() {
    const player = new Player({
      pos: this.playerPosition(),
      game: this
    });
    this.add(player);
    return player;
  }


  randomObstaclePosition() {
    return [
      Game.DIM_X,
      Game.DIM_Y * Math.random()
    ];
  }

  playerPosition() {
    return [
      365,
      400
    ];
  }

  allObjects() {
  return [].concat(this.player, this.obstacles);
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
    } else if (object instanceof Player) {
      this.over = true
      this.player.splice(this.player.indexOf(object), 1);
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


module.exports = Game;
