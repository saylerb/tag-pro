export default class SpikeCollisions {
  constructor(players, flags, spikes) {
    this.players = players
    this.flags = flags
    this.spikes = spikes
    this.touchRadius = 30
  }

  testCollisions() {
    this.players.forEach(player => {
      this.spikes.forEach(spike => {
        if (this.checkWithinRadius(player, spike)) {
          this.respawnPlayer(player)

          if (player.hasFlag) {
            this.returnFlag(player)
          }
        }
      })
    })
  }

  checkWithinRadius(player, spike) {
    if (
      player.x >= spike.x - this.touchRadius &&
      player.x <= spike.x + this.touchRadius &&
      player.y <= spike.y + this.touchRadius &&
      player.y >= spike.y - this.touchRadius
    ) { return true }
  }

  respawnPlayer(player) {
    player.x = player.spawnPosition.x
    player.y = player.spawnPosition.y
    player.dx = 0
    player.dy = 0
    player.frozen = true
    setTimeout(function(){ player.frozen = false}, 2000)
  }

  returnFlag(player) {
    player.hasFlag = false
    if (player.color === 'blue') {
      this.flags[1].isCaptured = false
    } else {
      this.flags[0].isCaptured = false
    }
  }
}
