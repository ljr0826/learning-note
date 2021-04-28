/**
 * 配置
 */
var config = {
  container: document.getElementById("container"),
  inp: document.querySelector("input"),
  clientWidth: document.documentElement.clientWidth,
  clientHeight: document.documentElement.clientHeight, //视口宽高
  divWidth: 170,
  divHeight: 170, //div宽高
  zIndex: 1,
};
//inp上添加回车创建元素事件
config.inp.onkeydown = function (e) {
  if (e.key === "Enter") {
    createDiv();
    config.inp.value = "";
  }
};
/**
 * 创建新的元素div
 */
function createDiv() {
  var div = document.createElement("div"); //创建许愿框
  div.className = "paper"; //加许愿框类名
  div.style.backgroundColor = `rgb(${getRandom(100, 200)},${getRandom(
    100,
    200
  )},${getRandom(100, 200)})`; //许愿框颜色随机
  div.style.left = getRandom(0, config.clientWidth - config.divWidth) + "px";
  div.style.top =
    getRandom(0, config.clientHeight - config.divHeight - 80) + "px"; //许愿框位置相对视口随机
  div.style.zIndex++;
  config.container.appendChild(div);
  createP(div);
  createSpan(div);
  //div上添加拖拽事件
  div.onmousedown = function (e) {
    if (e.button !== 0) {
      return false;
    }
    window.onmousemove = function (e) {
      div.style.left = parseFloat(div.style.left) + e.movementX + "px";
      div.style.top = parseFloat(div.style.top) + e.movementY + "px";
    };
  };
  div.onmouseup = div.onmouseleave = function (e) {
    window.onmousemove = null;
  };
}
/**
 * 添加文本框p
 */
function createP(div) {
  var p = document.createElement("p");
  p.innerHTML = config.inp.value; //加入许愿框内容
  div.appendChild(p);
}
/**
 * 添加删除框span
 */
function createSpan(div) {
  var span = document.createElement("span");
  span.innerHTML = "X"; //加入删除框
  div.appendChild(span);
  //span上添加删除事件
  span.onclick = function (e) {
    this.parentElement.remove();
  };
}
/**
 * 获取随机颜色
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
