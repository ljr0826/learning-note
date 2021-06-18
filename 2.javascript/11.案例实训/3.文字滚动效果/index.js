var ul = document.querySelector(".left ul");
var height = 30;
var curTop = 0; //由于浏览器中scrollTop的值不精确。注意。回调函数有形参则没有出现不精确的问题
//无缝滚动！（需要将第一条复制一下放到最后）

//1. 复制li
function cloneFirstLi() {
  var firstLi = ul.children[0].cloneNode(true);
  ul.appendChild(firstLi);
}
cloneFirstLi();
/**
 * 2. 开始滚动。隔一段时间滚动一次
 */
function startScroll() {
  setInterval(scroll, 2000);
}
/**
 * 滚动的时候做什么
 */
function scroll() {
  //应用到动画插件。记得正确引用
  var animate = new myPlugin.Animate({
    total: 500,
    begin: {
      top: curTop,
    },
    end: {
      top: curTop + height,
    },
    onmove: function (data) {
      //重新设置ul的scrollTop
      curTop = data.top;
      ul.scrollTop = curTop;
    },
    onover: function () {
      //怎么判断是不是到底了
      //   console.log(ul.scrollTop, ul.scrollHeight, height);
      if (curTop >= ul.scrollHeight - height) {
        curTop = 0;
        ul.scrollTop = curTop;
      }
    },
  });
  animate.start();
}
startScroll();
