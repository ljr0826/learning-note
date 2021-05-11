/**
 * 初始化
 */
(function init() {
  var config = {
    smallBg: "images/mouse.jpg", //小图背景路径
    bigBg: "images/mouseBigSize.jpg", //大图背景路径
    divBig: document.querySelector("div.big"), //大图div dom元素
    divSmall: document.querySelector("div.small"), //小图div dom元素
    divMove: document.querySelector(".small .move"), //可移动的div元素
    smallImgSize: {
      width: 350,
      height: 350,
    }, //小图尺寸，也是小的div尺寸
    bigImgSize: {
      width: 800,
      height: 800,
    }, //大图尺寸
    divBigSize: {
      width: 540,
      height: 540,
    }, //大的div尺寸
  }; //配置
  //计算可移动的div的宽高
  config.moveSize = {
    width:
      (config.divBigSize.width / config.bigImgSize.width) *
      config.smallImgSize.width,
    height:
      (config.divBigSize.height / config.bigImgSize.height) *
      config.smallImgSize.height,
  };
  // console.log(getComputedStyle(config.divMove).left); //auto
  initDivBg();
  initMoveDiv();
  initDivSmallEvent();
  /**
   * 初始化div背景
   */
  function initDivBg() {
    config.divSmall.style.background = `url(${config.smallBg}) no-repeat 0 0/100% 100%`;
    config.divBig.style.background = `url(${config.bigBg}) no-repeat`;
    config.divBig.style.backgroundSize = `${config.bigImgSize.width}px ${config.bigImgSize.height}px`;
  }

  /**
   * 初始化可移动的div
   */
  function initMoveDiv() {
    config.divMove.style.width = config.moveSize.width + "px";
    config.divMove.style.height = config.moveSize.height + "px";
  }

  /**
   * 初始化小div的事件
   */
  function initDivSmallEvent() {
    config.divSmall.onmouseenter = function () {
      config.divMove.style.display = "block";
      config.divBig.style.display = "block";
    };
    config.divSmall.onmouseleave = function () {
      config.divMove.style.display = "none";
      config.divBig.style.display = "none";
    };
    config.divSmall.onmousemove = function (e) {
      var offset = getOffset(e);
      setPosition(offset);
      setBigBgPosition();
    };
    /**
     * 设置大图背景图位置
     */
    function setBigBgPosition() {
      var style = getComputedStyle(config.divMove);
      var left = parseFloat(style.left);
      var top = parseFloat(style.top);
      var bgLeft = (left / config.smallImgSize.width) * config.bigImgSize.width;
      var bgTop = (top / config.smallImgSize.height) * config.bigImgSize.height;
      config.divBig.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
    }
    /**
     * 根据鼠标坐标设置divMove的坐标
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
      if (left > config.smallImgSize.width - config.moveSize.width) {
        left = config.smallImgSize.width - config.moveSize.width;
      }
      if (top > config.smallImgSize.height - config.moveSize.height) {
        top = config.smallImgSize.height - config.moveSize.height;
      }
      config.divMove.style.left = left + "px";
      config.divMove.style.top = top + "px";
    }
    /**
     * 根据鼠标事件参数得到鼠标在divSmall中的偏移量
     * @param {MouseEvent} e
     */
    function getOffset(e) {
      if (e.target === config.divSmall) {
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      } else {
        //鼠标的事件源是divMove
        var style = getComputedStyle(config.divMove);
        var left = parseFloat(style.left);
        var top = parseFloat(style.top);
        return {
          x: e.offsetX + left + 1,
          y: e.offsetY + top + 1, //加1是边框值
        };
      }
    }
  }
})();
