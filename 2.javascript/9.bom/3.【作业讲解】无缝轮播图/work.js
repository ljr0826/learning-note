/**
 * 配置
 */
var config = {
  left: document.querySelector(".banner .arrow .left"), //左箭头
  right: document.querySelector(".banner .arrow .right"), //右箭头
  imgs: document.querySelector(".banner .imgs"), //照片容器
  dots: document.querySelector(".banner .dots"), //圆点容器
  width: 520,
  height: 280,
  num: 3, //图片数量
};
config.imgs.style.transition = ".5s";
//创建span元素
for (var i = 0; i < config.imgs.children.length; i++) {
  var span = document.createElement("span");
  config.dots.appendChild(span);
}
//左键点击事件
config.imgs.style.marginLeft = 0; //初始左外边距
config.left.onclick = function () {
  config.imgs.style.marginLeft =
    parseInt(config.imgs.style.marginLeft) + config.width + "px";
  if (config.imgs.style.marginLeft === "520px") {
    config.imgs.style.marginLeft = "-1040px";
  }
  console.log(config.imgs.style.marginLeft, "左边");
};
//右键点击事件
config.right.onclick = function () {
  config.imgs.style.marginLeft =
    parseInt(config.imgs.style.marginLeft) - config.width + "px";
  if (config.imgs.style.marginLeft === "-1560px") {
    config.imgs.style.marginLeft = 0;
  }
  console.log(config.imgs.style.marginLeft, "右边");
};
var timer = setInterval(function () {
  config.imgs.style.marginLeft =
    parseInt(config.imgs.style.marginLeft) - config.width + "px";
  if (config.imgs.style.marginLeft === "-1560px") {
    config.imgs.style.marginLeft = 0;
  }
  console.log(config.imgs.style.marginLeft, "右边");
}, 1000);
//圆点点击事件
config.dots.onclick = function (e) {
  span.classList.remove("active");
  if (e.target.tagName === "SPAN") {
    e.target.classList.add("active");
  }
};
