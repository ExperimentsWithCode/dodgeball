const key = require('keymaster')

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.helicopter = this.game.addHelicopter();
    this.SELECTION = SELECTION.bind(this)
  }

  start() {
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }


  animate(time) {
    if (this.game.over === false) {
      const timeDelta = time - this.lastTime;
      const helicopter = this.helicopter;
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      helicopter.power(MOVES())
    } else {
      this.game.draw(this.ctx);
      let input = SELECTION()

      if (input === 0) {
        this.game.reset()
        this.helicopter = this.game.addHelicopter();
      } else if (input === 1 || input === -1 ) { this.game.adjustSetting(input) }
    }
    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

}
const standardSpeed = 5
const MOVES = () => {
  let velocity =  [0,0]
  if (KEYS.left || KEYS.a){
    velocity[0] -= standardSpeed
  }
  if (KEYS.right || KEYS.d){
    velocity[0] += standardSpeed
  }
  if (KEYS.up || KEYS.w){
    velocity[1] -= standardSpeed
  }

  if (KEYS.down || KEYS.s){
    velocity[1] += standardSpeed
  }

  if (KEYS.space){
    velocity[0] *= 2
    velocity[1] *= 2
  }
  return velocity
};


const SELECTION = () => {
  if (KEYS.left || KEYS.a){
    KEYS.left = false;
    KEYS.a = false;
    return -1
  }
  else if (KEYS.right || KEYS.d){
    KEYS.right = false;
    KEYS.d = false;
    return 1
  }
  else if (KEYS.space){
    return 0
  }
  return ""
};

var KEYS = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      a: false,
      s: false,
      d: false,
      w: false,
  };

window.KEYS = KEYS
window.onkeydown = function(e) {
  var kc = e.keyCode;
  if ([37, 38, 39, 40, 32, 65, 83, 68, 87].includes(kc)){
    e.preventDefault();
    if      (kc === 37) KEYS.left = true;  // only one key per event
    else if (kc === 38) KEYS.up = true;    // so check exclusively
    else if (kc === 39) KEYS.right = true;
    else if (kc === 40) KEYS.down = true;
    else if (kc === 32) KEYS.space = true;
    else if (kc === 65) KEYS.a = true;
    else if (kc === 83) KEYS.s = true;
    else if (kc === 68) KEYS.d = true;
    else if (kc === 87) KEYS.w = true;
  }
};

window.onkeyup = function(e) {
  var kc = e.keyCode;
  if ([37, 38, 39, 40, 32, 65, 83, 68, 87].includes(kc)){
    e.preventDefault();
    if      (kc === 37) KEYS.left = false;
    else if (kc === 38) KEYS.up = false;
    else if (kc === 39) KEYS.right = false;
    else if (kc === 40) KEYS.down = false;
    else if (kc === 32) KEYS.space = false;
    else if (kc === 65) KEYS.a = false;
    else if (kc === 83) KEYS.s = false;
    else if (kc === 68) KEYS.d = false;
    else if (kc === 87) KEYS.w = false;
  }
};



module.exports = GameView;
