export default class Player {
  constructor({ x = 50, y = 50, radius = 20, color = 'blue', controls = 'arrows' } = {}) {
    this.x = x
    this.y = y
    this.radius = radius
    this.startAngle = 0
    this.endAngle = Math.PI * 2 
    this.fill = color
    this.controls = controls

  }

  draw(context) {

    context.beginPath()
    context.fillStyle = this.fill
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true)
    context.fill()
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
      

  }

  checkXCoord() {
    if (this.x > 390) {
      this.direction = 'backward'
    } else if (this.x < 10) {
      this.direction = 'forward'
    }
    return this
  }
}
