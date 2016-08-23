Player = require('./player')

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
context.fillRect(50, 50, 10, 10);

var firstPlayer = new Player({ x: 50, y: 50 }, 10, 'blue');
var secondPlayer = new Player({ x: 100, y: 50 }, 10, 'red');

var players = [firstPlayer, secondPlayer]

requestAnimationFrame(function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height)

  players.forEach(player => player.checkXCoord().move().draw(context)) // chaining

  requestAnimationFrame(gameLoop);
});
