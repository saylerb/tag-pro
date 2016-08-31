import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import BallCollisions from './ball-collisions'
import FlagCollisions from './flag-collisions'
import Flag from './flag'
import MapBlueprint from './map-blueprint'
import Spike from './spike'
import SpikeCollisions from './spike-collisions'

class Game {
  constructor(context, canvas, keyboard, map, blueprint) {
    this.canvas = canvas
    this.context = context
    this.keyboard = keyboard
    this.map = map
    this.players = []
    this.flags = []
    this.blueprint = blueprint
    this.spikes = []
    this.ballCollisions = {}     
    this.flagCollisions = {}     
    this.spikeCollisions = {}     


  }

  init() {
    let self = this

    self.players.push(new Player(self.blueprint.redPlayerOptions, self.map))
    self.players.push(new Player(self.blueprint.bluePlayerOptions, self.map))

    self.flags.push(new Flag(self.blueprint.blueFlagOptions))
    self.flags.push(new Flag(self.blueprint.redFlagOptions))

    if (self.blueprint.spikes) {
      self.blueprint.spikes.forEach(spikeOptions => {
        self.spikes.push(new Spike(spikeOptions))
      })
    }

    self.ballCollisions = new BallCollisions(self.players, self.flags)
    self.flagCollisions = new FlagCollisions(self.players, self.flags)
    self.spikeCollisions = new SpikeCollisions(self.players, self.flags, self.spikes)
  }

  update() {
  }

  run() {
    let self = this
      
    requestAnimationFrame(function gameLoop() {

      let redScore = self.flagCollisions.scoreBoard.red
      let blueScore = self.flagCollisions.scoreBoard.blue
      document.querySelector("#red-score").innerHTML = redScore
      document.querySelector("#blue-score").innerHTML = blueScore

      self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

      self.players.forEach(player => player.move(self.keyboard.keys))

      self.ballCollisions.testCollisions()
      self.spikeCollisions.spikeCollision()

      self.flagCollisions.testGrabbed()
      self.flagCollisions.testCaptured()

      self.map.render(self.context)
      self.flags.forEach(flag => flag.draw(self.context))
      self.spikes.forEach(spike => spike.draw(self.context))
      self.players.forEach(player => player.draw(self.context))

      requestAnimationFrame(gameLoop)
    })
  }
}

var buttons = document.querySelectorAll("button.start-button")

Array.from(buttons).forEach(button => button.addEventListener('click', function(event) {

  hideMenu(event)
  var domElements = getDomElements(event)

  showGame(domElements.canvas)
  prepareGame(domElements.level, domElements.canvas)

}))

function hideMenu(event) {
  event.currentTarget.parentNode.style.display = "none"
}

function getDomElements(event) {
  return { 
    canvas: document.getElementById('game'),
    level: event.currentTarget.getAttribute("id")
  }
}

function showGame(canvas) {
  canvas.style.display = "block"

  let board = document.getElementById('score-board-container')
  board.style.visibility = "visible"
}

function setCanvasSize(canvas, map) {
  canvas.setAttribute("width", `${map.cols * map.tsize}px`)
  canvas.setAttribute("height", `${map.rows * map.tsize}px`)
}

function prepareGame(mapLevel, canvas) {
  var blueprint = new MapBlueprint()[mapLevel]
  var map = new Map(blueprint) // indicate map to use

  var context = canvas.getContext('2d')
  var keys = new Keyboard().listenForEvents()

  setCanvasSize(canvas, map)

  const game = new Game(context, canvas, keys, map, blueprint)
  game.init()
  game.run()
}
