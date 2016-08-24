import Player from './player'
import Keyboard from './keyboard'
import Map from './map'

class Game {
  constructor(context, canvas, keyboard, map) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.map = map
    this.player = new Player({ color: 'red' })
  }

  run() {
    let self = this

    requestAnimationFrame(function gameLoop() {

      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

      if (self.keyboard.isKeyPressed())
        self.player.move(self.keyboard.keys)

      self.map.render(self.context)
      self.player.draw(self.context)
      requestAnimationFrame(gameLoop)
    })
  }
}

window.onload = function() {
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  var keys = new Keyboard().listenForEvents()
  var map = new Map()
  new Game(context, canvas, keys, map).run()
}
