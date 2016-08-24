export default class Map {
  constructor(){
    this.cols = 8,
    this.rows = 8,
    this.tsize = 40,
    this.tiles = [49, 164, 164, 164, 164, 164, 164, 60,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  81, 78, 78, 78, 78, 78, 78, 92,
                  168, 164, 164, 164, 164, 164, 164, 165
                  ]
    this.tilesImg = this.loadTileImage()
  }

  loadTileImage() {
    var tilesImg = new Image();
    tilesImg.src = './lib/assets/tiles.png';
    return tilesImg;
  };

  getTile(col, row) {
    return this.tiles[row * this.cols + col];
  };

  render(context) {
    for (var c = 0; c < this.cols; c++) {
        for (var r = 0; r < this.rows; r++) {
            var tile = this.getTile(c, r);
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
                );
            }
        }
    }
  };
};