import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import BallCollisions from './ball-collisions'
import FlagCollisions from './flag-collisions'
import Flag from './flag'
import MapBlueprint from './map-blueprint'

class Game {
  constructor(context, canvas, keyboard, map, blueprint) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.map = map
    this.players = []
    this.flags = []
    this.blueprint = blueprint
  }

  run() {
    let self = this

    self.players.push(new Player(self.blueprint.redPlayerOptions, self.map))
    self.players.push(new Player(self.blueprint.bluePlayerOptions, self.map))

    self.flags.push(new Flag(self.blueprint.blueFlagOptions))
    self.flags.push(new Flag(self.blueprint.redFlagOptions))

    let ballCollisions = new BallCollisions(self.players, self.flags)
    let flagCollisions = new FlagCollisions(self.players, self.flags)

    requestAnimationFrame(function gameLoop() {

      let redScore = flagCollisions.scoreBoard.red
      let blueScore = flagCollisions.scoreBoard.blue
      document.querySelector("#red-score").innerHTML = redScore
      document.querySelector("#blue-score").innerHTML = blueScore

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
  var blueprint = new MapBlueprint().level_one
  var map = new Map(blueprint) // indicate map to use

  canvas.setAttribute("width", `${map.cols * map.tsize}px`)
  canvas.setAttribute("height", `${map.rows * map.tsize}px`)

  new Game(context, canvas, keys, map, blueprint).run()
}
