export default class Spike {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.tsize = options.tsize
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
