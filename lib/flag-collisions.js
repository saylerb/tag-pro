export default class FlagCollisions {
  constructor(players, map, flags) {
    this.bluePlayers = this.getBluePlayers(players)
    this.redPlayers = this.getRedPlayers(players)
    this.map = map
    this.blueFlag = flags[0]
    this.redFlag = flags[1]
    this.touchRadius = 20
    this.scoreBoard =  { red: 0, blue: 0 }
  }

  getBluePlayers(players) {
    return players.filter(function(player){ return player.color == 'blue' })
  }

  getRedPlayers(players) {
    return players.filter(function(player){ return player.color == 'red' })
  }

  testGrabbed() {
    let radius = this.touchRadius
    this.bluePlayers.forEach(player => {
      let flag = this.redFlag
      if (!flag.isCaptured && player.x <= flag.x + radius && player.x >= flag.x && player.y <= flag.y + radius && player.y >= flag.y - radius) {
        player.hasFlag = true
        flag.isCaptured = true
      }
    })

    this.redPlayers.forEach(player => {
      let flag = this.blueFlag
      if (!flag.isCaptured && player.x <= flag.x + radius && player.x >= flag.x && player.y <= flag.y + radius && player.y >= flag.y - radius) {
        player.hasFlag = true
        flag.isCaptured = true
      }
    })
  }

  testCaptured() {
    let radius = this.touchRadius
    this.bluePlayers.forEach(player => {
      if (player.hasFlag) {
        let homeFlag = this.blueFlag
        let targetFlag = this.redFlag
        if (player.x <= homeFlag.x + radius && player.x >= homeFlag.x && player.y <= homeFlag.y + radius && player.y >= homeFlag.y - radius) {
          player.hasFlag = false
          targetFlag.isCaptured = false
          this.scoreBoard.blue ++
        }
      }
    })

    this.redPlayers.forEach(player => {
      if (player.hasFlag) {
        let homeFlag = this.redFlag
        let targetFlag = this.blueFlag
        if (player.x <= homeFlag.x + radius && player.x >= homeFlag.x && player.y <= homeFlag.y + radius && player.y >= homeFlag.y - radius) {
          player.hasFlag = false
          targetFlag.isCaptured = false
          this.scoreBoard.red ++
        }
      }
    })
  }
}
