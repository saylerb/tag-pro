export default class Player {
  constructor({ x = 100, y = 100, radius = 20, color = 'blue', controls = 'arrows' } = {}, map) {
    this.x = x
    this.y = y
    this.dx = 0
    this.dy = 0
    this.radius = radius
    this.color = color
    this.playerImg = this.loadPlayerImage()
    this.controls = controls
    this.map = map
    this.hasFlag = false
  }

  loadPlayerImage() {
    let playerImg = new Image()
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

  determineFlagTilePxl() {
    if (this.color == 'blue') {
      return 560
    } else if (this.color == 'red') {
      return 600
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
    if (this.hasFlag) {
      context.drawImage(
        this.playerImg,
        this.determineFlagTilePxl(),
        40,
        this.map.tsize,
        this.map.tsize,
        this.x - 20,
        this.y - 20,
        this.map.tsize,
        this.map.tsize
      )
    }
  }

  accelerate(keys){
    let acceleration = 0.1
    if (this.controls == 'arrows') {
      if (keys.leftArrow) { this.dx-= acceleration }
      if (keys.upArrow) { this.dy-= acceleration }
      if (keys.rightArrow) { this.dx+= acceleration }
      if (keys.downArrow) { this.dy+= acceleration }
    } else {
      if (keys.A) { this.dx-= acceleration }
      if (keys.W) { this.dy-= acceleration }
      if (keys.D) { this.dx+= acceleration }
      if (keys.S) { this.dy+= acceleration }
    }
  }

  decelerate() {
    let drag = 0.975
    this.dx *= drag
    this.dy *= drag
  }

  move(keys) {
    this.accelerate(keys)
    this.x += this.dx
    this.y += this.dy
    this.wallCollision()
    this.decelerate()
  }

  wallCollision() {
    let thetas = [...Array(72).keys()].map(function(x) { return x * 5 * (Math.PI / 180); })
    let force = 0.1

    thetas.forEach(function(theta){
      if (this.map.isWallCollision(this.x + (this.radius * Math.cos(theta)), this.y + (this.radius * Math.sin(theta)))) {
        this.dx -= force * Math.cos(theta)
        this.dy -= force * Math.sin(theta)
      }
    }.bind(this))
  }
}
