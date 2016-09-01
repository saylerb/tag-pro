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

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _player = __webpack_require__(2);

	var _player2 = _interopRequireDefault(_player);

	var _keyboard = __webpack_require__(3);

	var _keyboard2 = _interopRequireDefault(_keyboard);

	var _map = __webpack_require__(4);

	var _map2 = _interopRequireDefault(_map);

	var _ballCollisions = __webpack_require__(5);

	var _ballCollisions2 = _interopRequireDefault(_ballCollisions);

	var _flagCollisions = __webpack_require__(6);

	var _flagCollisions2 = _interopRequireDefault(_flagCollisions);

	var _flag = __webpack_require__(7);

	var _flag2 = _interopRequireDefault(_flag);

	var _mapBlueprint = __webpack_require__(8);

	var _mapBlueprint2 = _interopRequireDefault(_mapBlueprint);

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
	  }

	  _createClass(Game, [{
	    key: 'run',
	    value: function run() {
	      var self = this;

	      self.players.push(new _player2.default(self.blueprint.redPlayerOptions, self.map));
	      self.players.push(new _player2.default(self.blueprint.bluePlayerOptions, self.map));

	      self.flags.push(new _flag2.default(self.blueprint.blueFlagOptions));
	      self.flags.push(new _flag2.default(self.blueprint.redFlagOptions));

	      var ballCollisions = new _ballCollisions2.default(self.players, self.flags);
	      var flagCollisions = new _flagCollisions2.default(self.players, self.flags);

	      requestAnimationFrame(function gameLoop() {

	        var score = 'Red: ' + flagCollisions.scoreBoard.red + ', Blue: ' + flagCollisions.scoreBoard.blue;
	        document.querySelector("#score-board").innerHTML = score;

	        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

	        self.players.forEach(function (player) {
	          return player.move(self.keyboard.keys);
	        });

	        ballCollisions.testCollisions();

	        flagCollisions.testGrabbed();
	        flagCollisions.testCaptured();

	        self.map.render(self.context);
	        self.flags.forEach(function (flag) {
	          return flag.draw(self.context);
	        });
	        self.players.forEach(function (player) {
	          return player.draw(self.context);
	        });

	        requestAnimationFrame(gameLoop);
	      });
	    }
	  }]);

	  return Game;
	}();

	window.onload = function () {
	  var canvas = document.getElementById('game');
	  var context = canvas.getContext('2d');
	  var keys = new _keyboard2.default().listenForEvents();
	  var blueprint = new _mapBlueprint2.default().level_one;
	  var map = new _map2.default(blueprint); // indicate map to use

	  canvas.setAttribute("width", map.cols * map.tsize + 'px');
	  canvas.setAttribute("height", map.rows * map.tsize + 'px');

	  new Game(context, canvas, keys, map, blueprint).run();
	};

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
	  function Player() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
	    var map = arguments[1];

	    _classCallCheck(this, Player);

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
	      if (this.color == 'blue') {
	        return 600;
	      } else if (this.color == 'red') {
	        return 560;
	      }
	    }
	  }, {
	    key: 'determineFlagTilePxl',
	    value: function determineFlagTilePxl() {
	      if (this.color == 'blue') {
	        return 560;
	      } else if (this.color == 'red') {
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
	    }
	  }, {
	    key: 'accelerate',
	    value: function accelerate(keys) {
	      var acceleration = 0.1;
	      if (this.controls == 'arrows') {
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
	      var thetas = [].concat(_toConsumableArray(Array(72).keys())).map(function (x) {
	        return x * 5 * (Math.PI / 180);
	      });
	      var force = 0.1;

	      thetas.forEach(function (theta) {
	        if (this.map.isWallCollision(this.x + this.radius * Math.cos(theta), this.y + this.radius * Math.sin(theta))) {
	          this.dx -= force * Math.cos(theta);
	          this.dy -= force * Math.sin(theta);
	        }
	      }.bind(this));
	    }
	  }]);

	  return Player;
	}();

	exports.default = Player;

/***/ },
/* 3 */
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
/* 4 */
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
	    this.tilesImg = this.loadTileImage();
	    this.barriers = [92, 53, 164, 56, 81, 168, 165, 1];
	    this.redFlagOptions = blueprint.redFlagOptions;
	    this.blueFlagOptions = blueprint.blueFlagOptions;
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
	        return barrier == tileValue;
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
/* 5 */
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
	      if (ball.color == 'blue') {
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
/* 6 */
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

	    this.bluePlayers = this.getBluePlayers(players);
	    this.redPlayers = this.getRedPlayers(players);
	    this.blueFlag = flags[0];
	    this.redFlag = flags[1];
	    this.touchRadius = 20;
	    this.scoreBoard = { red: 0, blue: 0 };
	  }

	  _createClass(FlagCollisions, [{
	    key: 'getBluePlayers',
	    value: function getBluePlayers(players) {
	      return players.filter(function (player) {
	        return player.color == 'blue';
	      });
	    }
	  }, {
	    key: 'getRedPlayers',
	    value: function getRedPlayers(players) {
	      return players.filter(function (player) {
	        return player.color == 'red';
	      });
	    }
	  }, {
	    key: 'testGrabbed',
	    value: function testGrabbed() {
	      var _this = this;

	      var radius = this.touchRadius;
	      this.bluePlayers.forEach(function (player) {
	        var flag = _this.redFlag;
	        if (!flag.isCaptured && player.x <= flag.x + radius && player.x >= flag.x && player.y <= flag.y + radius && player.y >= flag.y - radius) {
	          player.hasFlag = true;
	          flag.isCaptured = true;
	        }
	      });

	      this.redPlayers.forEach(function (player) {
	        var flag = _this.blueFlag;
	        if (!flag.isCaptured && player.x <= flag.x + radius && player.x >= flag.x && player.y <= flag.y + radius && player.y >= flag.y - radius) {
	          player.hasFlag = true;
	          flag.isCaptured = true;
	        }
	      });
	    }
	  }, {
	    key: 'testCaptured',
	    value: function testCaptured() {
	      var _this2 = this;

	      var radius = this.touchRadius;
	      this.bluePlayers.forEach(function (player) {
	        if (player.hasFlag) {
	          var homeFlag = _this2.blueFlag;
	          var targetFlag = _this2.redFlag;
	          if (player.x <= homeFlag.x + radius && player.x >= homeFlag.x && player.y <= homeFlag.y + radius && player.y >= homeFlag.y - radius) {
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
	          if (player.x <= homeFlag.x + radius && player.x >= homeFlag.x && player.y <= homeFlag.y + radius && player.y >= homeFlag.y - radius) {
	            player.hasFlag = false;
	            targetFlag.isCaptured = false;
	            _this2.scoreBoard.red++;
	          }
	        }
	      });
	    }
	  }]);

	  return FlagCollisions;
	}();

	exports.default = FlagCollisions;

/***/ },
/* 7 */
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
	      if (this.color == 'blue') {
	        return 600;
	      } else if (this.color == 'red') {
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
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MapBlueprint = function MapBlueprint() {
	  _classCallCheck(this, MapBlueprint);

	  this.tsize = 40;
	  this.test = {
	    tsize: this.tsize,
	    tiles: [53, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 1, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 168, 164, 164, 164, 164, 164, 164, 165],
	    columns: 8,
	    rows: 8,
	    blueFlagOptions: { color: 'blue', x: 150, y: 150, tsize: this.tsize },
	    redFlagOptions: { color: 'red', x: 250, y: 250, tsize: this.tsize },
	    bluePlayerOptions: { x: 150, y: 150, color: 'blue', controls: 'wasd' },
	    redPlayerOptions: { x: 100, y: 100, color: 'red', controls: 'arrows' }
	  };

	  this.level_one = {
	    tsize: this.tsize,
	    tiles: [53, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 1, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 81, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 81, 168, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 165],
	    columns: 25,
	    rows: 16,
	    blueFlagOptions: { color: 'blue', x: 200, y: 320, tsize: this.tsize },
	    redFlagOptions: { color: 'red', x: 840, y: 320, tsize: this.tsize },
	    bluePlayerOptions: { x: 150, y: 200, color: 'blue', controls: 'wasd' },
	    redPlayerOptions: { x: 760, y: 400, color: 'red', controls: 'arrows' }
	  };
	};

	exports.default = MapBlueprint;

/***/ }
/******/ ]);