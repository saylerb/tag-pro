export default class Dom {

  get buttons() {
    return document.querySelectorAll("button.start-button")
  }

  get canvas() {
    return document.getElementById('game')
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

  show(element) {
    element.style.display = 'flex'
    element.style.visibility = "visible"
  }

  showGame() {
    this.show(this.canvas)
    this.show(this.scoreBoard)
  }

}
