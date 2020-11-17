const gameDom = document.querySelector(".game");
const gameStyle = getComputedStyle(gameDom);
const gameWidth = parseFloat(gameStyle.width);
class Pipe extends Rectangle {
  constructor(height, top, speed, dom) {
    super(52, height, gameWidth, top, speed, 0, dom);
  }
}
