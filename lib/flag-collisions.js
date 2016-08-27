export default class FlagCollisions {
  constructor(players, map) {
    this.x = 100
    this.y = 100
    this.players = players
    this.flagImage = this.loadFlagImage()
    this.map = map
  }

  loadFlagImage() {
    let flagImg = new Image()
    flagImg.src = './lib/assets/tiles.png'
    return flagImg
  }

  draw(context) {
    context.drawImage(
        this.flagImage,
        560,
        40,
        this.map.tsize,
        this.map.tsize,
        this.x - 20,
        this.y - 20,
        this.map.tsize,
        this.map.tsize
    )
  }

  testCollisions() {
    let radius = 20 
    this.players.forEach(player => {
      if (player.x <= this.x + radius && player.x >= this.x && player.y <= this.y + radius && player.y >= this.y - radius) { 
        console.log("Don't stand so close to me")
      } else {
        console.log("Can't touch this")
      }
    })
  }
}
