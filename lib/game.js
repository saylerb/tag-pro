import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import Flag from './flag'
import MapBlueprint from './map-blueprint'
import Spike from './spike'
import CollisionDectector from './collision-detector'

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
    this.collisionDetector = {}     
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

    self.collisionDetector = new CollisionDectector(self.players, self.flags, self.spikes)
  }

  update(game_counter) {
    this.updateScoreboard()
    this.players.forEach(player => player.move(this.keyboard.keys))
    this.spikes.forEach(spike => spike.move(game_counter))
    this.collisionDetector.checkAllCollisions()
  }

  updateScoreboard() {
    document.querySelector("#red-score").innerHTML = this.collisionDetector.redScore
    document.querySelector("#blue-score").innerHTML = this.collisionDetector.blueScore
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.map.render(this.context)
    this.flags.forEach(flag => flag.draw(this.context))
    this.spikes.forEach(spike => spike.draw(this.context))
    this.players.forEach(player => player.draw(this.context))
  }

  run() {
    let self = this
    let game_counter = 0

    requestAnimationFrame(function gameLoop() {
      game_counter++
      self.update(game_counter)
      self.draw()
      requestAnimationFrame(gameLoop)
    })
  }
}

var buttons = document.querySelectorAll("button.start-button")

Array.from(buttons).forEach(button => button.addEventListener('click', function(event) {

  hideMenu(event)
  let domElements = getDomElements(event)

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
