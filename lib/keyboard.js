export default class Keyboard {
  constructor() {
    this.keys = {
      "leftArrow": false,
      "upArrow": false,
      "rightArrow": false,
      "downArrow": false,
      "A": false,
      "W": false,
      "D": false,
      "S": false
    }
  }

  listenForEvents() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    return this;
  };

  isKeyPressed() {
    var flag = false
    for (let prop in this.keys) {
      if (this.keys[prop]) {
        flag = true
      }
    }
    return flag
  }

  onKeyDown(event){
    if (event.keyCode == 37) {
      this.keys.leftArrow = true;
    } else if (event.keyCode == 38) {
      this.keys.upArrow = true;
    } else if (event.keyCode == 39) {
      this.keys.rightArrow = true;
    } else if (event.keyCode == 40) {
      this.keys.downArrow = true;
    } else if (event.keyCode == 65) {
      this.keys.A = true;
    } else if (event.keyCode == 87) {
      this.keys.W = true;
    } else if (event.keyCode == 68) {
      this.keys.D = true;
    } else if (event.keyCode == 83) {
      this.keys.S = true;
    };
  };

  onKeyUp(event){
    if (event.keyCode == 37) {
      this.keys.leftArrow = false;
    } else if (event.keyCode == 38) {
      this.keys.upArrow = false;
    } else if (event.keyCode == 39) {
      this.keys.rightArrow = false;
    } else if (event.keyCode == 40) {
      this.keys.downArrow = false;
    } else if (event.keyCode == 65) {
      this.keys.A = false;
    } else if (event.keyCode == 87) {
      this.keys.W = false;
    } else if (event.keyCode == 68) {
      this.keys.D = false;
    } else if (event.keyCode == 83) {
      this.keys.S = false;
    };
  };
};
