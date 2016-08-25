const chai = require('chai')
const assert = chai.assert

import Keyboard from '../lib/keyboard'

describe('Keyboard', function() {
  context('can respond to events', function() {

    var keyboard = new Keyboard()

    it('should change key to true given keyDown event', function() {
      var event = {keyCode: 37}
      keyboard.onKeyDown(event)

      assert.equal(keyboard.keys.leftArrow, true)
    })

    it('should change key to false given keyUp event', function() {
      var event = {keyCode: 37}
      keyboard.onKeyDown(event)
      keyboard.onKeyUp(event)

      assert.equal(keyboard.keys.leftArrow, false)
    })
  })
})
