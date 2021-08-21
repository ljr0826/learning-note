const skyDom = document.querySelector(".game .sky");
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {
  constructor(speed) {
    super(skyWidth, skyHeight, 0, 0, speed, 0, skyDom);
  }
  onMove() {
    if (this.left <= -skyWidth / 2) {
      this.left = 0;
    }
  }
}
