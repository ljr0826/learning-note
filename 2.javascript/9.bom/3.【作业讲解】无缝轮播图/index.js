//配置
var config = {
  imgWidth: 500, //图片的宽度
  dotWidth: 12, //圆点的宽度
  doms: {
    divBanner: document.querySelector(".banner"),
    divImgs: document.querySelector(".banner .imgs"),
    divDots: document.querySelector(".banner .dots"),
    divArrow: document.querySelector(".banner .arrow"),
  },
  currentIndex: 0, //实际的图片索引位置。0~imgNmuber。此值要实时变化
  timer: {
    duration: 16, //运动的时间间隔，单位ms
    total: 2000, //运动的总时间，单位ms
    id: null,
  }, //计时器相关配置信息
  autoTimer: null, //自动计时器id
};
config.imgNumber = config.doms.divImgs.children.length; //初始时图片的数量
/**
 * 初始化元素尺寸
 */
function initSize() {
  config.doms.divImgs.style.width =
    config.imgWidth * (config.imgNumber + 2) + "px"; //+2是因为前后多了两个图片
  config.doms.divDots.style.width = config.dotWidth * config.imgNumber + "px";
}
/**
 * 初始化元素
 */
function initElement() {
  for (var i = 0; i < config.imgNumber; i++) {
    var div = document.createElement("span"); //创建相应小圆点
    config.doms.divDots.appendChild(div);
  }

  var children = config.doms.divImgs.children;
  var newImg1 = children[0].cloneNode(true),
    newImg5 = children[children.length - 1].cloneNode(true);
  config.doms.divImgs.insertBefore(newImg5, children[0]);
  config.doms.divImgs.appendChild(newImg1); //图片前后各插入一张
}
/**
 * 初始化图片的位置
 */
function initPosition() {
  config.doms.divImgs.style.marginLeft =
    -(config.currentIndex + 1) * config.imgWidth + "px";
}
/**
 * 设置小圆点的选中类样式
 */
function setDotStatus() {
  Array.from(config.doms.divDots.children).forEach((item) => {
    item.classList.remove("active");
  });
  config.doms.divDots.children[config.currentIndex].classList.add("active");
}

/**
 * 初始化方法汇总
 */
function init() {
  initSize();
  initElement();
  initPosition();
  setDotStatus();
}
init();
/**
 * 切换到某一个图片的索引位
 * @param {*} index 目标索引
 * @param {*} direction 方向 "left" "right"
 */
function switchTo(index, direction) {
  if (index === config.currentIndex) {
    return;
  }
  if (!direction) {
    direction = "right";
  }
  //1. 重新设置divImgs的marginLeft
  var newLeft = -(index + 1) * config.imgWidth; //目标marginLeft
  //1.1 逐步改变marginLeft
  animateSwitch();
  //2. 重新设置小圆点选中样式
  config.currentIndex = index;
  setDotStatus();

  /**
   * 1.1逐步改变marginLeft
   */
  function animateSwitch() {
    stopAnimate(); //先停止之前的动画。再开始新的动画
    //1.1.1计算运动的次数
    var number = Math.ceil(config.timer.total / config.timer.duration); //计时器需要运动的次数
    var curNumber = 0; //当前计时器运行的次数

    //1.1.2计算需要改变的总距离
    var distance, //需要移动的总距离
      prevLeft = parseFloat(getComputedStyle(config.doms.divImgs).marginLeft),
      totalWidth = config.imgWidth * config.imgNumber;
    if (direction === "right") {
      if (newLeft > prevLeft) {
        distance = newLeft - prevLeft; //+
      } else {
        distance = totalWidth - Math.abs(newLeft - prevLeft); //+
      }
    } else {
      if (newLeft < prevLeft) {
        distance = newLeft - prevLeft; //-
      } else {
        distance = -(totalWidth - Math.abs(newLeft - prevLeft)); //-
      }
    }
    //1.1.3计算每次改变的距离。转折点重要看这里
    var everyDistance = distance / number;
    config.timer.id = setInterval(function () {
      prevLeft += everyDistance; //每次移动的距离
      if (direction === "left" && Math.abs(prevLeft) > totalWidth) {
        prevLeft += totalWidth;
      }
      if (direction === "right" && Math.abs(prevLeft) < config.imgWidth) {
        prevLeft -= totalWidth;
      }
      config.doms.divImgs.style.marginLeft = prevLeft + "px";
      curNumber++;
      if (curNumber === number) {
        stopAnimate();
      }
    }, config.timer.duration);

    /**
     * 停止动画
     */
    function stopAnimate() {
      clearInterval(config.timer.id);
      config.timer.id = null;
    }
  }
}

function toLeft() {
  var index = config.currentIndex - 1;
  if (index < 0) {
    index = config.imgNumber - 1;
  }
  switchTo(index, "right");
}
function toRight() {
  var index = config.currentIndex + 1;
  if (index === config.imgNumber) {
    index = 0;
  }
  switchTo(index, "left");
}

config.doms.divArrow.onclick = function (e) {
  if (e.target.classList.contains("left")) {
    toLeft();
  } else if (e.target.classList.contains("right")) {
    toRight();
  }
};
config.doms.divDots.onclick = function (e) {
  if (e.target.tagName === "SPAN") {
    var index = Array.from(this.children).indexOf(e.target);
    if (index > config.currentIndex) {
      switchTo(index, "left");
    } else {
      switchTo(index, "right");
    }
  }
};
config.autoTimer = setInterval(toRight, 2000);
config.doms.divBanner.onmouseenter = function (e) {
  clearInterval(config.autoTimer);
  config.autoTimer = null;
};
config.doms.divBanner.onmouseleave = function (e) {
  if (config.autoTimer) {
    return;
  }
  config.autoTimer = setInterval(toRight, 2000);
};
