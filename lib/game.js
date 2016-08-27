import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import BallCollisions from './ball-collisions'
import FlagCollisions from './flag-collisions'

class Game {
  constructor(context, canvas, keyboard, map) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.map = map
    this.players = []
  }

  run() {
    let self = this

    self.players.push(new Player({ color: 'red', controls: 'arrows' }, self.map))
    self.players.push(new Player({ x: 150, y: 150, color: 'blue', controls: 'wasd' }, self.map))

    let ballCollisions = new BallCollisions(self.players)

    let flagCollisions = new FlagCollisions(self.players, self.map)

    requestAnimationFrame(function gameLoop() {

      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

      self.players.forEach(player => player.move(self.keyboard.keys))

      ballCollisions.testCollisions()
      flagCollisions.testCollisions()

      self.map.render(self.context)
      flagCollisions.draw(self.context)
      self.players.forEach(player => player.draw(self.context))

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
