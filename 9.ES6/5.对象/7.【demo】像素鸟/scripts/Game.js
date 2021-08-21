class Game {
  constructor() {
    this.sky = new Sky(-100);
    this.land = new Land(-100);
    this.bird = new Bird();
    this.pipeProducer = new PipePareProducer(-100); //柱子对生成器
    this.timer = null;
    this.tick = 16; //移动的时间间隔，毫秒
    this.gameOver = false; //游戏是否结束
  }
  start() {
    if (this.timer) {
      return;
    }
    if (this.gameOver) {
      //重新开始游戏
      window.location.reload(); //刷新页面
    }
    this.pipeProducer.startProduce(); //开始生成柱子
    this.timer = setInterval(() => {
      const duration = this.tick / 1000;
      this.sky.move(duration);
      this.land.move(duration);
      this.bird.move(duration);
      this.bird.startSwing();
      this.pipeProducer.pairs.forEach((pair) => {
        pair.move(duration);
      });
      if (this.isGameOver()) {
        this.stop();
        this.gameOver = true;
        console.log("游戏结束");
      }
    }, this.tick);
  }
  /**
   * 判断两个矩形是否碰撞
   * @param {*} rec1
   * @param {*} rec2
   */
  isHit(rec1, rec2) {
    //横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
    //纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
    const centerX1 = rec1.left + rec1.width / 2;
    const centerY1 = rec1.top + rec1.height / 2;
    const centerX2 = rec2.left + rec2.width / 2;
    const centerY2 = rec2.top + rec2.height / 2;
    const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
    const disY = Math.abs(centerY1 - centerY2); //中心点纵向距离
    if (
      disX < (rec1.width + rec2.width) / 2 &&
      disY < (rec1.height + rec2.height) / 2
    ) {
      return true;
    }
  }

  isGameOver() {
    if (this.bird.top === this.bird.maxY) {
      //鸟碰到了大地
      return true;
    }
    for (let i = 0; i < this.pipeProducer.pairs.length; i++) {
      const pair = this.pipeProducer.pairs[i];
      //看柱子对pair 是否和bird进行了碰撞
      if (
        this.isHit(this.bird, pair.upPipe) ||
        this.isHit(this.bird, pair.upPipe)
      ) {
        return true;
      }
    }
    return false;
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    this.bird.stopSwing();
    this.pipeProducer.stopProduce();
  }
  /**
   * 关联键盘事件
   */
  regEvent() {
    window.onkeydown = (e) => {
      if (e.key === "Enter") {
        if (this.timer) {
          this.stop();
        } else {
          this.start();
        }
      } else if (e.key === " ") {
        this.bird.jump();
      }
    };
  }
}

var g = new Game();
g.regEvent();
