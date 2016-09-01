const chai = require('chai')
const assert = chai.assert

import Spike from '../lib/spike'

describe('Spike', function() {
  context('immobile spike', function() {

    var spike1 = new Spike({ x: 10,
                             y: 2,
                             tsize: 40
                           })

    it('should have an x and y coordinate', () => {
      assert.equal(spike1.x, 10)
      assert.equal(spike1.y, 2)
    })

    it('should not move by default', () => {
      assert.equal(spike1.moving, false)
    })

    it('should have x and y tile coordinate', () => {
      assert.equal(spike1.SpikeYTilePxl, 0)
      assert.equal(spike1.SpikeXTilePxl, 480)
    })
  })

  context('moving spike', function() {

    var spike2 = new Spike({ x: 10,
                             y: 2,
                             tsize: 40,
                             moving: true
                           })

    it('should have a default amplitude', () => {
      assert.equal(spike2.amplitude, 40)
    })

    it('should move in y direction', () => {
      let game_counter = 1
      spike2.move(game_counter)
      assert.isAbove(spike2.y, 2)

      game_counter = 181
      spike2.move(game_counter)
      assert.isBelow(spike2.y, 2)
    })
  })
})
