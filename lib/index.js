import Game from './game'
import Keyboard from './keyboard'
import Map from './map'
import MapBlueprint from './map-blueprint'
import Dom from './dom'

var canvas = document.getElementById('game')
var context = canvas.getContext('2d')

const dom = new Dom
var game = {}
var gameCounter = 0
// var 
// consider declaring game var here so you can access it

// game start condition
// request animation loop that either calls game tick
  // or ends request animation and triggers end sequence
// tick and game things should be called on game

setStage()

requestAnimationFrame(function gameLoop(){

  if (game.running && gameCounter < 100) {
    gameCounter++
    game.update(gameCounter)
    game.draw()
  } else {
    console.log("Game Over")

  }
  requestAnimationFrame(gameLoop)
    // if game is active
    // game.update
    // game.draw
    // recurse
    // else
    // set game to inactive
      // write game scores to local storage
    // change view appropriately
    // call request animation frame again
    
})

// delegate eventListeners 

function setStage() {
  console.log("Setting stage")
  Array.from(dom.buttons).forEach(button => {
    dom.listenOn(button, 'click', event => {
      dom.hide(event.currentTarget.parentNode)
      dom.showGame()
      prepareGame(dom.level(event), dom.canvas)

    })
  })
}


function prepareGame(mapLevel) {
  var keys = new Keyboard().listenForEvents()
  var blueprint = new MapBlueprint()[mapLevel]
  var map = new Map(blueprint)

  canvas.setAttribute("width", `${map.cols * map.tsize}px`)
  canvas.setAttribute("height", `${map.rows * map.tsize}px`)

  game = new Game(context, canvas, keys, map, blueprint)
  game.init()
//  game.run()
}
