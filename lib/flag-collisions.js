export default class FlagCollisions {
  constructor(players, flags) {
    this.players = players
    this.blueFlag = flags[0]
    this.redFlag = flags[1]
    this.touchRadius = 20
    this.scoreBoard =  { red: 0, blue: 0 }
  }

  get bluePlayers() {
    return this.players.filter(player => player.color === 'blue')
  }

  get redPlayers() {
    return this.players.filter(player => player.color === 'red')
  }

  testGrabbed() {
    this.bluePlayers.forEach(player => {
      let flag = this.redFlag
      if (!flag.isCaptured && this.checkWithinRadius(player, flag)) {
        player.hasFlag = true
        flag.isCaptured = true
      }
    })

    this.redPlayers.forEach(player => {
      let flag = this.blueFlag
      if (!flag.isCaptured && this.checkWithinRadius(player, flag)) {
        player.hasFlag = true
        flag.isCaptured = true
      }
    })
  }

  testCaptured() {
    this.bluePlayers.forEach(player => {
      if (player.hasFlag) {
        let homeFlag = this.blueFlag
        let targetFlag = this.redFlag
        if (this.checkWithinRadius(player, homeFlag)) {
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
        if (this.checkWithinRadius(player, homeFlag)) {
          player.hasFlag = false
          targetFlag.isCaptured = false
          this.scoreBoard.red ++
        }
      }
    })
  }

  checkWithinRadius(player, flag) {
    if (
      player.x >= flag.x - this.touchRadius &&
      player.x <= flag.x + this.touchRadius &&
      player.y <= flag.y + this.touchRadius &&
      player.y >= flag.y - this.touchRadius
    ) { return true }
  }
}
