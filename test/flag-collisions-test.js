const chai = require('chai')
const assert = chai.assert

import FlagCollisions from '../lib/flag-collisions'
import Player from '../lib/player'
import Flag from '../lib/flag'
import Map from '../lib/map'

describe('FlagCollisions', function() {
  describe('is setup correctly', function() {

    var blueprint = { tsize: 10, columns: 2, rows: 2, 
                      tiles: [ 78, 81, 78, 78 ], barriers: [81]
                    }

    var map = new Map(blueprint)

    let players = []
    players.push(new Player({ x: 135, y: 150, color: 'red', controls: 'arrows' }, map))
    players.push(new Player({ x: 170, y: 150, color: 'blue', controls: 'wasd' }, map))

    let flags = []
   
    flags.push(new Flag({ x: 150, y: 150, color: 'blue', tsize: 10 }))
    flags.push(new Flag({ x: 100, y: 100, color: 'red', tsize: 10 }))
 
    var flagCollisions = new FlagCollisions(players, flags)

    it('setup players', function() {
      assert.equal(players.length, 2)
    })

    it('setup flags', function() {
      assert.equal(flags.length, 2)
    })

    it('flag collision detector can get blue players', function() {
      let bluePlayers = flagCollisions.bluePlayers
      assert.isArray(bluePlayers)
      assert.equal(bluePlayers.length, 1)
      assert.equal(bluePlayers[0].x, 170)
    })

    it('flag collision detector can get red players', function() {
      let redPlayers = flagCollisions.redPlayers
      assert.isArray(redPlayers)
      assert.equal(redPlayers.length, 1)
      assert.equal(redPlayers[0].x, 135)
    })

  })
})
