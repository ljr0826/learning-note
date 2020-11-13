//面试题
function getContainer() {
  console.log("abc"); //abc打印两次
  return document.getElementById("container");
}

/**
 * 创建一个元素
 * @param {*} name 元素的名称
 * @param {*} container 元素的父元素
 * @param {*} content 元素的内容
 */
function createElement(name = "div", container = getContainer(), content = "") {
  const ele = document.createElement(name);
  if (content) {
    ele.innerHTML = content;
  }
  container.appendChild(ele);
}
createElement(undefined, undefined, "天官赐福");
createElement(undefined, undefined, "百无禁忌");
