export default class Player {
  constructor({ x = 100, y = 100, radius = 20, color = 'blue', controls = 'arrows' } = {}, map) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = 0
    this.endAngle = Math.PI * 2
    this.fill = color
    this.controls = controls
    this.map = map
  }

  draw(context) {
    context.beginPath()
    context.fillStyle = this.fill
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true)
    context.fill()
  }

  move(keys) {
    this.wallCollision(this.x, this.y)

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
  }

  wallCollision(x, y) {
    var top = this.y - (this.radius + 1)
    var right = this.x + (this.radius + 1)
    var bottom = this.y + (this.radius + 1)
    var left = this.x - (this.radius + 1)

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
