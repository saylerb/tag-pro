const chai = require('chai')
const assert = chai.assert

import SpikeCollisions from '../lib/spike-collisions'
import Player from '../lib/player'
import Flag from '../lib/flag'
import Spike from '../lib/spike'

describe('SpikeCollisions', function() {
  context('when a player hits a spike', function() {

    var players = [new Player(null, { x: 300, y: 300, color: 'red' })]
    var flags = [new Flag({ x: 50, y: 50, color: 'blue' })]
    var spikes = [new Spike({ x: 150, y: 150, tsize: 40 })]

    var spikeCollisions = new SpikeCollisions(players, flags, spikes)

    it('should have a default touch radius', () => {
      assert.equal(spikeCollisions.touchRadius, 30)
    })

    it('should know if a player is touching a spike', () => {
      players[0].x = 135
      players[0].y = 135

      let output = spikeCollisions.checkWithinRadius(players[0], spikes[0])

      assert.equal(output, true)
    })

    it('should return a player to their original position after collision', () => {
      players[0].x = 305
      players[0].y = 305
      spikeCollisions.testCollisions()
      assert.equal(players[0].x, 305)

      players[0].x = 135
      players[0].y = 135

      spikeCollisions.testCollisions()
      assert.equal(players[0].x, 300)
    })

    it('should return a flag when player collides with spike', () => {
      players[0].hasFlag = true
      flags[0].isCaptured = true

      spikeCollisions.returnFlag(players[0])

      assert.equal(players[0].hasFlag, false)
      assert.equal(flags[0].isCaptured, false)
    })
  })
})
