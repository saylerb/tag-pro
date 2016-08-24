import Player from './player'
import Keyboard from './keyboard'

class Game {
  constructor(context, canvas, keyboard) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.player = new Player({ x: 50, y: 50 }, 10, 'blue')
  }

  run() {
    this.context.fillRect(50, 50, 10, 10)

    var that = this;

    requestAnimationFrame(function gameLoop() {
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height)

      if (that.keyboard.isKeyPressed()) {
        that.player.move(that.keyboard.keys)
      }

      that.player.draw(that.context)
      requestAnimationFrame(gameLoop)
    })
  }
}

window.onload = function() {
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  var keys = new Keyboard().listenForEvents();
  new Game(context, canvas, keys).run()
}
