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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(context, canvas, keyboard, map) {
	    _classCallCheck(this, Game);

	    this.canvas = canvas;
	    this.context = context;
	    this.keyboard = keyboard;
	    this.map = map;
	    this.players = [];
	  }

	  _createClass(Game, [{
	    key: 'run',
	    value: function run() {
	      var self = this;

	      self.players.push(new _player2.default({ color: 'red', controls: 'arrows' }, self.map));
	      self.players.push(new _player2.default({ x: 150, y: 150, color: 'blue', controls: 'wasd' }, self.map));

	      requestAnimationFrame(function gameLoop() {

	        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

	        if (self.keyboard.isKeyPressed()) self.players.forEach(function (player) {
	          return player.move(self.keyboard.keys);
	        });

	        self.map.render(self.context);
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
	  var socket = io.connect();
	  var connectionCount = document.getElementById('connection-count');

	  socket.on('usersConnected', function (count) {
	    connectionCount.innerText = 'Connected Users: ' + count;
	  });

	  var canvas = document.getElementById('game');
	  var context = canvas.getContext('2d');
	  var keys = new _keyboard2.default().listenForEvents();
	  var map = new _map2.default();
	  new Game(context, canvas, keys, map).run();
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
	    this.radius = radius;
	    this.color = color;
	    this.playerImg = this.loadPlayerImage();
	    this.controls = controls;
	    this.map = map;
	  }

	  _createClass(Player, [{
	    key: 'loadPlayerImage',
	    value: function loadPlayerImage() {
	      var playerImg = new Image();
	      playerImg.src = './assets/tiles.png';
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
	    key: 'draw',
	    value: function draw(context) {
	      context.drawImage(this.playerImg, this.determinePlayerTilePxl(), 0, this.map.tsize, this.map.tsize, this.x - this.radius, this.y - this.radius, this.map.tsize, this.map.tsize);
	    }
	  }, {
	    key: 'move',
	    value: function move(keys) {
	      if (this.controls == 'arrows') {
	        if (keys.leftArrow) {
	          this.x--;
	        }
	        if (keys.upArrow) {
	          this.y--;
	        }
	        if (keys.rightArrow) {
	          this.x++;
	        }
	        if (keys.downArrow) {
	          this.y++;
	        }
	      } else {
	        if (keys.A) {
	          this.x--;
	        }
	        if (keys.W) {
	          this.y--;
	        }
	        if (keys.D) {
	          this.x++;
	        }
	        if (keys.S) {
	          this.y++;
	        }
	      }
	      this.wallCollision(this.x, this.y);
	    }
	  }, {
	    key: 'wallCollision',
	    value: function wallCollision(x, y) {
	      var thetas = [].concat(_toConsumableArray(Array(72).keys())).map(function (x) {
	        return x * 5;
	      });
	      var xVel = 1;
	      var yVel = 1;

	      thetas.forEach(function (theta) {
	        if (this.map.isWallCollision(this.x + this.radius * this.cosTheta(theta), this.y - this.radius * this.sinTheta(theta))) {
	          this.x -= xVel * this.cosTheta(theta);
	          this.y += yVel * this.sinTheta(theta);
	        }
	      }.bind(this));
	    }
	  }, {
	    key: 'cosTheta',
	    value: function cosTheta(theta) {
	      return Math.cos(theta * (Math.PI / 180));
	    }
	  }, {
	    key: 'sinTheta',
	    value: function sinTheta(theta) {
	      return Math.sin(theta * (Math.PI / 180));
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
	  function Map() {
	    _classCallCheck(this, Map);

	    this.cols = 8, this.rows = 8, this.tsize = 40, this.tiles = [53, 164, 164, 164, 164, 164, 164, 56, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 81, 78, 78, 78, 78, 1, 78, 92, 81, 78, 78, 78, 78, 78, 78, 92, 168, 164, 164, 164, 164, 164, 164, 165];
	    this.tilesImg = this.loadTileImage();
	    this.barriers = [92, 53, 164, 56, 81, 168, 165, 1];
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
	      tilesImg.src = './assets/tiles.png';
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

/***/ }
/******/ ]);