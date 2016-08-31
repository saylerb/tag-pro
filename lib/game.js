import Player from './player'
import Keyboard from './keyboard'
import Map from './map'
import Flag from './flag'
import MapBlueprint from './map-blueprint'
import Spike from './spike'
import CollisionDectector from './collision-detector'
import Dom from './dom'

const dom = new Dom

export default class Game {
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
    this.running = false
  }

  init() {
    this.running = true
    
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

  //run() {
  //  let self = this
  //  let game_counter = 0
  //  this.running = true

  //  requestAnimationFrame(function gameLoop() {

  //    game_counter++

  //    if (game_counter < 100) {

  //      self.update(game_counter)
  //      self.draw()
  //      requestAnimationFrame(gameLoop)

  //    } else {
  //      console.log('game over')

  //      dom.showMenu()
  //      dom.hide(self.canvas)
  //      dom.hideScoreboard()
  //    } 
  //  })
  //}
}

//const dom = new Dom
//
//Array.from(dom.buttons).forEach(button => {
//  dom.listenOn(button, 'click', event => {
//    dom.hide(event.currentTarget.parentNode)
//    dom.showGame()
//    prepareGame(dom.level(event), dom.canvas)
//  })
//})

// function setCanvasSize(canvas, map) {
//   canvas.setAttribute("width", `${map.cols * map.tsize}px`)
//   canvas.setAttribute("height", `${map.rows * map.tsize}px`)
// }

//function prepareGame(mapLevel, canvas) {
  // var blueprint = new MapBlueprint()[mapLevel]
  // var map = new Map(blueprint)

  // var keys = new Keyboard().listenForEvents()

  //setCanvasSize(canvas, map)

//}
