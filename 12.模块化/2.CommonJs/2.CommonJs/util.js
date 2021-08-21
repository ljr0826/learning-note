(function (module) {
  module.exports = {};
  const exports = module.export;
  let count = 0; //需要隐藏的内部实现
  //要暴露给外部的接口
  function getNumber() {
    count++;
    return count;
  }
  console.log(getNumber());
  console.log(getNumber());
  console.log(getNumber());
  console.log(getNumber());

  exports.getNumber = function () {
    count++;
    return count;
  };

  /**
   * exports:{
   * getNumber:fn,
   * abc:123
   * }
   */
  exports.abc = 123;
  return module.exports; //即module.exports和exports是一个东西
})();
