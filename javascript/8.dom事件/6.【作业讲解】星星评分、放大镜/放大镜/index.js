/**
 * 初始化
 */
(function () {
  //1.配置
  var config = {
    smallBg: "images/mouse.jpg", //小图背景路径
    bigBg: "images/mouseBigSize.jpg", //大图背景路径
    divSmall: document.querySelector(".small"), //小图div dom元素
    divMove: document.querySelector(".small .move"), //可移动的div
    divBig: document.querySelector(".big"), //大图div dom元素
    divSmallSize: {
      //小图dom元素尺寸
      width: 350,
      height: 350,
    },
    divBigSize: {
      //大图dom元素尺寸
      width: 540,
      height: 540,
    },
    bigImgSize: {
      //大图尺寸
      width: 900,
      height: 900,
    },
  };
  //3.计算可移动的div的宽高
  config.moveSize = {
    width:
      (config.divBigSize.width / config.bigImgSize.width) *
      config.divSmallSize.width,
    height:
      (config.divBigSize.height / config.bigImgSize.height) *
      config.divSmallSize.height,
  };
  initDivBg();
  initMoveDiv();
  initDivSmallEvent();
  /**
   * 2.初始化div背景图片
   */
  function initDivBg() {
    //设置小图dom元素div背景
    config.divSmall.style.background = `url("${config.smallBg}") left top/350px 350px`;
    //设置大图dom元素div背景
    config.divBig.style.background = `url("${config.bigBg}") left top/900px 900px`;
  }
  /**
   * 4.初始化可移动的div
   */
  function initMoveDiv() {
    config.divMove.style.width = `${config.moveSize.width}px`;
    config.divMove.style.height = `${config.moveSize.height}px`;
  }
  /**
   * 5.初始化小图div的事件
   */
  function initDivSmallEvent() {
    config.divSmall.onmouseover = function () {
      config.divMove.style.display = "block";
      config.divBig.style.display = "block";
    };
    config.divSmall.onmouseout = function () {
      config.divMove.style.display = "none";
      config.divBig.style.display = "none";
    };
    config.divSmall.onmousemove = function (e) {
      //可移动的div的坐标变化
      var offset = getOffset(e);
      setPosition(offset);
      setBigBgPosition();
    };
    /**
     * 6.根据鼠标事件参数，得到鼠标在divSmall中的坐标
     * @param {MouseEvent} e
     */
    function getOffset(e) {
      if (e.target === config.divSmall) {
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      } else {
        //当鼠标的事件源是divMove时：
        var style = getComputedStyle(config.divMove);
        var left = parseFloat(style.left);
        var top = parseFloat(style.top);
        return {
          x: e.offsetX + left + 1,
          y: e.offsetY + top + 1,
        };
      }
    }
    /**
     * 7.根据鼠标坐标，得到divMove的坐标
     * @param {*} offset
     */
    function setPosition(offset) {
      var left = offset.x - config.moveSize.width / 2;
      var top = offset.y - config.moveSize.height / 2;
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      if (left > config.divSmallSize.width - config.moveSize.width) {
        left = config.divSmallSize.width - config.moveSize.width;
      }
      if (top > config.divSmallSize.height - config.moveSize.height) {
        top = config.divSmallSize.height - config.moveSize.height;
      }
      config.divMove.style.left = left + "px";
      config.divMove.style.top = top + "px";
    }
    /**
     * 设置大图背景图位置(大图背景图位置=-divMove坐标位置)
     */
    function setBigBgPosition() {
      var left =
        parseFloat(config.divMove.style.left) /
        (config.moveSize.width / config.divBigSize.width);
      var top =
        parseFloat(config.divMove.style.top) /
        (config.moveSize.height / config.divBigSize.height);
      config.divBig.style.backgroundPositionX = `${-left}px`;
      config.divBig.style.backgroundPositionY = `${-top}px`;
    }
  }
})();
