import Player from './player'

class Game {
  constructor(context, canvas) {
    this.canvas = canvas
    this.context = context
    this.player = new Player({ x: 50, y: 50 }, 10, 'blue')
  }

  run() {
    this.context.fillRect(50, 50, 10, 10)

    var that = this

    requestAnimationFrame(function gameLoop() {
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height)
      that.player.draw(that.context)
      requestAnimationFrame(gameLoop)
    })
  }
}

window.onload = function() {
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  new Game(context, canvas).run()
}
