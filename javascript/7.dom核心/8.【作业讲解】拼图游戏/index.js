var game = document.getElementById("game");
//创建小拼图/块
function getMap(div) {
  div.style.float = "left";
  div.style.width = "200px";
  div.style.height = "200px";
  div.style.border = "1px solid #edf4ed";
  div.style.boxSizing = "border-box";
  div.style.backgroundImage = "url(./img/game.jpg)";
  div.style.backgroundRepeat = "no-repeat";
  div.style.backgroundSize = "600px 600px";
  div.style.objectFit = "cover";
  div.style.cursor = "pointer";
  return div;
}
var arr = [];
//纵向创建背景图
for (var y = 1; y <= 3; y++) {
  //横向创建背景图
  for (var x = 1; x <= 3; x++) {
    var div = document.createElement("div");
    getMap(div);
    arr.push(div);
    div.classList.add(`div${y}-${x}`);
    div.style.backgroundPositionX = `${-200 * x + 200}px`;
    div.style.backgroundPositionY = `${-200 * y + 200}px`;
  }
}
// console.log(arr); //arr为完整顺序背景图
arr
  .sort(function () {
    return Math.random() - 0.5;
  })
  .forEach(function (temp, index) {
    temp.classList.add(`${index}`);
    game.appendChild(temp);
  });
console.log(game.children); //随机顺序的背景图
//设置空白位置
var blank = game.querySelector(".div3-1");
blank.style.visibility = "hidden";
//参考元素类名对应空白位置
var newArr = Array.from(game.children);
newArr.forEach(function (temp, index) {
  //添加事件
  temp.onclick = function () {
    if (true) {
      //交换位置
      var changePosition = blank.style.backgroundPosition;
      blank.style.backgroundPositon = index.style.backgroundPosition;
      index.style.backgroundPosition = changePosition;
    }
  };
});
