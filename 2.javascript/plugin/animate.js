if (!this.myPlugin) {
  this.myPlugin = {};
}
/**
 * 构造函数。用new调用
 */
this.myPlugin.Animate = function (option) {
  var defaultOption = {
    duration: 16, //默认间隔时间
    total: 1000, //默认动画总时间
    begin: {}, //数字初始值
    end: {}, //数字结束值。属性要和初始值相对应
  };
  this.option = Object.assign({}, defaultOption, option);
  //需要用到的属性
  this.timer = null; //计时器id
  this.number = Math.ceil(this.option.total / this.option.duration); //需要运动的总次数
  this.curNum = 0; //当前运动的次数
  this.curData = myPlugin.clone(this.option.begin); //当前状态。使用克隆避免引用值赋值对最初传递的数值产生影响
  this.distance = {}; //所有属性运动的总距离
  this.everyDisance = {}; //所有属性每次运动的距离
  for (var prop in this.option.begin) {
    this.distance[prop] = this.option.end[prop] - this.option.begin[prop];
    this.everyDisance[prop] = this.distance[prop] / this.number;
  }
};
//方法建议书写到prototype中
/**
 * 启动动画
 */
this.myPlugin.Animate.prototype.start = function () {
  if (this.timer || this.curNum === this.number) {
    return; //如果之前已经存在计时器。则不做任何处理
  }
  //调用开始的时候判断。如果配置里面有开始则调用它
  if (this.option.onstart) {
    this.option.onstart();
  }
  var that = this;
  this.timer = setInterval(function () {
    that.curNum++; //当前运动次数+1
    //每次运动改变that.cueDate
    for (var prop in that.curData) {
      if (that.curNum === that.number) {
        //运动完成之后。做一下处理（解决js小数运算不精确问题）
        that.curData[prop] = that.option.end[prop];
      } else {
        that.curData[prop] += that.everyDisance[prop];
      }
    }
    if (that.option.onmove) {
      that.option.onmove(that.curData); //每次变化时希望将当前的数据作为参数传递进来
    }
    if (that.curNum === that.number) {
      that.stop();
      if (that.option.onover) {
        that.option.onover.call(that);
      }
    }
  }, this.option.duration); //计时器的参数函数运行时是js引擎在调用它。this指向window
};
/**
 * 停止动画
 */
this.myPlugin.Animate.prototype.stop = function () {
  clearInterval(this.timer);
  this.timer = null;
};
