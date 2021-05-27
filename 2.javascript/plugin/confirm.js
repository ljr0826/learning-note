//若每个通用插件都暴露出来一个全局变量。不好
//怎么做到多个js文件只污染一个全局变量？
if (!window.myPlugin) {
  window.myPlugin = {}; //在window全局对象上添加一个对象。将暴露出来的变量全部添加在该对象上
}
//由于写的东西就是和浏览器相关的，所以可以认为就是浏览器环境
window.myPlugin.openConfirm = (function () {
  var divModal, //遮罩层
    divCenter, //中间的容器
    options,
    btnCancel,
    btnConfirm,
    spanTitle,
    spanClose,
    divContent,
    isRegEvent = false;
  /**
   * 表示打开一个确认对话框
   * 函数里要要做一些事情：遮罩层、
   * 此函数需要污染全局变量。提供外部环境使用
   */
  function openConfirm(opts) {
    if (typeof opts === "string") {
      opts = {
        content: opts,
      };
    }
    if (!opts) {
      opts = {}; //配置若没有传递，默认为一个空对象（空对象里面可以加各种内容）
    }
    options = opts;
    initModal();
    initCenterDiv();
    regEvent();
  }

  /**
   * 初始化遮罩层。要保证这个蒙尘只产生一个
   */
  function initModal() {
    if (!divModal) {
      divModal = document.createElement("div");
      divModal.style.position = "fixed";
      divModal.style.backgroundColor = "rgba(0,0,0,.2)";
      divModal.style.width = divModal.style.height = "100%";
      divModal.style.left = divModal.style.top = 0;
      document.body.appendChild(divModal);
    }
    divModal.style.display = "block";
  }
  /**
   * 初始化中间的div
   */
  function initCenterDiv() {
    if (!divCenter) {
      divCenter = document.createElement("div");
      divCenter.style.position = "absolute";
      divCenter.style.width = "260px";
      divCenter.style.height = "160px";
      divCenter.style.backgroundColor = "#fff";
      divCenter.style.left = divCenter.style.top = divCenter.style.right = divCenter.style.bottom = 0;
      divCenter.style.margin = "auto";
      divCenter.style.fontSize = "14px";
      initDivCenterContent();
      divModal.appendChild(divCenter);
      spanTitle = divCenter.querySelector(`[data-myplugin-id="title"]`);
      spanClose = divCenter.querySelector(`[data-myplugin-id="close"]`);
      divContent = divCenter.querySelector(`[data-myplugin-id="content"]`);
      btnConfirm = divCenter.querySelector(`[data-myplugin-id="confirm"]`);
      btnCancel = divCenter.querySelector(`[data-myplugin-id="cancel"]`);
    }
    //设置配置的内容！
    spanTitle.innerText = options.title || "提示";
    divContent.innerText = options.content || "";
    btnConfirm.innerText = options.confirmText || "确认";
    btnConfirm.className = options.confirmClass || "";
    btnCancel.innerText = options.cancelText || "取消";
    btnCancel.className = options.cancelClass || "";
  }
  /**
   * 初始化divCenter内部的东西
   */
  function initDivCenterContent() {
    //创建内部的标题div
    var div = document.createElement("div");
    div.style.height = "40px";
    div.style.backgroundColor = "#eee";
    div.style.padding = "10px 20px 0";
    div.style.boxSizing = "border-box";
    div.innerHTML = `
    <span style="float:left;" data-myplugin-id="title"></span>
    <span data-myplugin-id="close" style="float:right;cursor:pointer;">
      <img style="width:18px;height:18px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC10lEQVRoQ+2Z36cVURSAv6sikUhERSJRkYhEoqSkRLfUa/9BT+lv6b23SiKRfiiRFImolIhcUhKJRCKLtY9j7HXWmpk9M2doP917ZmbP983+udZeYORlYeT8/BcYugWtFrgE/AWuAF8HhtwIXACWARerLDmBd8A2vfE1cA54M5DEDuAqsFPf/wzYN81SFTgIPKzADiVRhU9Yh4BH6Z9cC1wHzgwsYcHfA47OagG5Js11Ddg+kIQF/xY4C0iPmBRrEO9SiTQW0gNddycL/r3Cv4oM4nTPbpXY2lNLWPAfdCJ5mZtIvIVsj0ps6VjCgv+oX/6FNQt6AvLcXp3KNnckYcF/Uvjns6bwiIA8L3OvDOxNhSUs+CXtNk+99ScqIPXs15bYUEjCgv+sX/6JBy/X6wjI/Qe0Jda3lLDgv+iXfxyBbyIgz8hqLd1pXUMJC/6bfvnJKhuRqNsCqc7D2p3W1pSw4L/rl38QgY4sZJF6jmhLrAlKWPA/FP5u5KV1FrJIfce0JVY7Ehb8T4W/E3lZk4UsUu8JlVhlSMjP01vidNsvhb8deYl1T9MxUK3vpEKuzEjIT2k/ny7/VvhbbeCbzkLWO0+pxAoH6o/C32wLX1pA6jutEhL+5YqEqRLh3SgB34WA1Cl7dunzuSLwsoYUK6XGQAIadQuMegxYs5DVVeZqFrLWAYGXPi8lNybmYh2wVuIEnwasNbAHXYmtvVAVPnUjS2KQvZC1G7XgPYled6NWPODBexK9xANWRBaF9yQ6jcismLguvCfRSUxsZSWawnsSRbMSVl6oLbwnUSQvZGXmSsF7Eq0yc1ZutDS8J9EoN2plp7uC9yRqZaet84Gu4T2J8PlA7oSmL3hPwj2hyZ2R9Q3vSbhnZHLIJyKpFA8Dp+r2/qxuACXtKAKTkgspZfY5r+fE94HGSSePLnj9OLAILAcuA3LUOlMgWO983FY6qO/davQC/wDGAMYxj1q0EAAAAABJRU5ErkJggg==" />
    </span>
    `;
    divCenter.appendChild(div);

    //创建提示文本div
    var div = document.createElement("div");
    div.dataset.mypluginId = "content";
    div.style.height = "70px";
    div.style.padding = "20px";
    div.style.boxSizing = "border-box";
    divCenter.appendChild(div);

    //创建按钮div
    var div = document.createElement("div");
    div.style.height = "50px";
    div.style.padding = "10px 20px";
    div.style.boxSizing = "border-box";
    div.innerHTML = `<button data-myplugin-id="confirm"></button>
    <button data-myplugin-id="cancel"></button>`;
    div.style.textAlign = "right";
    divCenter.appendChild(div);
  }

  //初始化完成之后再注册事件
  function regEvent() {
    if (!isRegEvent) {
      isRegEvent = true;
      spanClose.onclick = function () {
        divModal.style.display = "none";
      };
      divModal.onclick = function (e) {
        if (e.target === this) {
          divModal.style.display = "none";
        }
      }; //点遮罩层关闭。要考虑到：this和e.target
      btnCancel.onclick = function () {
        divModal.style.display = "none";
        if (options.oncancel) {
          options.oncancel();
        }
      };
      btnConfirm.onclick = function () {
        divModal.style.display = "none";
        if (options.onconfirm) {
          options.onconfirm();
        }
      }; //要做的事情由用户决定。即需要传递一个回调函数进来
    }
  }
  return openConfirm; //此函数需要污染全局变量。提供外部环境使用
})();
