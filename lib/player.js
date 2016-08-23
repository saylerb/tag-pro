export default class Player {
  constructor(coord, size, color) {
    this.x = coord.x
    this.y = coord.x
    this.width = size
    this.height = size
    this.direction = 'forward'
    this.fill = color
  }
  
  draw(context) {
    context.fillStyle = this.fill
    context.fillRect(this.x, this.y, this.width, this.height)
  }

  move() {
    if (this.direction == 'forward') {
      this.x += 1 
    } else if (this.direction == 'backward') {
      this.x -=1 
    }
    return this
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
