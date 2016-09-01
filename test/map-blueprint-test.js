const chai = require('chai')
const assert = chai.assert

import MapBlueprint from '../lib/map-blueprint'

describe('MapBlueprint', function() {
  context('has structure for map', function() {

    var blueprints = new MapBlueprint()

    it('should have a default tile size for all blueprints', () => {
      assert.equal(blueprints.tsize, 40)
      assert.equal(blueprints.level_one.tsize, 40)
    })

    it('should have a barriers assigned', () => {
      assert.include(blueprints.barriers, 92)
      assert.include(blueprints.barriers, 1)
      assert.include(blueprints.barriers, 165)
      assert.include(blueprints.level_one.barriers, 165)
    })

    it('should have three levels', () => {
      assert.isDefined(blueprints.level_one)
      assert.isDefined(blueprints.level_two)
      assert.isDefined(blueprints.level_three)
    })

    it('should have rows and columns', () => {
      assert.equal(blueprints.level_two.columns, 25)
      assert.equal(blueprints.level_two.rows, 16)
    })

    it('should have tiles', () => {
      assert.isArray(blueprints.level_two.tiles)
    })

    it('can have spikes, and they can be set to move', () => {
      assert.isArray(blueprints.level_two.spikes)
    })
  })
})
