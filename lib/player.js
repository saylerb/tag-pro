export default class Player {
  constructor({ x = 50, y = 50, radius = 20, color = 'blue', controls = 'arrows' } = {}, map) {
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
    console.log(this.map.isWallCollision(this.x, this.y))
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

  wallCollision() {
    // Check collision on the right side of the ball (left side of barrier)
    // Ball is at x,y coordinate
    // Ask the map if the x,y coordinate is in the no-go zone of a barrier tile
    // If it is, do not allow movement to the right

  }
}
