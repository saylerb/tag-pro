export default class Player {
  constructor({ x = 50, y = 50, radius = 20, color = 'blue' } = {}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = 0
    this.endAngle = Math.PI * 2 
    this.fill = color
  }

  draw(context) {

    context.beginPath()
    context.fillStyle = this.fill
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true)
    context.fill()
  }

  move(keys) {
    if (keys.leftArrow) { this.x-- }
    if (keys.upArrow) { this.y-- }
    if (keys.rightArrow) { this.x++ }
    if (keys.downArrow) { this.y++ }
  }

  checkXCoord() {
    if (this.x > 390) {
      this.direction = 'backward'
    } else if (this.x < 10) {
      this.direction = 'forward'
    }
    return this // returing this allows you to chain
  }
}
