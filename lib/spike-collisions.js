export default class SpikeCollisions {
  constructor(players, flags, spikes) {
    this.players = players
    this.flags = flags
    this.spikes = spikes 
    this.touchRadius = 50
  }

  spikeCollision() {
    let radius = this.touchRadius
    this.players.forEach(player => {
      this.spikes.forEach(spike => {
        if (player.x <= spike.x + radius && player.x >= spike.x && player.y <= spike.y + radius && player.y >= spike.y) {
          this.respawnPlayer(player)
         
          if (player.hasFlag) {
            this.returnFlag(player)
          }
        }
      })
    })
  }

  respawnPlayer(player) {
    player.x = player.spawnPosition.x
    player.y = player.spawnPosition.y
    player.dx = 0
    player.dy = 0
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
