export default class BallCollisions {
  constructor(players){
    this.players = players
    this.playerPairs = this.pairwise(players)
  }

  pairwise(list) {
    var pairs = []
    list.slice(0, list.length - 1)
      .forEach(function (first, n){
        var tail = list.slice(n + 1, list.length)
        tail.forEach(function (item){
          pairs.push([first, item])
        })
      })
    return pairs
  }

  testCollisions(){
    this.playerPairs.forEach(function(pair){
      var ball1 = pair[0]
      var ball2 = pair[1]

      var bdx = ball1.x - ball2.x
      var bdy = ball1.y - ball2.y
      var bdr = ball1.radius + ball2.radius
      var force = (bdr - Math.sqrt(bdx*bdx + bdy*bdy))

      if (bdx * bdx + bdy * bdy < bdr * bdr){
          var theta = Math.atan2(bdy, bdx)
          ball1.dx += force * Math.cos(theta)
          ball2.dx -= force * Math.cos(theta)
          ball1.dy += force * Math.sin(theta)
          ball2.dy -= force * Math.sin(theta)
      }
    })
  }
}
