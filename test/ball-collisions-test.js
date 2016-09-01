const chai = require('chai')
const assert = chai.assert

import BallCollisions from '../lib/ball-collisions'
import Player from '../lib/player'

describe('BallCollisions', function() {
  context('can produce unique pairs of players', function() {
    var players = ["a", "b", "c"]
    var flags = []
    var ballCollisions = new BallCollisions(players, flags)

    it('should be unique and every pair', function() {
      var output = ballCollisions.pairwise(players)
      var expectedPairs = [["a","b"], ["a","c"], ["b","c"]]

      assert.deepEqual(output, expectedPairs)
    })
  })

  context('can sense two players colliding', function() {
    var players = []
    var flags = []
    var map = {}

    var player1 = new Player(map, { x: 135, y: 150, color: 'red', controls: 'arrows' })
    var player2 = new Player(map, { x: 170, y: 150, color: 'blue', controls: 'wasd' })
    players.push(player1)
    players.push(player2)

    var ballCollisions = new BallCollisions(players, flags)

    it('makes both players react to collision', function() {
      ballCollisions.testCollisions()

      assert.isBelow(player1.dx, 0)
      assert.isAbove(player2.dx, 0)
    })
  })
})
