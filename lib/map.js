export default class Map {
  constructor(blueprint){
    this.cols = blueprint.columns,
    this.rows = blueprint.rows,
    this.tsize = blueprint.tsize
    this.tiles = blueprint.tiles
    this.barriers = blueprint.barriers
    this.tilesImg = this.loadTileImage()
  }

  convertXYtoTileIndex(x, y) {
    let col = Math.floor(x / this.tsize)
    let row = Math.floor(y / this.tsize)
    return row * this.cols + col
  }

  getTileValueAtXY(x, y) {
    return this.tiles[this.convertXYtoTileIndex(x, y)]
  }

  isWallCollision(x, y) {
    let tileValue = this.getTileValueAtXY(x, y)
    return this.barriers.some(barrier => barrier === tileValue)
  }

  loadTileImage() {
    let tilesImg = new Image()
    tilesImg.src = './lib/assets/tiles.png'
    return tilesImg;
  }

  getTile(col, row) {
    return this.tiles[row * this.cols + col];
  }

  render(context) {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        let tile = this.getTile(c, r)
        if (tile !== 0) { // 0 => empty tile
          context.drawImage(
            this.tilesImg, // image
            ((tile - 1) % 16) * this.tsize, // source x
            Math.floor((tile - 1)/16) * this.tsize, // source y
            this.tsize, // source width
            this.tsize, // source height
            c * this.tsize,  // target x
            r * this.tsize, // target y
            this.tsize, // target width
            this.tsize // target height
          )
        }
      }
    }
  }
}
