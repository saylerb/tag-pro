export default class BallCollisions {
  constructor(players, flags){
    this.playerPairs = this.pairwise(players)
    this.flags = flags
  }

  pairwise(list) {
    let pairs = []
    list.slice(0, list.length - 1)
      .forEach(function (first, n){
        let tail = list.slice(n + 1, list.length)
        tail.forEach(function (item){
          pairs.push([first, item])
        })
      })
    return pairs
  }

  testCollisions() {
    this.playerPairs.forEach(pair => {
      let ball1 = pair[0]
      let ball2 = pair[1]

      let bdx = ball1.x - ball2.x
      let bdy = ball1.y - ball2.y
      let bdr = ball1.radius + ball2.radius

      if (bdx * bdx + bdy * bdy < bdr * bdr){
        let theta = Math.atan2(bdy, bdx)
        let force = bdr - Math.sqrt(bdx*bdx + bdy*bdy)
        ball1.dx += force * Math.cos(theta)
        ball2.dx -= force * Math.cos(theta)
        ball1.dy += force * Math.sin(theta)
        ball2.dy -= force * Math.sin(theta)

        this.returnFlag(ball1, ball2)
      }
    })
  }

  returnFlag(ball1, ball2) {
    if (ball1.color !== ball2.color) {
      if (ball1.hasFlag) {
        ball1.hasFlag = false
        let returnedFlag = this.determineFlagToReturn(ball1)
        returnedFlag.isCaptured = false
      }
      if (ball2.hasFlag) {
        ball2.hasFlag = false
        let returnedFlag = this.determineFlagToReturn(ball2)
        returnedFlag.isCaptured = false
      }
    }
  }

  determineFlagToReturn(ball) {
    if (ball.color === 'blue') {
      return this.flags[1]
    } else {
      return this.flags[0]
    }
  }
}
