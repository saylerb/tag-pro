const chai = require('chai')
const assert = chai.assert

import Player from '../lib/player'
import Map from '../lib/map'

describe('Player', function() {
  context('player can be created and moved', function() {

    var map = new Map({ tsize: 10,
                        columns: 2,
                        rows: 2,
                        tiles: [ 78, 81,
                                 78, 78 ],
                        barriers: [2]
                      })

    const drag = 0.975
    const acceleration = 0.1

    var player

    beforeEach(function(){
      player = new Player(map, { x: 25, y: 25, color: 'blue', controls: 'arrows' })
    })

    it('should have specified x and y coordinates', function() {
      assert.equal(player.x, 25)
      assert.equal(player.y, 25)
    })

    it('should have controls wasd', function(){
      assert.equal(player.controls, 'arrows')
    })

    it('should move left', function(){
      var keys = {leftArrow: true, upArrow: false, rightArrow: false, downArrow: false}
      player.move(keys)

      var expectedPos = 25 - (acceleration * drag)

      assert.equal(player.x, expectedPos)
    })

    it('should move up', function(){
      var keys = {leftArrow: false, upArrow: true, rightArrow: false, downArrow: false}
      player.move(keys)

      var expectedPos = 25 - (acceleration * drag)

      assert.equal(player.y, expectedPos)
    })

    it('should move right', function(){
      var keys = {leftArrow: false, upArrow: false, rightArrow: true, downArrow: false}
      player.move(keys)

      var expectedPos = 25 + (acceleration * drag)

      assert.equal(player.x, expectedPos)
    })

    it('should move down', function(){
      var keys = {leftArrow: false, upArrow: false, rightArrow: false, downArrow: true}
      player.move(keys)

      var expectedPos = 25 + (acceleration * drag)

      assert.equal(player.y, expectedPos)
    })

    it('does not move right if it collides with barrier on right side', function(){
      var keys = {leftArrow: false, upArrow: false, rightArrow: true, downArrow: false}

      var expectedPos = 25 + (acceleration * drag)

      player.move(keys)
      assert.equal(player.x, expectedPos)
      player.dx = 0
      player.dy = 0

      expectedPos = player.x + (acceleration * drag)

      player.move(keys)
      assert.equal(player.x, expectedPos)
    })
  })
})
