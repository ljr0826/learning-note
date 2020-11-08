//1.第一步，做一个大体的分析：背景图片(类似雪碧图)；格式、区域大小最好可以配置；使用js代码更加灵活
/**
 * 游戏配置
 */
var gameConfig = {
  width: 690,
  height: 626,
  rows: 3, //行数
  cols: 3, //列数
  isOver: false, //游戏是否结束
  imgurl: "img/game.jpg", //图片路径,注意：相对的是页面路径
  dom: document.getElementById("game"), //游戏的dom对象
};
//每一小块的宽高
gameConfig.pieceWidth = gameConfig.width / gameConfig.cols;
gameConfig.pieceHeight = gameConfig.height / gameConfig.rows;
//小块的数量
gameConfig.pieceNumber = gameConfig.rows * gameConfig.cols;
var blocks = []; //包含小方块信息的数组

function isEqual(n1, n2) {
  return parseInt(n1) === parseInt(n2);
}

/**
 * 小方块的构造函数
 * @param {*} left
 * @param {*} top
 * @param {*} isVisible 是否可见
 */
function Block(left, top, isVisible) {
  this.left = left; //当前的横坐标
  this.top = top; //当前的纵坐标
  this.correctLeft = this.left; //正确的横坐标
  this.correctTop = this.top; //正确的纵坐标
  this.isVisible = isVisible; //是否可见
  this.dom = document.createElement("div");
  this.dom.style.width = gameConfig.pieceWidth + "px";
  this.dom.style.height = gameConfig.pieceHeight + "px";
  this.dom.style.background = `url("${gameConfig.imgurl}") -${this.correctLeft}px -${this.correctTop}px`;
  this.dom.style.position = "absolute";
  this.dom.style.border = "1px solid #fff";
  this.dom.style.boxSizing = "border-box";
  this.dom.style.transition = ".5s";
  this.dom.style.cursor = "pointer";
  if (!isVisible) {
    this.dom.style.display = "none";
  }
  gameConfig.dom.appendChild(this.dom);
  this.show = function () {
    //根据当前的left、top，重新设置div的位置
    this.dom.style.left = this.left + "px";
    this.dom.style.top = this.top + "px";
  };
  //判断当前方块是否在正确的位置上
  this.isCorrect = function () {
    return (
      isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop)
    );
  };
  this.show();
}

/**
 * 初始化游戏
 */
function init() {
  //1.初始化游戏的容器
  initGameDom();
  //2.初始化小方块(最好有一个数组记录每一个div的相关信息)
  //2.1准备好一个数组，数组的每一项是一个对象，记录了每一个小方块的信息
  initBlocksArray();
  //2.2数组洗牌
  shuffle();
  //3.注册点击事件
  regEvent();
  /**
   *处理点击事件
   */
  function regEvent() {
    //找到看不见的方块
    var inVisibleBolck = blocks.find(function (b) {
      return !b.isVisible;
    });
    blocks.forEach(function (b) {
      b.dom.onclick = function () {
        if (gameConfig.isOver) {
          return;
        }
        //判断是否可以交换
        if (
          (b.top === inVisibleBolck.top &&
            isEqual(
              Math.abs(b.left - inVisibleBolck.left),
              gameConfig.pieceWidth
            )) ||
          (b.left === inVisibleBolck.left &&
            isEqual(
              Math.abs(b.top - inVisibleBolck.top),
              gameConfig.pieceHeight
            ))
        ) {
          //交换当前方块和看不见的方块的坐标位置
          exchange(b, inVisibleBolck);
          //游戏结束判定
          isWin();
        }
      };
    });
  }

  /**
   * 游戏结束判定
   */
  function isWin() {
    var wrongs = blocks.filter(function (item) {
      return !item.isCorrect();
    });
    if (wrongs.length === 0) {
      //游戏结束，去掉所有边框
      blocks.forEach(function (b) {
        b.dom.style.border = "none";
        b.dom.style.display = "block";
      });
    }
  }

  /**
   * 随机数，能取到最大值
   * @param {*} min
   * @param {*} max
   */
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  /**
   * 交换两个方块的left和top
   * @param {*} b1
   * @param {*} b2
   */
  function exchange(b1, b2) {
    var temp = b1.left;
    b1.left = b2.left;
    b2.left = temp;
    var temp = b1.top;
    b1.top = b2.top;
    b2.top = temp;
    b1.show();
    b2.show();
  }

  /**
   * 给blocks数组洗牌
   */
  function shuffle() {
    for (var i = 0; i < blocks.length; i++) {
      //随机产生一个下标
      var index = getRandom(0, blocks.length - 1);
      //将数组的当前项与随机项交换left和top值
      exchange(blocks[i], blocks[index]);
    }
  }
  /**
   * 初始化一个小方块数组
   */
  function initBlocksArray() {
    for (var i = 0; i < gameConfig.rows; i++) {
      for (var j = 0; j < gameConfig.cols; j++) {
        //i行号，j列号
        var isVisible = true;
        if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
          isVisible = false;
        }
        var b = new Block(
          j * gameConfig.pieceWidth,
          i * gameConfig.pieceHeight,
          isVisible
        );
        blocks.push(b);
      }
    }
  }
  /**
   * 初始化游戏容器
   */
  function initGameDom() {
    gameConfig.dom.style.width = gameConfig.width + "px";
    gameConfig.dom.style.height = gameConfig.height + "px";
    gameConfig.dom.style.border = "2px solid #ccc";
    gameConfig.dom.style.position = "relative";
  }
}
init();
