//游戏对象。通过调用game的开始结束控制天空的移动
var game = {
  dom: document.querySelector(".game"), //游戏dom元素
  overDom: document.querySelector(".game .over"), //游戏结束的dom对象
  isPause: true, //游戏是否是暂停状态。默认是暂停状态
  isOver: false, //游戏是否结束
  start: function () {
    sky.timer.start(); //天空开始移动
    land.timer.start(); //大地开始移动
    bird.swingTimer.start(); //小鸟煽动翅膀
    bird.dropTimer.start(); //小鸟开始下坠
    pipeManager.produceTimer.start(); //生产柱子
    pipeManager.moveTimer.start(); //移动柱子
    hitManager.timer.start(); //碰撞检测器
    this.isPause = false;
  },
  stop: function () {
    sky.timer.stop(); //天空开始暂停
    land.timer.stop(); //大地开始暂停
    bird.swingTimer.stop(); //小鸟停止煽动翅膀
    bird.dropTimer.stop(); //小鸟停止下坠
    pipeManager.produceTimer.stop(); //停止生产柱子
    pipeManager.moveTimer.stop(); //停止移动柱子
    hitManager.timer.stop(); //停止碰撞检测器
    this.isPause = true;
  },
}; //赋值表达式将右边赋值给左边，所以不能在里面直接得到width
game.width = game.dom.clientWidth; //游戏面板的宽度
game.height = game.dom.clientHeight; //游戏面板的宽度

//天空对象(天空能移动、暂停即需要两个函数，函数里面写计时器)
//之后学习模块化，一个天空就是一个js文件。那样就不会很乱了
var sky = {
  left: 0, //当前的left值。天空的top值始终为0
  dom: document.querySelector(".game .sky"),
}; //不用构造函数是因为这里不需要创建多个对象
sky.timer = getTimer(16, sky, function () {
  this.left--;
  if (this.left === -game.width) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
});

//大地对象
var land = {
  left: 0, //当前的left值。天空的top值始终为0
  dom: document.querySelector(".game .land"),
}; //不用构造函数是因为这里不需要创建多个对象
land.height = land.dom.clientHeight; //大地的高度
land.top = game.height - land.height; //计算时需要大地的纵坐标
land.timer = getTimer(16, land, function () {
  this.left -= 2;
  if (this.left === -game.width) {
    this.left = 0;
  }
  this.dom.style.left = this.left + "px";
});

//小鸟。一个计时器改变翅膀状态、一个计时器向下落(不是匀速下落，有重力加速度)
//小鸟横坐标始终没有变化
var bird = {
  dom: document.querySelector(".game .bird"),
  left: 150,
  top: 150,
  width: 33,
  height: 26,
  swingIndex: 0, //小鸟翅膀的状态：0~2
  a: 0.002, //小鸟下落的重力加速度。正数向下加速负数向上加速
  v: 0, //当前小鸟初速度
  t: 16, //小鸟下落运动的时间间隔
  show: function () {
    //处理翅膀
    if (this.swingIndex === 0) {
      this.dom.style.backgroundPosition = "-8px -10px";
    } else if (this.swingIndex === 1) {
      this.dom.style.backgroundPosition = "-60px -10px";
    } else {
      this.dom.style.backgroundPosition = "-113px -10px";
    }
    //设置小鸟的位置
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  }, //显示小鸟即处理小鸟数据
  setTop: function (top) {
    if (top < 0) {
      top = 0;
    } else if (top > land.top - this.height) {
      top = land.top - this.height;
      this.jump(); //小鸟落地时弹跳
    }
    this.top = top;
    this.show();
  }, //设置小鸟的top值
  jump() {
    this.v = -0.5;
  }, //实现按空格键小鸟跳跃。即小鸟的速度变为负数
};
bird.show(); //处理小鸟的翅膀状态
//翅膀计时器
bird.swingTimer = getTimer(200, bird, function () {
  this.swingIndex = (this.swingIndex + 1) % 3;
  this.show();
});
//下坠计时器
bird.dropTimer = getTimer(bird.t, bird, function () {
  var dis = this.v * this.t + 0.5 * this.a * this.t ** 2; //计算小鸟纵坐标移动距离
  this.v += this.a * this.t; //更新小鸟的速度
  this.setTop(this.top + dis); //改变小鸟top值（有限制条件：落地或碰水管）
});

/**
 * //柱子（因为要生成很多柱子，所以使用构造函数正合适）
 * @param {*} direction up down 柱子在上面还是下面
 * @param {*} height 柱子的高度
 */
function Pipe(direction, height) {
  this.width = Pipe.width; //给对象加上宽度属性，方便访问
  this.left = game.width; //柱子刚产生的时候，横坐标为游戏面板的宽度
  this.height = height;
  this.direction = direction;
  //纵坐标
  if (direction === "up") {
    this.top = 0;
  } else {
    this.top = land.top - this.height;
  }
  this.dom = document.createElement("div");
  this.dom.className = "pipe " + direction;
  this.dom.style.height = this.height + "px";
  this.dom.style.top = this.top + "px"; //横坐标可能会变化所以写一个函数
  this.show();
  game.dom.appendChild(this.dom);
}
/**
 * 显示柱子
 */
Pipe.prototype.show = function () {
  this.dom.style.left = this.left + "px";
};

Pipe.width = 52; //柱子的宽度
/**
 * 产生一对柱子的构造函数。每对柱子之间的空隙是一样的、让一个柱子高度随机（60~），另一个就好计算了
 */
function PipePair() {
  var minHeight = 60; //最小高度
  var gap = 150; //空隙
  var maxHeight = land.top - (minHeight + gap); //最大高度
  var h = getRandom(minHeight, maxHeight); //随机高度
  this.up = new Pipe("up", h);
  this.down = new Pipe("down", land.top - h - gap);
  this.left = this.up.left; //这两个的left值初始值一定是一样的，这样写方便后续控制

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
}
/**
 * 显示一对柱子
 */
PipePair.prototype.show = function () {
  this.up.left = this.left;
  this.down.left = this.left;
  this.up.show();
  this.down.show();
};
/**
 * 移除一对柱子
 */
PipePair.prototype.remove = function () {
  this.up.dom.remove();
  this.down.dom.remove();
};

//柱子管理器（写一个对象用于不断创建柱子，并且控制柱子的移动）
var pipeManager = {
  pairs: [], //保存所有的柱子对
};
//生产柱子的计时器
pipeManager.produceTimer = getTimer(1500, pipeManager, function () {
  this.pairs.push(new PipePair());
});
//柱子移动的计时器，柱子的移动应该与大地保持一致
pipeManager.moveTimer = getTimer(16, pipeManager, function () {
  for (var i = 0; i < this.pairs.length; i++) {
    var pair = this.pairs[i];
    pair.left -= 2;
    //柱子超出游戏框左边界即没用了。去除掉
    if (pair.left <= -Pipe.width) {
      pair.remove(); //dom对象的移除
      this.pairs.splice(i, 1); //数组中的移除
      i--;
    } else {
      pair.show();
    }
  }
});

//碰撞检测器：专门用来检测碰撞的
var hitManager = {
  validate: function () {
    if (bird.top >= land.top - bird.height) {
      //与大地碰撞
      return true;
    }
    //检查是否与柱子发生碰撞
    for (var i = 0; i < pipeManager.pairs.length; i++) {
      var pair = pipeManager.pairs[i];
      if (
        this.validateBirdAndPipe(pair.up) ||
        this.validateBirdAndPipe(pair.down)
      ) {
        return true;
      }
    }
    return false;
  }, //验证是否发生碰撞。true碰撞
  /**
   * 辅助函数，判断小鸟和某根柱子是否发生碰撞
   */
  validateBirdAndPipe(pipe) {
    //将小鸟和柱子都看作矩形。分横纵坐标判断
    //横坐标：判断他们中心点的距离是否<=他们各自宽度的一半相加
    var bx = bird.left + bird.width / 2; //小鸟中心点x
    var by = bird.top + bird.height / 2; //小鸟中心点y
    var px = pipe.left + pipe.width / 2; //柱子中心点x
    var py = pipe.top + pipe.height / 2; //柱子中心点y
    if (
      Math.abs(px - bx) <= (bird.width + pipe.width) / 2 &&
      Math.abs(py - by) <= (bird.height + pipe.height) / 2
    ) {
      return true;
    } else {
      return false;
    }
  },
};
hitManager.timer = getTimer(16, hitManager, function () {
  //检测是否碰撞
  if (this.validate()) {
    game.stop(); //碰撞了，游戏结束
    game.overDom.style.display = "block"; //遮罩层显示
    game.isOver = true; //游戏结束
  }
});

/**
 * 得到一个计时器对象，该对象提供了两个方法：
 * 1. start，启动计时器
 * 2. stop，停止计时器
 * 参数为计时器间隔时间、计时器函数的this指向谁、每隔一段时间运行的函数
 */
function getTimer(duration, thisArg, callback) {
  var timer;
  return {
    start: function () {
      if (timer) {
        return;
      }
      timer = setInterval(callback.bind(thisArg), duration);
    },
    stop: function () {
      clearInterval(timer);
      timer = null;
    },
  };
}

//注册事件

window.onkeydown = function (e) {
  if (e.key === "Enter") {
    if (game.isOver) {
      location.reload(); //刷新页面
      return;
    }
    //开始或暂停
    if (game.isPause) {
      //暂停状态就开始
      game.start();
    } else {
      game.stop();
    }
  } else if (e.key === " ") {
    bird.jump();
  }
};
