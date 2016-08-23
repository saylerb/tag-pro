var map = {
  cols: 8,
  rows: 8,
  tsize: 40,
  tiles: [49, 164, 164, 164, 164, 164, 164, 60,
          81, 78, 78, 78, 78, 78, 78, 92,
          81, 78, 78, 78, 78, 78, 78, 92,
          81, 78, 78, 78, 78, 78, 78, 92,
          81, 78, 78, 78, 78, 78, 78, 92,
          81, 78, 78, 78, 78, 78, 78, 92,
          81, 78, 78, 78, 78, 78, 78, 92,
          168, 164, 164, 164, 164, 164, 164, 165
  ],
  getTile: function(col, row){
    return this.tiles[row * map.cols + col];
  }
};

var tilesImg = new Image();
tilesImg.src = './lib/assets/tiles.png';

render = function (context) {
    for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
            var tile = map.getTile(c, r);
            if (tile !== 0) { // 0 => empty tile
                context.drawImage(
                    tilesImg, // image
                    ((tile - 1) % 16) * map.tsize, // source x
                    Math.floor((tile - 1)/16) * map.tsize, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    c * map.tsize,  // target x
                    r * map.tsize, // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

window.onload = function () {
  var canvas = document.getElementById('game');
  var context = canvas.getContext('2d');

  requestAnimationFrame(function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    render(context);
    requestAnimationFrame(gameLoop);
  });
};
