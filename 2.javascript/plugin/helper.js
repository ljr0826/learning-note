if (!this.myPlugin) {
  this.myPlugin = {};
}
/**
 * 继承
 */
this.myPlugin.inherit = (function () {
  //面试可能会考的
  function Temp() {}
  return function (Son, Father) {
    Temp.prototype = Father.prototype;
    Son.prototype = new Temp();
    Son.prototype.constructor = Son;
    Son.prototype.uber = Father.prototype;
  };
})();
// this.myPlugin.inherit = function (Son, Father) {
//   //袁老师思路，后续会有更简单的方法
//   Son.prototype = Object.create(Father.prototype);
//   Son.prototype.constructor = Son;
//   Son.prototype.uber = Father;
// };
/**
 * 对象混合：obj2混合到obj1产生的新的对象
 */
this.myPlugin.mixin = function (obj1, obj2) {
  //   var newObj = Object.assign({}, obj1, obj2);
  var newObj = {};
  //复制obj2的属性
  for (var prop in obj2) {
    newObj[prop] = obj2[prop];
  }
  //复制obj1中独有的属性
  for (var prop in obj1) {
    if (!(prop in obj2)) {
      newObj[prop] = obj1[prop];
    }
  }
  return newObj;
};
/**
 * 克隆一个对象
 * @param {boolean} deep 是否深度克隆
 */
this.myPlugin.clone = function (obj, deep) {
  //数组克隆
  if (Array.isArray(obj)) {
    if (deep) {
      var newArr = [];
      for (var prop in obj) {
        newArr.push(this.clone(obj[prop], deep));
      }
      return newArr;
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    //对象克隆
    var newObj = {};
    for (var prop in obj) {
      if (deep) {
        newObj[prop] = this.clone(obj[prop], deep);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    //原始类型、函数
    return obj;
  }
};
/**
 * 函数防抖：等到一定时间后再做一件事
 */
this.myPlugin.debounce = function (callback, time) {
  var timer; //开启一个计时器，避免污染全局变量
  return function () {
    clearTimeout(timer); //清除之前的计时
    var args = arguments; //利用闭包保存参数数据
    timer = setTimeout(function () {
      callback.apply(null, args);
    }, time);
  };
};
/**
 * 函数节流：保证一个时间段内执行一次
 */
this.myPlugin.throttle = function (callback, time, immediately) {
  if (immediately === undefined) {
    immediately = true;
  }
  if (immediately) {
    var t; //用来记录时间戳
    return function () {
      if (!t || Date.now() - t >= time) {
        //之前没有计时或距离上次执行的时间已经超过
        callback.apply(null, arguments);
        t = Date.now(); //得到当前事件戳
      }
    };
  } else {
    var timer; //开启一个计时器，避免污染全局变量
    return function () {
      if (timer) {
        return;
      }
      var args = arguments; //利用闭包保存参数数据
      timer = setTimeout(function () {
        callback.apply(null, args);
        timer = null;
      }, time);
    };
  }
};
/**
 * 柯里化函数
 * 在函数式编程中，柯里化最重要的作用是把多参函数变成单参函数
 */
this.myPlugin.curry = function (func) {
  //得到从下标1开始的参数数组
  var args = Array.prototype.slice.call(arguments, 1);
  var that = this; //保存当前this
  return function () {
    var curArgs = Array.from(arguments); //当前调用的参数
    var totalArgs = args.concat(curArgs);
    if (totalArgs.length >= func.length) {
      // 参数数量够了
      return func.apply(null, totalArgs);
    } else {
      //参数数量仍然不够
      totalArgs.unshift(func);
      return that.curry.apply(that, totalArgs);
    }
  };
};
/**
 * 函数管道
 */
this.myPlugin.pipe = function () {
  var args = Array.from(arguments);
  return function (val) {
    return args.reduce(function (result, func) {
      return func(result);
    }, val);
    // for (var prop in args) {
    //   var func = args[prop];
    //   val = func(val);
    // }
    // return val;
  };
};
