const chai = require('chai')
const assert = chai.assert

import Map from '../lib/map'

describe('Map', function() {
  context('basic map', function() {

    var map = new Map()
    map.cols = 2
    map.rows = 2
    map.tsize = 10
    map.tiles = [78, 81, 78, 78]
    map.barriers = [81]

    it('should have tiles', function() {
      assert.equal(map.tiles.length, 4)
    })
  })
})
