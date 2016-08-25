export default class Player {
  constructor({ x = 100, y = 100, radius = 20, color = 'blue', controls = 'arrows' } = {}, map) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.playerImg = this.loadPlayerImage()
    this.controls = controls
    this.map = map
  }

  loadPlayerImage() {
    var playerImg = new Image()
    playerImg.src = './lib/assets/tiles.png'
    return playerImg
  }

  determinePlayerTilePxl() {
    if (this.color == 'blue') {
      return 600
    } else if (this.color == 'red') {
      return 560
    }
  }

  draw(context) {
    context.drawImage(
        this.playerImg,
        this.determinePlayerTilePxl(),
        0,
        this.map.tsize,
        this.map.tsize,
        this.x - this.radius,
        this.y - this.radius,
        this.map.tsize,
        this.map.tsize
    )
  }

  move(keys) {
    if (this.controls == 'arrows') {
      if (keys.leftArrow) { this.x-- }
      if (keys.upArrow) { this.y-- }
      if (keys.rightArrow) { this.x++ }
      if (keys.downArrow) { this.y++ }
    } else {
      if (keys.A) { this.x-- }
      if (keys.W) { this.y-- }
      if (keys.D) { this.x++ }
      if (keys.S) { this.y++ }
    }
    this.wallCollision(this.x, this.y)
  }

  wallCollision(x, y) {
    var top = this.y - this.radius
    var right = this.x + this.radius
    var bottom = this.y + this.radius
    var left = this.x - this.radius

    if (this.map.isWallCollision(this.x, top)) {
      this.y++
    }
    if (this.map.isWallCollision(right, this.y)) {
      this.x--
    }
    if (this.map.isWallCollision(this.x, bottom)) {
      this.y--
    }
    if (this.map.isWallCollision(left, this.y)) {
      this.x++
    }
  }
}
