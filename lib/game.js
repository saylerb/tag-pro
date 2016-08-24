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
    let self = this
    this.context.fillRect(50, 50, 10, 10)

    requestAnimationFrame(function gameLoop() {
      
      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

      if (self.keyboard.isKeyPressed())
        self.player.move(self.keyboard.keys)

      self.player.draw(self.context)

      requestAnimationFrame(gameLoop)
    })
  }
}

window.onload = function() {
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  var keys = new Keyboard().listenForEvents()
  new Game(context, canvas, keys).run()
}
