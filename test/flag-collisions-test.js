const chai = require('chai')
const assert = chai.assert

import FlagCollisions from '../lib/flag-collisions'
import Player from '../lib/player'
import Flag from '../lib/flag'
import Map from '../lib/map'

describe('FlagCollisions', function() {

  var blueprint = { tsize: 40, columns: 8, rows: 8, 
                    tiles: [ 53, 164, 164, 164, 164, 164, 164, 56,
                             81, 78, 78, 78, 78, 78, 78, 92,
                             81, 78, 78, 78, 78, 78, 78, 92,
                             81, 78, 78, 78, 78, 78, 78, 92,
                             81, 78, 78, 78, 78, 78, 78, 92,
                             81, 78, 78, 78, 78, 1, 78, 92,
                             81, 78, 78, 78, 78, 78, 78, 92,
                             168, 164, 164, 164, 164, 164, 164, 165
                           ],
                    barriers: [92, 53, 164, 56, 81, 168, 165, 1]
                  }

  var map = new Map(blueprint)

  let players = []
  players.push(new Player(map, { x: 290, y: 290, color: 'red', controls: 'arrows' }))
  players.push(new Player(map, { x: 110, y: 110, color: 'blue', controls: 'wasd' }))

  let flags = []
 
  flags.push(new Flag({ x: 150, y: 150, color: 'blue', tsize: 40 }))
  flags.push(new Flag({ x: 250, y: 250, color: 'red', tsize: 40 }))
 
  var flagCollisions = new FlagCollisions(players, flags)

  describe('is setup correctly', function() {

    it('setup players', function() {
      assert.equal(players.length, 2)
      assert.equal(players[0].color, 'red')
      assert.equal(players[1].color, 'blue')
    })

    it('setup flags', function() {
      assert.equal(flags.length, 2)
      assert.equal(flags[0].color, 'blue')
      assert.equal(flags[1].color, 'red')
    })

    it('flag collision detector can get blue players', function() {
      let bluePlayers = flagCollisions.bluePlayers
      assert.isArray(bluePlayers)
      assert.equal(bluePlayers.length, 1)
      assert.equal(bluePlayers[0].x, 110)
      assert.equal(bluePlayers[0].y, 110)
    })

    it('flag collision detector can get red players', function() {
      let redPlayers = flagCollisions.redPlayers
      assert.isArray(redPlayers)
      assert.equal(redPlayers.length, 1)
      assert.equal(redPlayers[0].x, 290)
      assert.equal(redPlayers[0].y, 290)
    })
  })

  describe('can detect if a flag is grabbed', function() {

    let bluePlayer = flagCollisions.bluePlayers[0]
    let redPlayer = flagCollisions.redPlayers[0]

    context('blue player', function() {

      it('can detect that blue player does not have flag', function() {
        flagCollisions.testGrabbed()

        assert.equal(bluePlayer.hasFlag, false)
        assert.equal(flagCollisions.redFlag.isCaptured, false)
        assert.equal(flagCollisions.scoreBoard.red, 0)
      })

      context('blue player captures the red flag', function() {

        beforeEach(function() {
          bluePlayer.x = 250
          bluePlayer.y = 250
        })

        it('can detect blue player grabbing flag', function() {
          flagCollisions.testGrabbed()

          assert.equal(flagCollisions.redFlag.isCaptured, true)
          assert.equal(bluePlayer.hasFlag, true)
        })

        it('can detect blue player capturing flag', function() {
          assert.equal(bluePlayer.hasFlag, true)

          bluePlayer.x = 150
          bluePlayer.y = 150

          flagCollisions.testCaptured()

          assert.equal(bluePlayer.hasFlag, false)
          assert.equal(flagCollisions.redFlag.isCaptured, false)
          assert.equal(flagCollisions.scoreBoard.blue, 1)
        })
      })
    })

    context('red player', function() {
      it('can detect that red player does not have the flag', function() {
        flagCollisions.testGrabbed()
        assert.equal(redPlayer.hasFlag, false)
        assert.equal(flagCollisions.blueFlag.isCaptured, false)
      })

      context('red player captures the blue flag', function() {
        beforeEach(function() {
          redPlayer.x = 150
          redPlayer.y = 150
        })

        it('can detect red player grabbing flag', function() {
          flagCollisions.testGrabbed()

          assert.equal(flagCollisions.blueFlag.isCaptured, true)
          assert.equal(redPlayer.hasFlag, true)
        })

        it('can detect red player capturing flag', function() {
          assert.equal(redPlayer.hasFlag, true)

          redPlayer.x = 250
          redPlayer.y = 250

          flagCollisions.testCaptured()

          assert.equal(redPlayer.hasFlag, false)
          assert.equal(flagCollisions.blueFlag.isCaptured, false)
          assert.equal(flagCollisions.scoreBoard.red, 1)
        })
      })
    })
  })
})
