const landDom = document.querySelector(".land");
const landStyle = getComputedStyle(landDom);
const landWidth = parseFloat(landStyle.width);
const landHeight = parseFloat(landStyle.height);
const landTop = parseFloat(landStyle.top);

class Land extends Rectangle {
  constructor(speed) {
    super(landWidth, landHeight, 0, landTop, speed, 0, landDom);
  }

  onMove() {
    if (this.left <= -landWidth / 2) {
      this.left = 0;
    }
  }
}

const land = new Land(-100);
setInterval(() => {
  land.move(16 / 1000);
}, 16);
