const birdDom = document.querySelector(".game .bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
  constructor() {
    super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
    this.g = 1500; //小鸟特有的向下的加速度。单位：像素/秒
    this.maxY = gameHeight - landHeight - this.height;
    this.swingStatus = 1; //小鸟的翅膀状态
    this.timer = null; //翅膀扇动的计时器
    this.render();
  }
  render() {
    super.render(); //重用父类的渲染逻辑
    this.dom.className = `bird swing${this.swingStatus}`;
  }
  //开始扇动翅膀
  startSwing() {
    if (this.timer) {
      return;
    }
    this.timer = setInterval(() => {
      this.swingStatus = (this.swingStatus % 3) + 1;
      this.render();
    }, 300);
  }
  //结束煽动翅膀
  stopSwing() {
    clearInterval(this.timer);
    this.timer = null;
  }
  move(duration) {
    super.move(duration);
    //根据加速度改变速度
    this.ySpeed += this.g * duration;
  }
  onMove() {
    if (this.top < 0) {
      this.top = 0;
    } else if (this.top > this.maxY) {
      this.top = this.maxY;
    }
  }
  jump() {
    this.ySpeed = -450;
  } //直接给小鸟一个向上的速度它就会跳
}
