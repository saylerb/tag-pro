export default class Spike {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.originY = options.y
    this.tsize = options.tsize
    this.moving = options.moving || false
    this.amplitude = options.amplitude || 40
  }

  get spriteSheet() {
    let spikeImg = new Image()
    spikeImg.src = './lib/assets/tiles.png'
    return spikeImg
  }

  get SpikeYTilePxl() {
    return 0
  }

  get SpikeXTilePxl() {
    return 480
  }

  move(game_counter) {
    if (this.moving) {
      this.y = this.originY + (this.amplitude * Math.sin((game_counter + this.x % 360) * (Math.PI/180)))
    }
  }

  draw(context) {
    context.drawImage(
        this.spriteSheet,
        this.SpikeXTilePxl,
        this.SpikeYTilePxl,
        this.tsize,
        this.tsize,
        this.x - this.tsize/2,
        this.y - this.tsize/2,
        this.tsize,
        this.tsize
    )
  }
}
