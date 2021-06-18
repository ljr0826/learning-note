const skyDom = document.querySelector(".sky");
const skyStyle = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyle.width);
const skyHeight = parseFloat(skyStyle.height);

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

const sky = new Sky(-50);
setInterval(() => {
  sky.move(16 / 1000);
}, 16);
