if (!this.myPlugin) {
  this.myPlugin = {};
}
/**
 * 继承
 */
// this.myPlugin.inherit = function (son, father) {
//   son.prototype = Object.create(father.prototype);
//   son.prototype.constructor = son;
// };
this.myPlugin.inherit = (function () {
  var Temp = function () {};
  return function (son, father) {
    Temp.prototype = father.prototype;
    son.prototype = new Temp();
    son.prototype.constructor = son;
    son.prototype.uber = father.prototype; //现在可以直接使用Object.getPrototypeOf(obj)获得对象的隐式原型
  };
})();
/**
 * 对象混合mixin。将obj2混合到obj1中
 */
this.myPlugin.mixin = function (obj1, obj2) {
  //   var newObj = {};
  //   for (var prop in obj2) {
  //     newObj[prop] = obj2[prop];
  //   }
  //   for (var prop in obj1) {
  //     if (!(prop in obj2)) {
  //       newObj[prop] = obj1[prop];
  //     }
  //   }
  //   return newObj;
  return Object.assign({}, obj1, obj2);
};
/**
 * 对象克隆
 */
this.myPlugin.clone = function (obj, deep) {
  if (deep === undefiend) {
    deep = true;
  }
  if (Array.isArray(obj)) {
    if (deep) {
      var newObj = [];
      obj.forEach((item) => {
        newObj.push(this.clone(item, true));
      });
      return newObj;
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    var newObj = {};
    for (var prop in obj) {
      if (deep) {
        newObj[prop] = this.clone(obj[prop], true);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    //函数或原始类型
    return obj;
  }
};
/**
 * 函数防抖
 */
this.myPlugin.debounce = function (callback, wait, immediate) {
  if (immediate === undefined) {
    innediate = false;
  }
  var timer;
  return function () {
    var that = this,
      callNow = !timer,
      args = arguments;
    clearTimeout(timer);
    if (immediate) {
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) {
        callback.apply(that, args);
      }
    }
    timer = setTimeout(function () {
      callback.apply(that, args);
    }, wait);
  };
};
/**
 * 函数节流
 */
this.myPlugin.throttle = function (callback, wait, immediate) {
  if (immediate === undefined) {
    immediate = false;
  }
  if (immediate) {
    var time;
    return function () {
      if (!time || time - Date.now() >= wait) {
        callback.apply(this, arguments);
        time = Date.now();
      }
    };
  } else {
    var timer;
    return function () {
      var that = this,
        args = arguments;
      if (timer) {
        return;
      }
      timer = setTimeout(function () {
        callback.apply(that, args);
        timer = null;
      }, wait);
    };
  }
};
/**
 * 柯里化函数
 */
this.myPlugin.curry = function (func) {
  var args = Array.from(arguments).slice(1);
  var that = this;
  return function () {
    var curArgs = Array.from(arguments);
    var totalArgs = args.concat(curArgs);
    if (totalArgs.length >= func.length) {
      return func.apply(this, totalArgs);
    } else {
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
  };
};
