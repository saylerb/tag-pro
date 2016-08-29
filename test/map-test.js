const chai = require('chai')
const assert = chai.assert

import Map from '../lib/map'

describe('Map', function() {
  context('basic map', function() {

    var map = new Map({ tsize: 10,
                        columns: 2,
                        rows: 2,
                        tiles: [ 78, 81,
                                 78, 78 ],
                        barriers: [81]
                      })

    it('should have tiles', () => {
      assert.equal(map.tiles.length, 4)
    })

    it('can convert coordinates to a tile index', () => {
      let result =  map.convertXYtoTileIndex(5, 5)
      assert.equal(result, 0, 'conversion to tile index is not correct')
    })

    it('can convert coordinates to a barrier index', () => {
      let result =  map.convertXYtoTileIndex(15, 5)
      assert.equal(result, 1)
    })  

    it('can retrieve the tile value for specific coordinates', () => {
      let regular_tile =  map.getTileValueAtXY(5, 5)
      let barrier_tile =  map.getTileValueAtXY(15, 5)
      assert.equal(regular_tile, 78)
      assert.equal(barrier_tile, 81)
    })

    it('if coordinates indicate a colision with the wall', () => {
      let result =  map.isWallCollision(11, 0)
      assert.equal(result, true)
    })
  })
})
