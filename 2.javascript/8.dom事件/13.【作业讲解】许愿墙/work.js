var txt = document.querySelector(".txt");
var container = document.querySelector(".container");
var vWidth = document.documentElement.clientWidth; //视口宽度
var vHeight = document.documentElement.clientHeight; //视口高度
var paperWidth = 200,
  paperHeight = 200; //许愿项的宽高
txt.onkeydown = function (e) {
  if (e.key === "Enter") {
    if (this.value) {
      createDiv(this.value);
      this.value = "";
    }
  }
}; //实现动态生成许愿项

container.onclick = function (e) {
  if (e.target.tagName === "I") {
    e.target.parentElement.remove();
  }
}; //实现删除某许愿项

container.onmousedown = function (e) {
  var div = getMoveDom(e.target);
  if (!div) {
    return;
  }
  var style = getComputedStyle(div);
  var prevLeft = parseFloat(style.left);
  var prevTop = parseFloat(style.top);
  window.onmousemove = function (e) {
    prevLeft += e.movementX;
    prevTop += e.movementY;
    if (prevLeft < 0) {
      prevLeft = 0;
    }
    if (prevTop < 0) {
      prevTop = 0;
    }
    if (prevLeft > document.documentElement.clientWidth - paperWidth) {
      prevLeft = document.documentElement.clientWidth - paperWidth;
    }
    if (prevTop > document.documentElement.clientHeight - paperHeight) {
      prevTop = document.documentElement.clientHeight - paperHeight;
    }
    div.style.left = prevLeft + "px";
    div.style.top = prevTop + "px";
  };
  window.onmouseup = window.onmouseleave = function (e) {
    window.onmousemove = null;
  };
}; //实现拖拽

/**
 * 得到可移动的div
 */
function getMoveDom(dom) {
  if (dom.classList.contains("item")) {
    return dom;
  } else if (
    dom.parentElement &&
    dom.parentElement.classList.contains("item") &&
    dom.tagName === "SPAN"
  ) {
    return dom.parentElement;
  }
}

/**
 * 创建相应许愿项
 */
function createDiv(words) {
  var item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `<span>${words}</span>
      <i class="iconfont icon-guanbi"></i>`;
  container.appendChild(item);
  item.style.backgroundColor = `rgb(${getNum(100, 200)},${getNum(
    100,
    200
  )},${getNum(100, 200)})`; //颜色随机
  //随机位置
  item.style.left = getNum(0, vWidth - paperWidth) + "px";
  item.style.top = getNum(0, vHeight - paperHeight) + "px";
}

/**
 * 生成随机数
 */
function getNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

window.onresize = function () {
  //调整所有的div.paper的位置
  var disX = document.documentElement.clientWidth - vWidth;
  var disY = document.documentElement.clientHeight - vHeight;
  Array.from(container.children).forEach((item) => {
    //改变paper的left值
    var style = getComputedStyle(item);
    var left = parseFloat(style.left);
    var top = parseFloat(style.top);
    left += (left / (vWidth - item.clientWidth)) * disX;
    top += (top / (vHeight - item.clientHeight)) * disY;
    item.style.left = left + "px";
    item.style.top = top + "px";
  });
  vWidth = document.documentElement.clientWidth;
  vHeight = document.documentElement.clientHeight;
};

function createInitPapers() {
  var arr = [
    "苍生根本不需要被你拯救",
    "他们不配",
    "太子殿下，你是美玉，让我来教导你吧",
    "在这世上，只有我才配教导你",
    "世上有很多事，你是无能为力的",
    "你想拯救苍生吗？",
    "就要日落了，拿起你的剑，否则，你知道会发生什么",
    "我去你妈的！！！你以为你是谁，敢这样跟我说话？！我可是太子殿下！！！",
    "你没听清吗？那我就再说一次",
  ];
  arr.forEach((item) => {
    createDiv(item);
  });
}
createInitPapers();
