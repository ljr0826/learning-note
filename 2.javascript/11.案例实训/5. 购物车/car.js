var lblScore = document.getElementById("integral"); //总积分
var lblPrice = document.getElementById("total"); //总价
var table = document.getElementById("shopping"); //利用事件委托给整个表单注册事件

/**
 * 计算某一行的单价
 * @param {*} tr
 */
function calTrTotal(tr) {
  var info = getTrInfo(tr);
  var total = info.unitPrice * info.number; //计算总价
  tr.querySelector(".cart_td_7").innerText = total.toFixed(2); //将总价保存到相应dom元素的innerText里面
}
/**
 * 得到某一行的所有信息
 * @param {*} tr
 */
function getTrInfo(tr) {
  var unitPrice = +tr.querySelector(".cart_td_5").innerText; //得到单价
  var number = +tr.querySelector(".cart_td_6 input").value; //得到数量
  var score = +tr.querySelector(".cart_td_4").innerText; //得到积分
  var checked = tr.querySelector(".cart_td_1 input").checked; //是否选中
  var total = +tr.querySelector(".cart_td_7").innerText; //得到总价
  return {
    unitPrice, //单价
    number, //数量
    score, //积分
    checked, //是否选中
    total, //总价
  };
}
/**
 * 计算所有tr的总价
 */
function calAllTrTotal() {
  var trs = document.querySelectorAll("tbody tr[id^=product]");
  Array.from(trs).forEach((item) => {
    calTrTotal(item);
  });
}
// calTrTotal(document.getElementById("product1"));

/**
 * 计算所有商品的总价
 */
function calTotal() {
  var sum = 0,
    score = 0;
  var trs = document.querySelectorAll("tbody tr[id^=product]");
  Array.from(trs).forEach((item) => {
    var info = getTrInfo(item);
    if (info.checked) {
      sum += info.total;
      score += info.score * info.number;
    }
  });
  lblPrice.innerText = sum.toFixed(2);
  lblScore.innerText = score;
}
table.onclick = function (e) {
  if (e.target.alt === "add") {
    setInputValue(e.target.previousElementSibling, 1);
  } else if (e.target.alt === "minus") {
    setInputValue(e.target.nextElementSibling, -1);
  } else if (e.target.type === "checkbox") {
    if (e.target.id === "allCheckBox") {
      //得到所有的选中框，让他们和全选框一致
      var cbs = table.querySelectorAll("[name=cartCheckBox]");
      Array.from(cbs).forEach((item) => {
        item.checked = e.target.checked;
      });
    }
    calTotal();
  } else if (e.target.parentElement.className === "cart_td_8") {
    //删除
    deleteTr(e.target.parentElement.parentElement);
  } else if (e.target.alt === "delete") {
    //删除所选
    deleteChecked();
    calTotal();
  }
};
/**
 * 设置input的增量
 * @param {*} inp
 * @param {*} increase
 */
function setInputValue(inp, increase) {
  inp.value = +inp.value + increase; //点击数字+1
  if (inp.value < 1) {
    inp.value = 1;
  }
  reCal(); //更新每一行的价格、所有总价
}
/**
 * 重新计算所有价格
 */
function reCal() {
  calAllTrTotal();
  calTotal();
}
reCal();
/**
 * 删除一行
 * @param {*} tr
 */
function deleteTr(tr) {
  tr.previousElementSibling.remove();
  tr.remove();
  calTotal();
}
/**
 * 删除所选
 */
function deleteChecked() {
  var trs = document.querySelectorAll("tbody tr[id^=product]");
  Array.from(trs).forEach((item) => {
    var info = getTrInfo(item);
    if (info.checked) {
      deleteTr(item);
    }
  });
}
