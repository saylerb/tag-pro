/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _game = __webpack_require__(1);

	var _game2 = _interopRequireDefault(_game);

	var _keyboard = __webpack_require__(9);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	var _map = __webpack_require__(10);

	var _map2 = _interopRequireDefault(_map);

	var _mapBlueprint = __webpack_require__(11);

	var _mapBlueprint2 = _interopRequireDefault(_mapBlueprint);

	var _dom = __webpack_require__(12);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var dom = new _dom2.default();
	var game = new _game2.default();
	var gameCounter = 0;
	var timeLimit = 3600;

	setStage();
	initTotalScores();
	displayTotalScores();

	requestAnimationFrame(function gameLoop() {

	  if (game.running && gameCounter < timeLimit) {
	    gameCounter++;
	    renderTimeBar();
	    game.update(gameCounter);
	    game.draw();
	  } else if (gameCounter === timeLimit) {
	    gameCounter++;
	    writeTotalScores(game);
	    displayTotalScores();
	  } else {
	    dom.showMenu();
	    dom.hideGame();
	  }
	  requestAnimationFrame(gameLoop);
	});

	function renderTimeBar() {
	  var timeCanvas = document.getElementById('time-bar');
	  var timeContext = timeCanvas.getContext('2d');

	  timeContext.clearRect(0, 0, timeCanvas.width, timeCanvas.height);
	  timeContext.beginPath();

	  timeContext.fillStyle = "#d3d3d3";
	  timeContext.fillRect(0, 0, timeCanvas.width, timeCanvas.height);
	  timeContext.fillStyle = "green";

	  timeContext.fillRect(0, 0, timeCanvas.width * (1 - gameCounter / timeLimit), timeCanvas.height);
	}

	function setStage() {
	  console.log("Setting stage");
	  Array.from(dom.buttons).forEach(function (button) {
	    dom.listenOn(button, 'click', function (event) {
	      gameCounter = 0;
	      dom.hide(event.currentTarget.parentNode);
	      dom.showGame();
	      prepareGame(dom.level(event), dom.canvas);
	    });
	  });
	}

	function displayTotalScores() {
	  document.querySelector("#red-total").innerHTML = localStorage.getItem('redTotal');
	  document.querySelector("#blue-total").innerHTML = localStorage.getItem('blueTotal');
	}

	function initTotalScores() {
	  localStorage.getItem('redTotal') || localStorage.setItem('redTotal', 0);
	  localStorage.getItem('blueTotal') || localStorage.setItem('blueTotal', 0);
	}

	function writeTotalScores(game) {

	  if (game && game.collisionDetector.redScore > game.collisionDetector.blueScore) {
	    alert("Red Won!");
	    localStorage.setItem('redTotal', parseInt(localStorage.getItem('redTotal')) + 1);
	  } else if (game && game.collisionDetector.redScore < game.collisionDetector.blueScore) {
	    alert("Blue Won!");
	    localStorage.setItem('blueTotal', parseInt(localStorage.getItem('blueTotal')) + 1);
	  } else {
	    alert("Tie Game!");
	  }
	}

	function prepareGame(mapLevel) {
	  var keys = new _keyboard2.default().listenForEvents();
	  var blueprint = new _mapBlueprint2.default()[mapLevel];
	  var map = new _map2.default(blueprint);

	  canvas.setAttribute("width", map.cols * map.tsize + 'px');
	  canvas.setAttribute("height", map.rows * map.tsize + 'px');

	  game = new _game2.default(context, canvas, keys, map, blueprint);
	  game.init();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _player = __webpack_require__(2);

	var _player2 = _interopRequireDefault(_player);

	var _flag = __webpack_require__(3);

	var _flag2 = _interopRequireDefault(_flag);

	var _spike = __webpack_require__(4);

	var _spike2 = _interopRequireDefault(_spike);

	var _collisionDetector = __webpack_require__(5);

	var _collisionDetector2 = _interopRequireDefault(_collisionDetector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(context, canvas, keyboard, map, blueprint) {
	    _classCallCheck(this, Game);

	    this.canvas = canvas;
	    this.context = context;
	    this.keyboard = keyboard;
	    this.map = map;
	    this.players = [];
	    this.flags = [];
	    this.blueprint = blueprint;
	    this.spikes = [];
	    this.collisionDetector = {};
	    this.running = false;
	  }

	  _createClass(Game, [{
	    key: 'init',
	    value: function init() {
	      var self = this;
	      self.running = true;

	      self.players.push(new _player2.default(self.map, self.blueprint.redPlayerOptions));
	      self.players.push(new _player2.default(self.map, self.blueprint.bluePlayerOptions));

	      self.flags.push(new _flag2.default(self.blueprint.blueFlagOptions));
	      self.flags.push(new _flag2.default(self.blueprint.redFlagOptions));

	      if (self.blueprint.spikes) {
	        self.blueprint.spikes.forEach(function (spikeOptions) {
	          self.spikes.push(new _spike2.default(spikeOptions));
	        });
	      }
	      self.collisionDetector = new _collisionDetector2.default(self.players, self.flags, self.spikes);
	    }
	  }, {
	    key: 'update',
	    value: function update(game_counter) {
	      var _this = this;

	      this.updateScoreboard();
	      this.players.forEach(function (player) {
	        return player.move(_this.keyboard.keys);
	      });
	      this.spikes.forEach(function (spike) {
	        return spike.move(game_counter);
	      });
	      this.collisionDetector.checkAllCollisions();
	    }
	  }, {
	    key: 'updateScoreboard',
	    value: function updateScoreboard() {
	      document.querySelector("#red-score").innerHTML = this.collisionDetector.redScore;
	      document.querySelector("#blue-score").innerHTML = this.collisionDetector.blueScore;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this2 = this;

	      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.map.render(this.context);
	      this.flags.forEach(function (flag) {
	        return flag.draw(_this2.context);
	      });
	      this.spikes.forEach(function (spike) {
	        return spike.draw(_this2.context);
	      });
	      this.players.forEach(function (player) {
	        return player.draw(_this2.context);
	      });
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Player = function () {
	  function Player(map) {
	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var _ref$x = _ref.x;
	    var x = _ref$x === undefined ? 100 : _ref$x;
	    var _ref$y = _ref.y;
	    var y = _ref$y === undefined ? 100 : _ref$y;
	    var _ref$radius = _ref.radius;
	    var radius = _ref$radius === undefined ? 20 : _ref$radius;
	    var _ref$color = _ref.color;
	    var color = _ref$color === undefined ? 'blue' : _ref$color;
	    var _ref$controls = _ref.controls;
	    var controls = _ref$controls === undefined ? 'arrows' : _ref$controls;
	    var _ref$acceleration = _ref.acceleration;
	    var acceleration = _ref$acceleration === undefined ? 0.1 : _ref$acceleration;

	    _classCallCheck(this, Player);

	    this.spawnPosition = { x: x, y: y };
	    this.x = x;
	    this.y = y;
	    this.dx = 0;
	    this.dy = 0;
	    this.radius = radius;
	    this.color = color;
	    this.playerImg = this.loadPlayerImage();
	    this.controls = controls;
	    this.map = map;
	    this.hasFlag = false;
	    this.acceleration = acceleration;
	    this.frozen = false;
	  }

	  _createClass(Player, [{
	    key: 'loadPlayerImage',
	    value: function loadPlayerImage() {
	      var playerImg = new Image();
	      playerImg.src = './lib/assets/tiles.png';
	      return playerImg;
	    }
	  }, {
	    key: 'determinePlayerTilePxl',
	    value: function determinePlayerTilePxl() {
	      if (this.color === 'blue') {
	        return 600;
	      } else if (this.color === 'red') {
	        return 560;
	      }
	    }
	  }, {
	    key: 'determineFlagTilePxl',
	    value: function determineFlagTilePxl() {
	      if (this.color === 'blue') {
	        return 560;
	      } else if (this.color === 'red') {
	        return 600;
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      context.drawImage(this.playerImg, this.determinePlayerTilePxl(), 0, this.map.tsize, this.map.tsize, this.x - this.radius, this.y - this.radius, this.map.tsize, this.map.tsize);
	      if (this.hasFlag) {
	        context.drawImage(this.playerImg, this.determineFlagTilePxl(), 40, this.map.tsize, this.map.tsize, this.x - 20, this.y - 20, this.map.tsize, this.map.tsize);
	      }
	      if (this.frozen) {
	        context.drawImage(this.playerImg, 480, 0, this.map.tsize, this.map.tsize, this.x - 20, this.y - 20, this.map.tsize, this.map.tsize);
	      }
	    }
	  }, {
	    key: 'accelerate',
	    value: function accelerate(keys) {
	      var acceleration = this.acceleration;
	      if (!this.frozen) {
	        if (this.controls === 'arrows') {
	          if (keys.leftArrow) {
	            this.dx -= acceleration;
	          }
	          if (keys.upArrow) {
	            this.dy -= acceleration;
	          }
	          if (keys.rightArrow) {
	            this.dx += acceleration;
	          }
	          if (keys.downArrow) {
	            this.dy += acceleration;
	          }
	        } else {
	          if (keys.A) {
	            this.dx -= acceleration;
	          }
	          if (keys.W) {
	            this.dy -= acceleration;
	          }
	          if (keys.D) {
	            this.dx += acceleration;
	          }
	          if (keys.S) {
	            this.dy += acceleration;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'decelerate',
	    value: function decelerate() {
	      var drag = 0.975;
	      this.dx *= drag;
	      this.dy *= drag;
	    }
	  }, {
	    key: 'move',
	    value: function move(keys) {
	      this.accelerate(keys);
	      this.decelerate();
	      this.x += this.dx;
	      this.y += this.dy;
	      this.wallCollision();
	    }
	  }, {
	    key: 'wallCollision',
	    value: function wallCollision() {
	      var _this = this;

	      var thetas = [].concat(_toConsumableArray(Array(72).keys())).map(function (x) {
	        return x * 5 * (Math.PI / 180);
	      });
	      var force = 0.1;

	      thetas.forEach(function (theta) {
	        if (_this.map.isWallCollision(_this.x + _this.radius * Math.cos(theta), _this.y + _this.radius * Math.sin(theta))) {
	          _this.dx -= force * Math.cos(theta);
	          _this.dy -= force * Math.sin(theta);
	        }
	      });
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Flag = function () {
	  function Flag(options) {
	    _classCallCheck(this, Flag);

	    this.x = options.x;
	    this.y = options.y;
	    this.color = options.color;
	    this.flagImage = this.loadFlagImage();
	    this.tsize = options.tsize;
	    this.isCaptured = false;
	  }

	  _createClass(Flag, [{
	    key: 'loadFlagImage',
	    value: function loadFlagImage() {
	      var flagImg = new Image();
	      flagImg.src = './lib/assets/tiles.png';
	      return flagImg;
	    }
	  }, {
	    key: 'determineFlagYTilePxl',
	    value: function determineFlagYTilePxl() {
	      if (this.isCaptured) {
	        return 80;
	      } else {
	        return 40;
	      }
	    }
	  }, {
	    key: 'determineFlagXTilePxl',
	    value: function determineFlagXTilePxl() {
	      if (this.color === 'blue') {
	        return 600;
	      } else if (this.color === 'red') {
	        return 560;
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      context.drawImage(this.flagImage, this.determineFlagXTilePxl(), this.determineFlagYTilePxl(), this.tsize, this.tsize, this.x - this.tsize / 2, this.y - this.tsize / 2, this.tsize, this.tsize);
	    }
	  }]);

	  return Flag;
	}();

	exports.default = Flag;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Spike = function () {
	  function Spike(options) {
	    _classCallCheck(this, Spike);

	    this.x = options.x;
	    this.y = options.y;
	    this.originY = options.y;
	    this.tsize = options.tsize;
	    this.moving = options.moving || false;
	    this.amplitude = options.amplitude || 40;
	  }

	  _createClass(Spike, [{
	    key: 'move',
	    value: function move(game_counter) {
	      if (this.moving) {
	        this.y = this.originY + this.amplitude * Math.sin((game_counter + this.x % 360) * (Math.PI / 180));
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(context) {
	      context.drawImage(this.spriteSheet, this.SpikeXTilePxl, this.SpikeYTilePxl, this.tsize, this.tsize, this.x - this.tsize / 2, this.y - this.tsize / 2, this.tsize, this.tsize);
	    }
	  }, {
	    key: 'spriteSheet',
	    get: function get() {
	      var spikeImg = new Image();
	      spikeImg.src = './lib/assets/tiles.png';
	      return spikeImg;
	    }
	  }, {
	    key: 'SpikeYTilePxl',
	    get: function get() {
	      return 0;
	    }
	  }, {
	    key: 'SpikeXTilePxl',
	    get: function get() {
	      return 480;
	    }
	  }]);

	  return Spike;
	}();

	exports.default = Spike;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ballCollisions = __webpack_require__(6);

	var _ballCollisions2 = _interopRequireDefault(_ballCollisions);

	var _flagCollisions = __webpack_require__(7);

	var _flagCollisions2 = _interopRequireDefault(_flagCollisions);

	var _spikeCollisions = __webpack_require__(8);

	var _spikeCollisions2 = _interopRequireDefault(_spikeCollisions);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CollisionDectector = function () {
	  function CollisionDectector(players, flags, spikes) {
	    _classCallCheck(this, CollisionDectector);

	    this.ballCollisions = new _ballCollisions2.default(players, flags);
	    this.flagCollisions = new _flagCollisions2.default(players, flags);
	    this.spikeCollisions = new _spikeCollisions2.default(players, flags, spikes);
	  }

	  _createClass(CollisionDectector, [{
	    key: 'checkBallCollisions',
	    value: function checkBallCollisions() {
	      this.ballCollisions.testCollisions();
	    }
	  }, {
	    key: 'checkSpikeCollisions',
	    value: function checkSpikeCollisions() {
	      this.spikeCollisions.testCollisions();
	    }
	  }, {
	    key: 'checkFlagStatuses',
	    value: function checkFlagStatuses() {
	      this.flagCollisions.testGrabbed();
	      this.flagCollisions.testCaptured();
	    }
	  }, {
	    key: 'checkAllCollisions',
	    value: function checkAllCollisions() {
	      this.checkBallCollisions();
	      this.checkSpikeCollisions();
	      this.checkFlagStatuses();
	    }
	  }, {
	    key: 'redScore',
	    get: function get() {
	      return this.flagCollisions.scoreBoard.red;
	    }
	  }, {
	    key: 'blueScore',
	    get: function get() {
	      return this.flagCollisions.scoreBoard.blue;
	    }
	  }, {
	    key: 'scores',
	    get: function get() {
	      return { red: this.flagCollisions.scoreBoard.red, blue: this.flagCollisions.scoreBoard.blue };
	    }
	  }]);

	  return CollisionDectector;
	}();

	exports.default = CollisionDectector;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BallCollisions = function () {
	  function BallCollisions(players, flags) {
	    _classCallCheck(this, BallCollisions);

	    this.playerPairs = this.pairwise(players);
	    this.flags = flags;
	  }

	  _createClass(BallCollisions, [{
	    key: 'pairwise',
	    value: function pairwise(list) {
	      var pairs = [];
	      list.slice(0, list.length - 1).forEach(function (first, n) {
	        var tail = list.slice(n + 1, list.length);
	        tail.forEach(function (item) {
	          pairs.push([first, item]);
	        });
	      });
	      return pairs;
	    }
	  }, {
	    key: 'testCollisions',
	    value: function testCollisions() {
	      var _this = this;

	      this.playerPairs.forEach(function (pair) {
	        var ball1 = pair[0];
	        var ball2 = pair[1];

	        var bdx = ball1.x - ball2.x;
	        var bdy = ball1.y - ball2.y;
	        var bdr = ball1.radius + ball2.radius;

	        if (bdx * bdx + bdy * bdy < bdr * bdr) {
	          var theta = Math.atan2(bdy, bdx);
	          var force = bdr - Math.sqrt(bdx * bdx + bdy * bdy);
	          ball1.dx += force * Math.cos(theta);
	          ball2.dx -= force * Math.cos(theta);
	          ball1.dy += force * Math.sin(theta);
	          ball2.dy -= force * Math.sin(theta);

	          _this.returnFlag(ball1, ball2);
	        }
	      });
	    }
	  }, {
	    key: 'returnFlag',
	    value: function returnFlag(ball1, ball2) {
	      if (ball1.color !== ball2.color) {
	        if (ball1.hasFlag) {
	          ball1.hasFlag = false;
	          var returnedFlag = this.determineFlagToReturn(ball1);
	          returnedFlag.isCaptured = false;
	        }
	        if (ball2.hasFlag) {
	          ball2.hasFlag = false;
	          var _returnedFlag = this.determineFlagToReturn(ball2);
	          _returnedFlag.isCaptured = false;
	        }
	      }
	    }
	  }, {
	    key: 'determineFlagToReturn',
	    value: function determineFlagToReturn(ball) {
	      if (ball.color === 'blue') {
	        return this.flags[1];
	      } else {
	        return this.flags[0];
	      }
	    }
	  }]);

	  return BallCollisions;
	}();

	exports.default = BallCollisions;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FlagCollisions = function () {
	  function FlagCollisions(players, flags) {
	    _classCallCheck(this, FlagCollisions);

	    this.players = players;
	    this.blueFlag = flags[0];
	    this.redFlag = flags[1];
	    this.touchRadius = 20;
	    this.scoreBoard = { red: 0, blue: 0 };
	  }

	  _createClass(FlagCollisions, [{
	    key: 'testGrabbed',
	    value: function testGrabbed() {
	      var _this = this;

	      this.bluePlayers.forEach(function (player) {
	        var flag = _this.redFlag;
	        if (!flag.isCaptured && _this.checkWithinRadius(player, flag)) {
	          player.hasFlag = true;
	          flag.isCaptured = true;
	        }
	      });

	      this.redPlayers.forEach(function (player) {
	        var flag = _this.blueFlag;
	        if (!flag.isCaptured && _this.checkWithinRadius(player, flag)) {
	          player.hasFlag = true;
	          flag.isCaptured = true;
	        }
	      });
	    }
	  }, {
	    key: 'testCaptured',
	    value: function testCaptured() {
	      var _this2 = this;

	      this.bluePlayers.forEach(function (player) {
	        if (player.hasFlag) {
	          var homeFlag = _this2.blueFlag;
	          var targetFlag = _this2.redFlag;
	          if (_this2.checkWithinRadius(player, homeFlag)) {
	            player.hasFlag = false;
	            targetFlag.isCaptured = false;
	            _this2.scoreBoard.blue++;
	          }
	        }
	      });

	      this.redPlayers.forEach(function (player) {
	        if (player.hasFlag) {
	          var homeFlag = _this2.redFlag;
	          var targetFlag = _this2.blueFlag;
	          if (_this2.checkWithinRadius(player, homeFlag)) {
	            player.hasFlag = false;
	            targetFlag.isCaptured = false;
	            _this2.scoreBoard.red++;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'checkWithinRadius',
	    value: function checkWithinRadius(player, flag) {
	      if (player.x >= flag.x - this.touchRadius && player.x <= flag.x + this.touchRadius && player.y <= flag.y + this.touchRadius && player.y >= flag.y - this.touchRadius) {
	        return true;
	      }
	    }
	  }, {
	    key: 'bluePlayers',
	    get: function get() {
	      return this.players.filter(function (player) {
	        return player.color === 'blue';
	      });
	    }
	  }, {
	    key: 'redPlayers',
	    get: function get() {
	      return this.players.filter(function (player) {
	        return player.color === 'red';
	      });
	    }
	  }]);

	  return FlagCollisions;
	}();

	exports.default = FlagCollisions;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SpikeCollisions = function () {
	  function SpikeCollisions(players, flags, spikes) {
	    _classCallCheck(this, SpikeCollisions);

	    this.players = players;
	    this.flags = flags;
	    this.spikes = spikes;
	    this.touchRadius = 30;
	  }

	  _createClass(SpikeCollisions, [{
	    key: 'testCollisions',
	    value: function testCollisions() {
	      var _this = this;

	      this.players.forEach(function (player) {
	        _this.spikes.forEach(function (spike) {
	          if (_this.checkWithinRadius(player, spike)) {
	            _this.respawnPlayer(player);

	            if (player.hasFlag) {
	              _this.returnFlag(player);
	            }
	          }
	        });
	      });
	    }
	  }, {
	    key: 'checkWithinRadius',
	    value: function checkWithinRadius(player, spike) {
	      if (player.x >= spike.x - this.touchRadius && player.x <= spike.x + this.touchRadius && player.y <= spike.y + this.touchRadius && player.y >= spike.y - this.touchRadius) {
	        return true;
	      }
	    }
	  }, {
	    key: 'respawnPlayer',
	    value: function respawnPlayer(player) {
	      player.x = player.spawnPosition.x;
	      player.y = player.spawnPosition.y;
	      player.dx = 0;
	      player.dy = 0;
	      player.frozen = true;
	      setTimeout(function () {
	        player.frozen = false;
	      }, 2000);
	    }
	  }, {
	    key: 'returnFlag',
	    value: function returnFlag(player) {
	      player.hasFlag = false;
	      if (player.color === 'blue') {
	        this.flags[1].isCaptured = false;
	      } else {
	        this.flags[0].isCaptured = false;
	      }
	    }
	  }]);

	  return SpikeCollisions;
	}();

	exports.default = SpikeCollisions;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	  function Keyboard() {
	    _classCallCheck(this, Keyboard);

	    this.keys = {
	      "leftArrow": false,
	      "upArrow": false,
	      "rightArrow": false,
	      "downArrow": false,
	      "A": false,
	      "W": false,
	      "D": false,
	      "S": false
	    };
	  }

	  _createClass(Keyboard, [{
	    key: "listenForEvents",
	    value: function listenForEvents() {
	      window.addEventListener('keydown', this.onKeyDown.bind(this));
	      window.addEventListener('keyup', this.onKeyUp.bind(this));
	      return this;
	    }
	  }, {
	    key: "isKeyPressed",
	    value: function isKeyPressed() {
	      var flag = false;
	      for (var prop in this.keys) {
	        if (this.keys[prop]) {
	          flag = true;
	        }
	      }
	      return flag;
	    }
	  }, {
	    key: "onKeyDown",
	    value: function onKeyDown(event) {
	      var that = this.keys;
	      switch (event.keyCode) {
	        case 37:
	          that.leftArrow = true;
	          break;
	        case 38:
	          that.upArrow = true;
	          break;
	        case 39:
	          that.rightArrow = true;
	          break;
	        case 40:
	          that.downArrow = true;
	          break;
	        case 65:
	          that.A = true;
	          break;
	        case 87:
	          that.W = true;
	          break;
	        case 68:
	          that.D = true;
	          break;
	        case 83:
	          that.S = true;
	          break;
	      }
	    }
	  }, {
	    key: "onKeyUp",
	    value: function onKeyUp(event) {
	      var that = this.keys;

	      switch (event.keyCode) {
	        case 37:
	          that.leftArrow = false;
	          break;
	        case 38:
	          that.upArrow = false;
	          break;
	        case 39:
	          that.rightArrow = false;
	          break;
	        case 40:
	          that.downArrow = false;
	          break;
	        case 65:
	          that.A = false;
	          break;
	        case 87:
	          that.W = false;
	          break;
	        case 68:
	          that.D = false;
	          break;
	        case 83:
	          that.S = false;
	          break;
	      }
	    }
	  }]);

	  return Keyboard;
	}();

	exports.default = Keyboard;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	  function Map(blueprint) {
	    _classCallCheck(this, Map);

	    this.cols = blueprint.columns, this.rows = blueprint.rows, this.tsize = blueprint.tsize;
	    this.tiles = blueprint.tiles;
	    this.barriers = blueprint.barriers;
	    this.tilesImg = this.loadTileImage();
	  }

	  _createClass(Map, [{
	    key: 'convertXYtoTileIndex',
	    value: function convertXYtoTileIndex(x, y) {
	      var col = Math.floor(x / this.tsize);
	      var row = Math.floor(y / this.tsize);
	      return row * this.cols + col;
	    }
	  }, {
	    key: 'getTileValueAtXY',
	    value: function getTileValueAtXY(x, y) {
	      return this.tiles[this.convertXYtoTileIndex(x, y)];
	    }
	  }, {
	    key: 'isWallCollision',
	    value: function isWallCollision(x, y) {
	      var tileValue = this.getTileValueAtXY(x, y);
	      return this.barriers.some(function (barrier) {
	        return barrier === tileValue;
	      });
	    }
	  }, {
	    key: 'loadTileImage',
	    value: function loadTileImage() {
	      var tilesImg = new Image();
	      tilesImg.src = './lib/assets/tiles.png';
	      return tilesImg;
	    }
	  }, {
	    key: 'getTile',
	    value: function getTile(col, row) {
	      return this.tiles[row * this.cols + col];
	    }
	  }, {
	    key: 'render',
	    value: function render(context) {
	      for (var c = 0; c < this.cols; c++) {
	        for (var r = 0; r < this.rows; r++) {
	          var tile = this.getTile(c, r);
	          if (tile !== 0) {
	            // 0 => empty tile
	            context.drawImage(this.tilesImg, // image
	            (tile - 1) % 16 * this.tsize, // source x
	            Math.floor((tile - 1) / 16) * this.tsize, // source y
	            this.tsize, // source width
	            this.tsize, // source height
	            c * this.tsize, // target x
	            r * this.tsize, // target y
	            this.tsize, // target width
	            this.tsize // target height
	            );
	          }
	        }
	      }
	    }
	  }]);

	  return Map;
	}();

	exports.default = Map;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapBlueprint = function MapBlueprint() {
	  _classCallCheck(this, MapBlueprint);

	  this.tsize = 40;
	  this.barriers = [92, 53, 164, 56, 81, 168, 165, 1];

	  this.level_one = {
	    tsize: this.tsize,
	    tiles: [53, 164, 164, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 1, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 1, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 78, 78, 92, 168, 164, 164, 164, 164, 164, 164, 164, 164, 165],
	    barriers: this.barriers,
	    columns: 10,
	    rows: 10,
	    blueFlagOptions: { color: 'blue', x: 75, y: 75, tsize: this.tsize },
	    redFlagOptions: { color: 'red', x: 325, y: 325, tsize: this.tsize },
	    bluePlayerOptions: { x: 110, y: 110, color: 'blue',
	      controls: 'wasd', acceleration: 0.1 },
	    redPlayerOptions: { x: 290, y: 290, color: 'red',
	      controls: 'arrows', acceleration: 0.1 }
	  };

	  this.level_two = {
	    tsize: this.tsize,
	    tiles: [53, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 168, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 165],
	    spikes: [{ x: 140, y: 140, tsize: this.tsize }, { x: 140, y: 500, tsize: this.tsize }, { x: 420, y: 140, tsize: this.tsize }, { x: 420, y: 500, tsize: this.tsize }, { x: 580, y: 140, tsize: this.tsize }, { x: 580, y: 500, tsize: this.tsize }, { x: 860, y: 140, tsize: this.tsize }, { x: 860, y: 500, tsize: this.tsize }],
	    barriers: this.barriers,
	    columns: 25,
	    rows: 16,
	    blueFlagOptions: { color: 'blue', x: 170, y: 320, tsize: this.tsize },
	    redFlagOptions: { color: 'red', x: 830, y: 320, tsize: this.tsize },
	    bluePlayerOptions: { x: 110, y: 320, color: 'blue', controls: 'wasd' },
	    redPlayerOptions: { x: 890, y: 320, color: 'red', controls: 'arrows' }
	  };

	  this.level_three = {
	    tsize: this.tsize,
	    tiles: [53, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 1, 1, 1, 78, 78, 78, 1, 78, 78, 78, 1, 1, 1, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 1, 1, 1, 78, 78, 78, 1, 78, 78, 78, 1, 1, 1, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 168, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 165],
	    spikes: [{ x: 140, y: 140, tsize: this.tsize, moving: true, amplitude: 20 }, { x: 140, y: 500, tsize: this.tsize, moving: true, amplitude: 20 }, { x: 420, y: 140, tsize: this.tsize, moving: true }, { x: 420, y: 500, tsize: this.tsize, moving: true }, { x: 580, y: 140, tsize: this.tsize, moving: true }, { x: 580, y: 500, tsize: this.tsize, moving: true }, { x: 860, y: 140, tsize: this.tsize, moving: true, amplitude: 20 }, { x: 860, y: 500, tsize: this.tsize, moving: true, amplitude: 20 }],
	    barriers: this.barriers,
	    columns: 25,
	    rows: 16,
	    blueFlagOptions: { color: 'blue', x: 170, y: 320, tsize: this.tsize },
	    redFlagOptions: { color: 'red', x: 830, y: 320, tsize: this.tsize },
	    bluePlayerOptions: { x: 110, y: 320, color: 'blue', controls: 'wasd' },
	    redPlayerOptions: { x: 890, y: 320, color: 'red', controls: 'arrows' }
	  };
	};

	exports.default = MapBlueprint;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dom = function () {
	  function Dom() {
	    _classCallCheck(this, Dom);
	  }

	  _createClass(Dom, [{
	    key: "showMenu",
	    value: function showMenu() {
	      document.querySelector('div.start-menu').style.display = 'block';
	      document.querySelectorAll('button.start-button').forEach(function (button) {
	        return button.style.display = 'block';
	      });
	      document.getElementById('total-score-container').style.display = 'flex';
	    }
	  }, {
	    key: "level",
	    value: function level(event) {
	      return event.currentTarget.getAttribute("id");
	    }
	  }, {
	    key: "listenOn",
	    value: function listenOn(element, type, fn) {
	      element.addEventListener(type, fn);
	    }
	  }, {
	    key: "hide",
	    value: function hide(element) {
	      element.style.display = 'none';
	    }
	  }, {
	    key: "hideScoreboard",
	    value: function hideScoreboard() {
	      this.scoreBoard.style.visibility = 'hidden';
	    }
	  }, {
	    key: "makeVisible",
	    value: function makeVisible(element) {
	      element.style.visibility = "visible";
	    }
	  }, {
	    key: "display",
	    value: function display(element) {
	      element.style.display = 'block';
	    }
	  }, {
	    key: "hideGame",
	    value: function hideGame() {
	      var _this = this;

	      Array.from(this.canvases).forEach(function (canvas) {
	        return _this.hide(canvas);
	      });
	      this.hideScoreboard();
	    }
	  }, {
	    key: "showGame",
	    value: function showGame() {
	      var _this2 = this;

	      Array.from(this.canvases).forEach(function (canvas) {
	        return _this2.display(canvas);
	      });
	      this.makeVisible(this.scoreBoard);
	      this.hide(document.getElementById('total-score-container'));
	    }
	  }, {
	    key: "buttons",
	    get: function get() {
	      return document.querySelectorAll("button.start-button");
	    }
	  }, {
	    key: "canvases",
	    get: function get() {
	      return document.querySelectorAll("canvas.game-canvas");
	    }
	  }, {
	    key: "scoreBoard",
	    get: function get() {
	      return document.getElementById('score-board-container');
	    }
	  }]);

	  return Dom;
	}();

	exports.default = Dom;

/***/ }
/******/ ]);