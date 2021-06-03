if (!this.myPlugin) {
  this.myPlugin = {}; //将这些方法都添加到一个对象里。避免过多的变量污染
} //最好不要假设它就是浏览器环境。因为之后还会学习其他环境。所以用this表示当前的全局环境
/**
 * 继承
 */
this.myPlugin.inherit = (function () {
  var Temp = function () {};
  return function (son, father) {
    //有很多花式改发
    // son.prototype = father.prototype; //目标。但由于引用类型，这样不对
    Temp.prototype = father.prototype;
    son.prototype = new Temp(); //Object.create()方法没有出现之前使用的是这种方法
    // son.prototype = Object.create(father.prototype); //Object.create(User.prototype).__proto__ === User.prototype
    //细节：constructor的指向？son.prototype.hasOwnProperty('constructor');false
    son.prototype.constructor = son; //解决constructor指向问题
    son.prototype.uber = father.prototype; //为了操作方便加的东西。uber表示父级的意思，因为super被占用所以不能用。圣杯模式标准方法
    //现在使用Object.getPrototypeOf(son)就能很方便的获取son.__proto__。所以uber可用于低版本的浏览器的兼容写法没大用
    // son.prototype.uber = father; //袁老师的想法。这样的话通过构造函数创建对象可以使用this.uber(参数...)代替User.call(this,参数...)
  };
})();
/**
 * 将obj2混合到obj1产生一个新对象：对象混合
 */
this.myPlugin.mixin = function (obj1, obj2) {
  var newObj = {}; //建立一个空的新对象，一次给他添加相应属性
  for (var prop in obj2) {
    newObj[prop] = obj2[prop];
  } //obj2的所有属性都被记录到了newObj中
  //找到obj1中独有的属性
  for (var prop in obj1) {
    if (!(prop in obj2)) {
      newObj[prop] = obj1[prop];
    }
  }
  return newObj;
  // return Object.assign({}, obj1, obj2);
};
/**
 * 深度克隆（对对象的属性也做深度处理）。函数原始类型直接返回
 * @param {boolean} deep 是否深度克隆，默认值为false浅度克隆
 * 递归是函数式编程的思想。用的时候关于程序是怎么运行的不要想太多
 */
this.myPlugin.clone = function (obj, deep) {
  if (Array.isArray(obj)) {
    if (deep) {
      //深度克隆
      var newArr = [];
      for (var i = 0; i < obj.length; i++) {
        newArr.push(this.clone(obj[i], deep));
      }
      return newArr;
    } else {
      return obj.slice(); //复制数组
    }
  } else if (typeof obj === "object") {
    var newObj = {};
    for (var prop in obj) {
      if (deep) {
        //深度克隆
        newObj[prop] = this.clone(obj[prop], deep);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    return obj; //函数、原始类型直接返回。即递归的终止条件
  }
};
/**
 * 函数防抖。实现短时间内多次触发同一个函数，只执行第一次或最后一次
 * @param callback 要执行的函数
 * @param wait 多少时间后执行函数
 * @param immediate 判断执行的是第一次还是最后一次
 *
 */
// var timer; //这样污染全局变量
this.myPlugin.debounce = function (callback, wait, immediate) {
  if (immediate === undefined) {
    immediate = false;
  }
  var timer; //写在里面，每次触发事件都是一个新的变量。思路：利用闭包来解决全局变量污染的问题
  return function () {
    var context = this,
      args = arguments, //利用闭包保存实参的伪数组。解决参数问题
      callNow = !timer;
    clearTimeout(timer); //清空之前的计时器
    if (immediate) {
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) {
        callback.apply(context, args);
      }
    } else {
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, wait);
    }
  };
};
/**
 * 函数节流throttle。实现不要让函数执行的那么频繁
 * @param immediate 表示是否是立即触发函数callback
 */
this.myPlugin.throttle = function (callback, time, immediate) {
  if (immediate === undefined) {
    immediate = true;
  }
  if (immediate) {
    //方法二：使用时间戳的方式（在一段时间的开头触发函数）
    var t;
    return function () {
      if (!t || Date.now() - t >= time) {
        //之前没有计时或者距离上次执行的时间已经超过规定的值
        callback.apply(this, arguments);
        t = Date.now(); //Date构造器的静态方法，得到的是当前时间戳（1970-1-1至今）
      }
    };
  } else {
    //方法一：使用计时器的写法（在一段时间的最后触发函数）
    var timer;
    return function () {
      if (timer) {
        return; //只要有计时器就直接结束，不做任何事情
      }
      var args = arguments,
        context = this;
      timer = setTimeout(function () {
        callback.apply(context, args);
        timer = null; // 若没有这个上面判断会一直return
      }, time);
    };
  }
};
/**
 * 柯里化函数
 * @param func 该函数的第一个参数为一个函数、是一定要传递的
 * 剩余第二个开始的参数为需要固定的值
 */
this.myPlugin.curry = function (func) {
  //得到从下标1开始的参数数组
  var args = Array.from(arguments).slice(1);
  // var args = Array.prototype.slice.call(arguments, 1);
  var that = this;
  return function () {
    var curArgs = Array.from(arguments); //得到当前函数调用的实参列表
    var totalArgs = args.concat(curArgs);
    if (totalArgs.length >= func.length) {
      //函数的实例成员length：表示函数的形参数量
      //参数数量够了
      return func.apply(that, totalArgs); //这里的this指向不重要
    } else {
      //参数数量仍然不够，应该继续返回函数即再次调用函数curry即可
      totalArgs.unshift(func);
      return that.curry.apply(that, totalArgs);
    }
  };
};
/**
 * 函数管道：参数为多个单参函数
 */
this.myPlugin.pipe = function () {
  var args = Array.from(arguments); //拿到函数的所有实参
  return function (val) {
    // args.forEach((item) => {
    //   val = item(val);
    // });
    // return val;
    return args.reduce(function (result, func) {
      return func(result);
    }, val); //val是result的默认值
  };
};
