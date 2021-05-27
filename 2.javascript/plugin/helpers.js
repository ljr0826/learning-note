if (!this.myPlugin) {
  this.myPlugin = {}; //将这些方法都添加到一个对象里。避免过多的变量污染
} //最好不要假设它就是浏览器环境。因为之后还会学习其他环境。所以用this表示当前的全局环境
this.myPlugin.inherit = (function () {
  // var Temp = function () {};
  return function (son, father) {
    //有很多花式改发
    // son.prototype = father.prototype; //目标。但由于引用类型，这样不对
    // Temp.prototype = father.prototype;
    // son.prototype = new Temp(); //Object.create()方法没有出现之前使用的是这种方法
    son.prototype = Object.create(father.prototype); //Object.create(User.prototype).__proto__ === User.prototype
    //细节：constructor的指向？son.prototype.hasOwnProperty('constructor');false
    son.prototype.constructor = son; //解决constructor指向问题
    son.prototype.uber = father.prototype; //为了操作方便加的东西。uber表示父级的意思，因为super被占用所以不能用。圣杯模式标准方法
    //现在使用Object.getPrototypeOf(son)就能很方便的获取son.__proto__。所以uber可用于低版本的浏览器的兼容写法没大用
    // son.prototype.uber = father; //袁老师的想法。这样的话通过构造函数创建对象可以使用this.uber(参数...)代替User.call(this,参数...)
  };
})();
