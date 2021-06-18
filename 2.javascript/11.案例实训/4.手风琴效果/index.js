//思路：点击标题菜单显示、其他标题的子菜单全部隐藏
var container = document.querySelector(".container");
container.onclick = function (e) {
  //事件委托
  if (e.target.tagName === "H2") {
    //1. 去掉当前具有active样式的div
    var before = container.querySelector(".active");

    var div = e.target.nextElementSibling;
    if (div.classList.contains("active")) {
      return;
    }
    if (before) {
      hideDiv(before); //将列表高度慢慢变为0，隐藏之后再去除active样式
    }
    //2. 给当前的h2元素后面的div加上active类样式
    showDiv(div);
  }
};
function showDiv(div) {
  div.classList.add("active");
  //3. 动画的实现本质：要显示的div列表的高度从0开始慢慢增加到？（div.scrollHeight或者手动设置div高度
  div.style.height = 0;
  var animate = new myPlugin.Animate({
    total: 300,
    begin: {
      height: 0,
    },
    end: {
      height: div.scrollHeight,
    },
    onmove: function (data) {
      div.style.height = data.height + "px";
    },
  });
  animate.start(); //启动动画
}
function hideDiv(div) {
  var animate = new myPlugin.Animate({
    total: 300,
    begin: {
      height: div.scrollHeight,
    },
    end: {
      height: 0,
    },
    onmove: function (data) {
      div.style.height = data.height + "px";
    },
    onover: function () {
      div.classList.remove("active"); //细节：在动画结束后将类样式active去掉
    },
  });
  animate.start(); //启动动画
}
