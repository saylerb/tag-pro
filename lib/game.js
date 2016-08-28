import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import BallCollisions from './ball-collisions'
import FlagCollisions from './flag-collisions'
import Flag from './flag'
import MapBlueprint from './map-blueprint'

class Game {
  constructor(context, canvas, keyboard, map) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.map = map
    this.players = []
    this.flags = []
  }

  run() {
    let self = this

    self.players.push(new Player({ color: 'red', controls: 'arrows' }, self.map))
    self.players.push(new Player({ x: 150, y: 150, color: 'blue', controls: 'wasd' }, self.map))

    self.flags.push(new Flag({ x: 150, y: 150, color: 'blue' }, self.map))
    self.flags.push(new Flag({ x: 250, y: 250, color: 'red' }, self.map))

    let ballCollisions = new BallCollisions(self.players, self.flags)
    let flagCollisions = new FlagCollisions(self.players, self.flags)

    requestAnimationFrame(function gameLoop() {

      let score = `Red: ${flagCollisions.scoreBoard.red}, Blue: ${flagCollisions.scoreBoard.blue}`
      document.querySelector("#score-board").innerHTML = score

      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

      self.players.forEach(player => player.move(self.keyboard.keys))

      ballCollisions.testCollisions()

      flagCollisions.testGrabbed()
      flagCollisions.testCaptured()

      self.map.render(self.context)
      self.flags.forEach(flag => flag.draw(self.context))
      self.players.forEach(player => player.draw(self.context))

      requestAnimationFrame(gameLoop)
    })
  }
}

window.onload = function() {
  var canvas = document.getElementById('game')
  var context = canvas.getContext('2d')
  var keys = new Keyboard().listenForEvents()
  var map = new Map(new MapBlueprint().level_one)
  canvas.setAttribute("width", `${map.cols * map.tsize}px`)
  canvas.setAttribute("height", `${map.rows * map.tsize}px`)

  new Game(context, canvas, keys, map).run()
}
