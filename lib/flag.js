export default class Flag {
  constructor(options, map) {
    this.x = options.x
    this.y = options.y
    this.color = options.color
    this.flagImage = this.loadFlagImage()
    this.map = map
    this.isCaptured = false
  }

  loadFlagImage() {
    let flagImg = new Image()
    flagImg.src = './lib/assets/tiles.png'
    return flagImg
  }

  determineFlagYTilePxl() {
    if (this.isCaptured) {
      return 80
    } else {
      return 40
    }
  }

  determineFlagXTilePxl() {
    if (this.color == 'blue') {
      return 600
    } else if (this.color == 'red') {
      return 560
    }
  }
 
  draw(context) {
    context.drawImage(
        this.flagImage,
        this.determineFlagXTilePxl(),
        this.determineFlagYTilePxl(),
        this.map.tsize,
        this.map.tsize,
        this.x - 20,
        this.y - 20,
        this.map.tsize,
        this.map.tsize
    )
  }
}
