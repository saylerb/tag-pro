export default class Dom {
  get buttons() {
    return document.querySelectorAll("button.start-button")
  }

  get canvas() {
    return document.getElementById('game')
  }

  showMenu() {
    document.querySelector('div.start-menu').style.display = 'block'
    document.querySelectorAll('button.start-button').forEach(
      button => button.style.display = 'block')
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

  showGame() {
    this.display(this.canvas)
    this.makeVisible(this.scoreBoard)
  }
}
