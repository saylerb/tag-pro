import BallCollisions from './ball-collisions'
import FlagCollisions from './flag-collisions'
import SpikeCollisions from './spike-collisions'

export default class CollisionDectector {
  constructor(players, flags, spikes) {
    this.ballCollisions = new BallCollisions(players, flags)
    this.flagCollisions = new FlagCollisions(players, flags)
    this.spikeCollisions = new SpikeCollisions(players, flags, spikes)
  }

  get redScore() {
    return this.flagCollisions.scoreBoard.red
  }

  get blueScore() {
    return this.flagCollisions.scoreBoard.blue
  }

  get scores() {
    return { red: this.flagCollisions.scoreBoard.red, blue: this.flagCollisions.scoreBoard.blue }
  }

  checkBallCollisions() {
    this.ballCollisions.testCollisions()
  }

  checkSpikeCollisions() {
    this.spikeCollisions.testCollisions()
  }

  checkFlagStatuses() {
    this.flagCollisions.testGrabbed()
    this.flagCollisions.testCaptured()
  }

  checkAllCollisions() {
    this.checkBallCollisions()
    this.checkSpikeCollisions()
    this.checkFlagStatuses()
  }

}
