export default class FlagCollisions {
  constructor(players, map, flags) {
    this.players = players
    this.map = map
    this.blueFlag = flags[0]
    this.redFlag = flags[1]
    this.touchRadius = 20
  }
 
  testGrabbed() {
    let radius = this.touchRadius 
    this.players.forEach(player => {
      if (player.color == 'blue') {
        let flag = this.redFlag
        if (!flag.isCaptured && player.x <= flag.x + radius && player.x >= flag.x && player.y <= flag.y + radius && player.y >= flag.y - radius) {
          player.hasFlag = true
          flag.isCaptured = true
        }
      }
    })
  }

  testCaptured() {
    let radius = this.touchRadius
    this.players.forEach(player => {
      if (player.color == 'blue' && player.hasFlag) {
        let homeFlag = this.blueFlag
        let targetFlag = this.redFlag
        if (player.x <= homeFlag.x + radius && player.x >= homeFlag.x && player.y <= homeFlag.y + radius && player.y >= homeFlag.y - radius) {
          player.hasFlag = false
          targetFlag.isCaptured = false
        }
      }
    })
  }
}
