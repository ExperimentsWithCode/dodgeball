const key = require('keymaster')

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.helicopter = this.game.addHelicopter();
  }

  bindKeyHandlers() {
    const helicopter = this.helicopter;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, (key) => {
        debugger
        helicopter.power(move); });
    });

    key("space", () => { helicopter.power("boost") });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "w": [ 0, -4],
  "a": [-4,  0],
  "s": [ 0,  4],
  "d": [ 4,  0],
  "q": [ 0,  0],
  "up": [ 0, -4],
  "left": [-4,  0],
  "down": [ 0,  4],
  "right": [ 4,  0],
};

module.exports = GameView;
