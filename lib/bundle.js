/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Util = {
  // Normalize the length of the vector to 1, maintaining direction.
  dir: function dir(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  // Find distance between two points.
  dist: function dist(pos1, pos2) {
    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
  },

  // Find the length of the vector.
  norm: function norm(vec) {
    return Util.dist([0, 0], vec);
  },

  // Return a randomly oriented vector with the given length.
  randomVec: function randomVec(length) {
    var verticalVec = Math.random() / 2;
    if (Math.random() > 0.5) {
      verticalVec *= -1;
    }
    return Util.scale([-1, verticalVec], length);
  },


  // Scale the length of a vector by the given amount.
  scale: function scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },
  wrap: function wrap(coord, max) {
    if (coord < 0) {
      return max - coord % max;
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};
Util.DIM_X = 1000;
Util.DIM_Y = 800;
module.exports = Util;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

var Moving_Object = function () {
  function Moving_Object(options) {
    _classCallCheck(this, Moving_Object);

    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = false;
  }

  _createClass(Moving_Object, [{
    key: "collideWith",
    value: function collideWith(otherObject) {
      this.game.over = true;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }, {
    key: "isCollidedWith",
    value: function isCollidedWith(otherObject) {
      var centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < this.radius + otherObject.radius;
    }
  }, {
    key: "move",
    value: function move(timeDelta) {
      //timeDelta is number of milliseconds since last move
      //if the computer is busy the time delta will be larger
      //in this case the MovingObject should move farther in this frame
      //velocity of object is how far it should move in 1/60th of a second
      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
          offsetX = this.vel[0] * velocityScale,
          offsetY = this.vel[1] * velocityScale;

      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

      if (this.game.isOutOfBounds(this.pos)) {
        if (this.isWrappable) {
          this.pos = this.game.wrap(this.pos);
        } else {
          this.remove();
        }
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return Moving_Object;
}();

module.exports = Moving_Object;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovingObject = __webpack_require__(1);
var Util = __webpack_require__(0);

function randomColor() {
  var hexDigits = "0123456789ABCDEF";

  var color = "#";
  for (var i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
}
// [[15, 145], [120, 15], [15, 15] , [120, 270], [15, 270]]
var spriteWalk = [[15, 15], [120, 270], [15, 270], [15, 15], [120, 15], [15, 145]];
var spriteStill = [[15, 15]];

var player = function (_MovingObject) {
  _inherits(player, _MovingObject);

  function player(options) {
    _classCallCheck(this, player);

    options.radius = player.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = "#FFF";

    var _this = _possibleConstructorReturn(this, (player.__proto__ || Object.getPrototypeOf(player)).call(this, options));

    _this.spriteIndex = 0;
    return _this;
  }

  _createClass(player, [{
    key: "power",
    value: function power(impulse) {
      if (impulse === "boost") {
        this.vel[0] = this.vel[0] * 2;
        this.vel[1] = this.vel[1] * 2;
      } else {
        this.vel[0] = impulse[0];
        this.vel[1] = impulse[1];
      }
    }
  }, {
    key: "calcAngle",
    value: function calcAngle() {
      var angle = void 0;
      var xOffset = void 0;
      var yOffset = void 0;
      if (this.vel[0] > 0) {
        // + X  movement
        if (this.vel[1] > 0) {
          // + Y  movement ~
          angle = 135;
          xOffset = 1.3;
          yOffset = 0.1;
        } else if (this.vel[1] < 0) {
          // - Y  movement UP ~
          angle = 45;
          xOffset = -0.1;
          yOffset = 1.3;
        } else {
          // no Y  movement ~
          angle = 90;
          xOffset = 1;
          yOffset = 1;
        }
      } else if (this.vel[0] < 0) {
        // - X movement
        if (this.vel[1] > 0) {
          // + Y  movement ~
          angle = 225;
          xOffset = 0.1;
          yOffset = -1.3;
        } else if (this.vel[1] < 0) {
          // - Y  movement UP
          angle = 315;
          xOffset = -1.3;
          yOffset = -0.1;
        } else {
          // no Y  movement ~
          angle = 270;
          xOffset = -1;
          yOffset = -1;
        }
      } else {
        // no X movement
        if (this.vel[1] > 0) {
          // + Y  movement ~
          angle = 180;
          xOffset = 1;
          yOffset = -1;
        } else if (this.vel[1] < 0) {
          // - Y  movement UP ~
          angle = 0;
          xOffset = -1;
          yOffset = 1;
        } else {
          // no Y  movement ~
          angle = 90;
          xOffset = 1;
          yOffset = 1;
        }
      }
      return [angle, xOffset, yOffset];
    }
  }, {
    key: "speedAdjuster",
    value: function speedAdjuster() {
      return Math.abs(this.vel[0]) > 5 || Math.abs(this.vel[1]) > 5 ? 1 : 0.3;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
      var anglePack = this.calcAngle();
      ctx.save();
      ctx.translate(this.pos[0] + anglePack[1] * 35, this.pos[1] - anglePack[2] * 35);
      ctx.rotate(anglePack[0] * Math.PI / 180);
      var spritePos = this.vel[0] === this.vel[1] && this.vel[0] === 0 ? spriteStill : spriteWalk;
      this.spriteIndex = (this.spriteIndex + this.speedAdjuster()) % spritePos.length;
      var idx = Math.floor(this.spriteIndex);
      ctx.fill();
      var image = new Image();
      image.src = "./img/walking2.png";
      ctx.drawImage(image, spritePos[idx][0], spritePos[idx][1], 120, 120, 0, 0, 70, 70);
      ctx.restore();
    }
  }, {
    key: "keepOnBoard",
    value: function keepOnBoard(dimX, dimY) {
      this.pos[0] = this.pos[0] > dimX ? dimX : this.pos[0];
      this.pos[0] = this.pos[0] < 0 ? 0 : this.pos[0];
      this.pos[1] = this.pos[1] > dimY ? dimY : this.pos[1];
      this.pos[1] = this.pos[1] < 0 ? 0 : this.pos[1];
    }
  }]);

  return player;
}(MovingObject);

player.RADIUS = 32;
module.exports = player;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = __webpack_require__(5);
var Player = __webpack_require__(2);
var Util = __webpack_require__(0);
var Static_Object = __webpack_require__(6);

var SETTING_OPTIONS = ["Freshman", "Sophomore", "Junior", "Senior", "Super Senior"];

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.obstacles = [];
    this.player = [];
    this.difficulty = 0.01;
    this.setting = 0;
    this.over = true;
    this.gameOverCounter = 100;
    this.score = 0;
    this.highscore = 0;
    this.addObstacles();
  }

  _createClass(Game, [{
    key: "reset",
    value: function reset() {
      this.over = false;
      this.obstacles = [];
      this.player = [];
      this.difficulty = 0.01;
      this.gameOverCounter = 0;
      this.addObstacles();
      if (this.score > this.highscore) {
        this.highscore = this.score;
      }
      this.score = 0;
    }
  }, {
    key: "adjustSetting",
    value: function adjustSetting(adjustment) {
      adjustment += this.setting;
      if (adjustment < 0) {
        adjustment = 0;
      } else if (adjustment > 4) {
        adjustment = 4;
      }
      this.setting = adjustment;
    }
  }, {
    key: "add",
    value: function add(object) {
      if (object instanceof Obstacle) {
        this.obstacles.push(object);
      } else if (object instanceof Player) {
        this.player.push(object);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: "renderScore",
    value: function renderScore(ctx) {
      ctx.fillText("Score:", 125, 375);
      ctx.fillText(Math.floor(this.score), 280, 375);
      this.renderBullet(ctx, 355);
      if (this.highscore > this.score) {
        this.renderHighScore(ctx);
      }
    }
  }, {
    key: "renderHighScore",
    value: function renderHighScore(ctx) {
      ctx.fillText("High Score:", 125, 275);
      ctx.fillText(Math.floor(this.highscore), 380, 275);
      this.renderBullet(ctx, 250);
    }
  }, {
    key: "renderBullet",
    value: function renderBullet(ctx, dy) {
      var dx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

      ctx.beginPath();
      ctx.arc(dx, dy, 10, 0, 2 * Math.PI, true);
      ctx.fill();
    }
  }, {
    key: "renderInstructions",
    value: function renderInstructions(ctx) {
      ctx.fillText("Instructions:    Don't get hit!!!", 125, 675);
      ctx.font = '38px  "Pangolin", cursive';
      ctx.fillText("     Arrow keys or WASD keys to move", 125, 720);
      ctx.fillText("     Space bar to sprint", 125, 770);
      this.renderBullet(ctx, 650);
    }
  }, {
    key: "homeScreen",
    value: function homeScreen(ctx, background) {
      ctx.fillStyle = "#DD443C";
      background.src = "./img/notebookpaper.jpg";
      ctx.drawImage(background, -13, -112);
      ctx.font = '100px  "Permanent Marker", cursive';
      ctx.fillText("Dodgeball", Game.DIM_X / 2 - 230, 180);
      ctx.font = '70px  "Permanent Marker", cursive';
      if (this.highscore < this.score) {
        ctx.fillText("High Score!!!", Game.DIM_X / 2 - 200, 260);
      }
      ctx.font = '48px  "Pangolin", cursive';
      ctx.fillStyle = "#DD443C";
      if (this.score >= 0) {
        this.renderScore(ctx);
      }
      ctx.fillText("Difficulty:", 125, 475);
      ctx.fillText((this.setting === 0 ? "  " : "<") + "  " + SETTING_OPTIONS[this.setting] + "  " + (this.setting === 4 ? " " : ">"), 340, 475);
      this.renderBullet(ctx, 450);
      ctx.fillText("Press \"Space\" to start", 125, 575);
      this.renderBullet(ctx, 550);
      this.renderInstructions(ctx);
    }
  }, {
    key: "gameScreen",
    value: function gameScreen(ctx, background) {
      background.src = "./img/basketballCourtFloor.png";
      ctx.drawImage(background, -13, -112);
      this.score += 1 / 8.0 * (this.setting + 1);
      this.allObjects().forEach(function (object) {
        object.draw(ctx);
      });
      ctx.fillStyle = "#F57C24";
      ctx.font = '48px  "Pangolin", cursive';
      ctx.fillText(Math.floor(this.score), 10, 50);
      ctx.font = '48px serif';
      ctx.fillText(SETTING_OPTIONS[this.setting], 740, 50);SETTING_OPTIONS;
      ctx.fillText("Level: " + Math.floor(this.difficulty * 100), 740, 770);SETTING_OPTIONS;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var background = new Image();
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      if (this.over === false) {
        this.gameScreen(ctx, background);
      } else {
        this.homeScreen(ctx, background);
        // const powerup = new Static_Object({ game: this })
        // powerup.draw(ctx)
      }
    }
  }, {
    key: "adjustDifficulty",
    value: function adjustDifficulty() {
      this.difficulty += 0.00001;
    }
  }, {
    key: "addObstacles",
    value: function addObstacles() {
      var fits = true;
      for (var i = 0; i < this.setting + 1; i++) {
        if (Math.random() < this.difficulty) {
          var newObstacle = new Obstacle({ game: this });
          for (var j = 0; j < this.obstacles.length; j++) {
            var otherObstacle = this.obstacles[j];
            if (newObstacle.isCollidedWith(otherObstacle)) {
              fits = false;
              j = this.obstacles.length;
            }
          }
          if (fits === true) {
            this.add(newObstacle);
          }
        }
      }
    }
  }, {
    key: "addPlayer",
    value: function addPlayer() {
      var player = new Player({
        pos: this.playerPosition(),
        game: this
      });
      this.add(player);
      return player;
    }
  }, {
    key: "randomObstaclePosition",
    value: function randomObstaclePosition() {
      return [Game.DIM_X, Game.DIM_Y * Math.random()];
    }
  }, {
    key: "playerPosition",
    value: function playerPosition() {
      return [365, 400];
    }
  }, {
    key: "allObjects",
    value: function allObjects() {
      return [].concat(this.player, this.obstacles);
    }
  }, {
    key: "checkCollisions",
    value: function checkCollisions() {
      var allObjects = this.allObjects();
      for (var i = 0; i < allObjects.length - 1; i++) {
        for (var j = i + 1; j < allObjects.length; j++) {
          var obj1 = allObjects[i];
          var obj2 = allObjects[j];

          if (obj1.isCollidedWith(obj2)) {
            var collision = obj1.collideWith(obj2);
          }
        }
      }
    }
  }, {
    key: "step",
    value: function step(delta) {
      this.moveObjects(delta);
      this.checkCollisions();
      this.addObstacles();
      this.adjustDifficulty();
    }
  }, {
    key: "isOutOfBounds",
    value: function isOutOfBounds(pos) {
      return pos[0] < 0 || pos[1] < 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y;
    }
  }, {
    key: "moveObjects",
    value: function moveObjects(delta) {
      this.allObjects().forEach(function (object) {
        object.move(delta);
      });
    }
  }, {
    key: "remove",
    value: function remove(object) {
      if (object instanceof Obstacle) {
        this.obstacles.splice(this.obstacles.indexOf(object), 1);
      } else if (object instanceof Player) {
        // this.over = true
        // this.player.splice(this.player.indexOf(object), 1);
        this.player[0].keepOnBoard(Game.DIM_X, Game.DIM_Y);
      } else {
        throw "unknown type of object";
      }
    }
  }, {
    key: "wrap",
    value: function wrap(pos) {
      return [Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)];
    }
  }]);

  return Game;
}();

;

Game.BG_COLOR = "#000000";
Game.DIM_X = Util.DIM_X;
Game.DIM_Y = Util.DIM_Y;
Game.FPS = 64;

module.exports = Game;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var key = __webpack_require__(7);

var GameView = function () {
  function GameView(game, ctx) {
    _classCallCheck(this, GameView);

    this.ctx = ctx;
    this.game = game;
    this.player = this.game.addPlayer();
    this.SELECTION = SELECTION.bind(this);
  }

  _createClass(GameView, [{
    key: "start",
    value: function start() {
      this.lastTime = 0;
      //start the animation
      requestAnimationFrame(this.animate.bind(this));
    }
  }, {
    key: "animate",
    value: function animate(time) {
      if (this.game.over === false) {
        var timeDelta = time - this.lastTime;
        var player = this.player;
        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;
        player.power(MOVES());
      } else {
        this.game.draw(this.ctx);
        var input = SELECTION();
        if (this.game.gameOverCounter > 64) {
          if (input === 0) {
            this.game.reset();
            this.player = this.game.addPlayer();
          } else if (input === 1 || input === -1) {
            this.game.adjustSetting(input);
          }
        } else {
          this.game.gameOverCounter += 1;
        }
      }
      //every call to animate requests causes another call to animate
      requestAnimationFrame(this.animate.bind(this));
    }
  }]);

  return GameView;
}();

var standardSpeed = 5;
var MOVES = function MOVES() {
  var velocity = [0, 0];
  if (KEYS.left || KEYS.a) {
    velocity[0] -= standardSpeed;
  }
  if (KEYS.right || KEYS.d) {
    velocity[0] += standardSpeed;
  }
  if (KEYS.up || KEYS.w) {
    velocity[1] -= standardSpeed;
  }

  if (KEYS.down || KEYS.s) {
    velocity[1] += standardSpeed;
  }

  if (KEYS.space) {
    velocity[0] *= 2;
    velocity[1] *= 2;
  }
  return velocity;
};

var SELECTION = function SELECTION() {
  if (KEYS.left || KEYS.a) {
    KEYS.left = false;
    KEYS.a = false;
    return -1;
  } else if (KEYS.right || KEYS.d) {
    KEYS.right = false;
    KEYS.d = false;
    return 1;
  } else if (KEYS.space) {
    return 0;
  }
  return "";
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
  w: false
};

window.KEYS = KEYS;
window.onkeydown = function (e) {
  var kc = e.keyCode;
  if ([37, 38, 39, 40, 32, 65, 83, 68, 87].includes(kc)) {
    e.preventDefault();
    if (kc === 37) KEYS.left = true; // only one key per event
    else if (kc === 38) KEYS.up = true; // so check exclusively
      else if (kc === 39) KEYS.right = true;else if (kc === 40) KEYS.down = true;else if (kc === 32) KEYS.space = true;else if (kc === 65) KEYS.a = true;else if (kc === 83) KEYS.s = true;else if (kc === 68) KEYS.d = true;else if (kc === 87) KEYS.w = true;
  }
};

window.onkeyup = function (e) {
  var kc = e.keyCode;
  if ([37, 38, 39, 40, 32, 65, 83, 68, 87].includes(kc)) {
    e.preventDefault();
    if (kc === 37) KEYS.left = false;else if (kc === 38) KEYS.up = false;else if (kc === 39) KEYS.right = false;else if (kc === 40) KEYS.down = false;else if (kc === 32) KEYS.space = false;else if (kc === 65) KEYS.a = false;else if (kc === 83) KEYS.s = false;else if (kc === 68) KEYS.d = false;else if (kc === 87) KEYS.w = false;
  }
};

module.exports = GameView;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = __webpack_require__(0);
var MovingObject = __webpack_require__(1);
var player = __webpack_require__(2);

var DEFAULTS = {
		COLOR: "#DD443C",
		RADIUS: 15,
		SPEED: 4
};

function randomColor() {
		var hexDigits = "0123456789ABCDEF";

		var color = "#";
		for (var i = 0; i < 3; i++) {
				color += hexDigits[Math.floor(Math.random() * 16)];
		}

		return color;
}

var Obstacle = function (_MovingObject) {
		_inherits(Obstacle, _MovingObject);

		function Obstacle() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_classCallCheck(this, Obstacle);

				options.color = DEFAULTS.COLOR;
				options.pos = options.pos || options.game.randomObstaclePosition();
				options.radius = DEFAULTS.RADIUS;
				options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
				return _possibleConstructorReturn(this, (Obstacle.__proto__ || Object.getPrototypeOf(Obstacle)).call(this, options));
		}

		_createClass(Obstacle, [{
				key: "collideWith",
				value: function collideWith(otherObject) {
						if (otherObject instanceof player) {
								otherObject.relocate();
								return true;
						} else {
								var thisVelY = this.vel[1];
								var otherVelY = otherObject.vel[1];
								this.vel[1] = otherVelY;
								otherObject.vel[1] = thisVelY;
						}
				}
		}, {
				key: "isCollidedWith",
				value: function isCollidedWith(otherObject) {
						var centerDist = Util.dist(this.pos, otherObject.pos);
						return centerDist <= this.radius + otherObject.radius;
				}
		}, {
				key: "draw",
				value: function draw(ctx) {
						var image = new Image();
						image.src = "./img/dodgeball.png";
						ctx.fillStyle = this.color;

						ctx.beginPath();
						ctx.arc(this.pos[0], this.pos[1], this.radius - 3, 0, 2 * Math.PI, true);
						ctx.fill();
						ctx.drawImage(image, 25, 25, 500, 500, this.pos[0] - this.radius, this.pos[1] - this.radius, 43, 43);
				}
		}]);

		return Obstacle;
}(MovingObject);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = __webpack_require__(0);

var NORMAL_FRAME_TIME_DELTA = 1000 / 60;

var Static_Object = function () {
  function Static_Object(options) {
    _classCallCheck(this, Static_Object);

    this.pos = [300, 300]; //options.pos || 300;
    this.size = [30, 30]; //options.size || 300;
    this.game = options.game;
    this.isWrappable = false;
  }

  _createClass(Static_Object, [{
    key: "collideWith",
    value: function collideWith(otherObject) {
      this.remove();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#DD443C"; //#FFF000
      ctx.beginPath();
      ctx.arc(this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true);
      ctx.fill();
      var image = new Image();
      image.src = "./img/sportsDrink.png";
      ctx.drawImage(image, 0, 0, 500, 500, this.pos[0] - this.size[0] / 2, this.pos[1] - this.size[1] / 2, 30, 30);
      // ctx.drawImage(image, 0, 0, 1000, 1000, 300, 300, 30, 30);

    }
  }, {
    key: "isCollidedWith",
    value: function isCollidedWith(otherObject) {
      var centerDist = Util.dist(this.pos, otherObject.pos);
      return centerDist < this.radius + otherObject.radius;
    }
  }, {
    key: "remove",
    value: function remove() {
      this.game.remove(this);
    }
  }]);

  return Static_Object;
}();

module.exports = Static_Object;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Game = __webpack_require__(3);
var GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function () {
  var canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  var ctx = canvasEl.getContext("2d");
  var game = new Game();
  new GameView(game, ctx).start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map