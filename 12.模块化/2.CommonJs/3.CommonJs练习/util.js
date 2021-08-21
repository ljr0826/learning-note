module.exports = {
  /**
   * 将一个数组的内容打乱
   * @param {*} arr 数组
   */
  sortRandom(arr) {
    arr.sort(function (a, b) {
      return Math.random() - 0.5;
    });
  },
  /**
   * 打印一个扑克牌的数组
   * @param {*} pokers
   */
  print(pokers) {
    let str = "";
    for (const poker of pokers) {
      str += poker.toString() + "    ";
    }
    console.log(str);
  },
};
