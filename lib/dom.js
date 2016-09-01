export default class Dom {
  get buttons() {
    return document.querySelectorAll("button.start-button")
  }

  get canvases() {
    return document.querySelectorAll("canvas.game-canvas")
  }

  showMenu() {
    document.querySelector('div.start-menu').style.display = 'block'
    document.querySelectorAll('button.start-button').forEach(
      button => button.style.display = 'block')
    document.getElementById('total-score-container').style.display = 'flex'
  }

  get scoreBoard() {
    return document.getElementById('score-board-container')
  }

  level(event) {
   return event.currentTarget.getAttribute("id")
  }
  
  listenOn(element, type, fn) {
    element.addEventListener(type, fn)
  }

  hide(element) {
    element.style.display = 'none'
  }

  hideScoreboard() {
    this.scoreBoard.style.visibility = 'hidden'
  }

  makeVisible(element) {
    element.style.visibility = "visible"
  }

  display(element) {
    element.style.display = 'block'
  }

  hideGame() {
    Array.from(this.canvases).forEach(canvas => this.hide(canvas))
    this.hideScoreboard()
  }

  showGame() {
    Array.from(this.canvases).forEach(canvas => this.display(canvas))
    this.makeVisible(this.scoreBoard)
    this.hide(document.getElementById('total-score-container'))
  }
}
