export default class Keyboard {
  constructor() {
    this.keys = {"leftArrow": false,
                 "upArrow": false,
                 "rightArrow": false,
                 "downArrow": false
    };
  };

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
    };
    this.isKeyPressed()
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
    };
  };


};
