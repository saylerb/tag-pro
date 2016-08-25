const chai = require('chai')
const assert = chai.assert

import Player from '../lib/player'
import Map from '../lib/map'

describe('Player', function() {
  context('player can be created and moved', function() {

    var map = new Map()
    map.cols = 2
    map.rows = 2
    map.tsize = 100
    map.tiles = [1, 2,
                 1, 1]
    map.barriers = [2]

    var player = new Player({ x: 25, y: 25, color: 'blue', controls: 'arrows' }, map)

    it('should have specified x and y coordinates', function() {
      assert.equal(player.x, 25)
      assert.equal(player.y, 25)
    })

    it('should have controls wasd', function(){
      assert.equal(player.controls, 'arrows')
    })

    it('should move left', function(){
      player.x = 25
      player.y = 25
      var keys = {leftArrow: true, upArrow: false, rightArrow: false, downArrow: false}
      player.move(keys)

      assert.equal(player.x, 24)
    })

    it('should move up', function(){
      player.x = 25
      player.y = 25
      var keys = {leftArrow: false, upArrow: true, rightArrow: false, downArrow: false}
      player.move(keys)

      assert.equal(player.y, 24)
    })

    it('should move right', function(){
      player.x = 25
      player.y = 25
      var keys = {leftArrow: false, upArrow: false, rightArrow: true, downArrow: false}
      player.move(keys)

      assert.equal(player.x, 26)
    })

    it('should move down', function(){
      player.x = 25
      player.y = 25
      var keys = {leftArrow: false, upArrow: false, rightArrow: false, downArrow: true}
      player.move(keys)

      assert.equal(player.y, 26)
    })

    it('does not move right if it collides with barrier on right side', function(){
      player.x = 78
      player.y = 25
      var keys = {leftArrow: false, upArrow: false, rightArrow: true, downArrow: false}

      player.move(keys)
      assert.equal(player.x, 79)

      player.move(keys)
      assert.equal(player.x, 79)
    })
  })
})
