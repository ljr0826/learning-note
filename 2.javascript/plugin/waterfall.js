if (!window.myPlugin) {
  window.myPlugin = {};
}
/**
 * 创建一个图片瀑布流
 * @param option 用户传进来的配置对象
 */
window.myPlugin.createWaterFall = function (option) {
  var defaultOption = {
    minGap: 10, //水平垂直方向的最小间隙
    // minVGap: 10, //垂直方向的最小间隙。使用不到
    imgSrcs: [], //图片的路径的数组
    imgWidth: 220, //单张图片的宽度固定
    container: document.body, //图片瀑布流容器
  }; //默认配置
  option = Object.assign({}, defaultOption, option); //重新给option参数赋值
  var imgs = []; //存放所有的图片dom对象

  //初步配置完成。
  //创建图片元素、调整图片位置、等往container里面扔、每一件事情都创建一个函数
  createImgs();
  handleParent();
  /**
   * 创建图片元素
   */
  function createImgs() {
    var debounce = myPlugin.debounce(setImgPosition, 50);
    //循环图片路径数组
    option.imgSrcs.forEach((item) => {
      var img = document.createElement("img");
      img.src = item;
      img.style.width = option.imgWidth + "px"; //图片是行盒，默认基线（底部）对齐
      img.style.position = "absolute"; //将图片设置为绝对定位，用js控制图片的坐标。考虑父级的定位。见函数handleParent
      img.style.transition = ".5s"; //css3的一个属性，便是过渡
      imgs.push(img);
      img.onload = debounce; //函数节流
      option.container.appendChild(img);
    });
  }

  /**
   * 处理父元素，因为图片都是绝对定位，父元素必须是一个定位元素
   */
  function handleParent() {
    //如果父元素不是定位元素，则将其变为定位元素
    var style = getComputedStyle(option.container);
    if (style.position === "static") {
      option.container.style.position = "relative";
    }
  }
  /**
   * 设置每一张图片的坐标！
   * 思路：1.先计算一行能排列几张图片、建立一个同等长度的数组表示第几列，值为每一列下一张图片的top值！
   * 2. 设置图片位置时，先得到数组中最小的值即高度最矮的列，图片放到该列，设置top值；
   * 然后实时更新数组该项的top值；得到该项是数组的第几项，用于计算left值（即数组的索引位置决定left值，每一项的值决定top值）
   */
  function setImgPosition() {
    var info = getHorizontalInfo();
    var arr = new Array(info.number); //存放每一列下一张图片的top值
    arr.fill(0);
    imgs.forEach((img) => {
      //设置图片坐标
      var minTop = Math.min.apply(this, arr);
      img.style.top = minTop + "px";
      var index = arr.indexOf(minTop); //找到对应的列编号
      arr[index] += img.clientHeight + info.gap; //注意图片异步加载src路径。没有加载完成时图片高度为0
      //横坐标
      img.style.left = index * (option.imgWidth + info.gap) + "px";
    });
    //设置容器高度
    var maxTop = Math.max.apply(this, arr);
    option.container.style.height = maxTop - info.gap + "px";
  }

  /**
   * 得到图片水平方向上的信息。容器宽度、每行图片数量、横向图片之间的间隙
   */
  function getHorizontalInfo() {
    var obj = {};
    obj.containerWidth = option.container.clientWidth; //容器宽度
    //排列方式有两种：图片和容器之间没有间隙（用这种）、图片和容器之间有空隙
    obj.number = Math.floor(
      (obj.containerWidth + option.minGap) / (option.imgWidth + option.minGap)
    ); //计算一行图片的数量。只能取少不能取多
    obj.gap =
      (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1); //计算水平空隙

    return obj;
  }
  //窗口尺寸变化事件
  var debounce = myPlugin.debounce(setImgPosition, 300);
  window.onresize = debounce;
};
