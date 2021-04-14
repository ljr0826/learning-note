//单对象模式，也叫做命名空间模式
var MyFunctions = {
  /**
   * 判断某个数是不是奇数
   * @param {number} n 要判断的数
   * @returns {boolean}
   */
  isOdd: function (n) {
    return n % 2 !== 0;
  },
  /**
   * 判断某个数是不是素数
   * @param {number} n 要判断的数
   * @returns {boolean}
   */
  isPrime: function (n) {
    if (n < 2) {
      return false;
    }
    for (var i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  },
  /**
   * 对数组求和
   * @param {object} arr 要求和的数组
   * @returns {number}
   */
  sumOfArray: function (arr) {
    var sum = 0;
    for (var index in arr) {
      sum += arr[index];
    }
    return sum;
  },
  /**
   * 得到数组中的最大值
   * @param {object} arr 要判断的数组，如果数组长度为0，返回undefined
   * @return {number}
   */
  maxOfArray: function (arr) {
    if (arr.length === 0) {
      return;
    }
    var max;
    for (var index in arr) {
      if (!max || arr[index] > max) {
        max = arr[index];
      }
    }
    return max;
  },
  /**
   * 得到数组中的最小值
   * @param {object} arr 要判断的数组
   * @returns {number}
   */
  minOfArray: function (arr) {
    if (arr.length === 0) {
      return;
    }
    var min;
    for (var index in arr) {
      if (!min || arr[index] < min) {
        min = arr[index];
      }
    }
    return min;
  },
  /**
   * 判断数组是否是稀松数组
   * @param {object} arr 要判断的数组
   * @returns {boolean}
   */
  hasEmptyInArray: function (arr) {
    //稀松数组的特点：下标是连续的
    for (var i = 0; i < arr.length; i++) {
      if (!(i in arr)) {
        return true;
      }
      // if (arr[i] === undefined) {
      //   return true;
      // }
    }
    return false;
  },
  /**
   * 判断某年是否是闰年
   * @param {number} year 要判断的年份
   * @returns {boolean}
   */
  isLeep: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  /**
   * 得到某年某月的天数
   * @param {number} year 要判断的年份
   * @param {number} month 要判断的月份
   * @return {number}
   */
  getDays: function (year, month) {
    if (month === 2) {
      return this.isLeep(year) ? 29 : 28;
    } else if (
      (month < 8 && this.isOdd(month)) ||
      (month >= 8 && !this.isOdd(month))
    ) {
      return 31;
    } else {
      return 30;
    }
  },
  /**
   * 得到某个数字数组中出现次数最多的数字/字符串和频率
   * @param {object} arr 要判断的数组
   * @return {object}
   */
  getTopFreqInArray: function (arr) {
    var record = {}; //记录出现的数字及其频率
    for (var index in arr) {
      if (!record[arr[index]]) {
        record[arr[index]] = 1;
      } else {
        record[arr[index]]++;
      }
    }
    var result = {};
    for (var prop in record) {
      if (!result.topFreq || result.topFreq < record[prop]) {
        result.topFreq = record[prop];
        result.topNum = prop;
      }
    }
    return result;
  },
  /**
   * 给指定的数组升序排序
   * @param {object} arr
   * @param {function} compare 比较大小，
   * 该函数有两个参数，代表数组中的两个元素，该函数返回一个数字，
   * 如果是正数，则第一个元素比第二个元素大，
   * 如果是0，则两个元素相等，
   * 如果是负数，则第一个元素比第二个元素小
   */
  sort: function (arr, compare) {
    if (compare === undefined) {
      compare = function (a, b) {
        if (a > b) {
          return 1;
        } else if (a === b) {
          return 0;
        } else {
          return -1;
        }
      };
    }
    for (var i = 1; i < arr.length; i++) {
      for (var j = 0; j < arr.length - i; j++) {
        if (compare(arr[j], arr[j + 1]) > 0) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  },
  /**
   *
   * @param {*} arr
   * @param {*} callback 回调函数，接受两个参数，
   * 分别表示数组的某一项和其下标，返回boolean
   * 满足条件返回true，否则返回false
   */
  filter: function (arr, callback) {
    //遍历数组，看每一项是否满足条件
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },
  /**
   *从指定的数组中查找第一个满足条件的元素，如果没有找到返回undefined
   * @param {*} arr
   * @param {*} callback 回调函数，接受两个参数，
   * 分别表示数组的某一项和其下标，返回boolean
   * 满足条件返回true，否则返回false
   * @returns
   */
  find: function (arr, callback) {
    for (var index in arr) {
      if (callback(arr[index])) {
        return arr[index];
      }
    }
  },
  /**
   * 按照指定的条件，得到某个数组中满足条件的元素数量
   * @param {*} arr
   * @param {*} callback 回调函数，接受两个参数，
   * 分别表示数组的某一项和其下标，返回boolean
   * 满足条件返回true，否则返回false
   * @returns
   */
  count: function (arr, callback) {
    var count = 0;
    for (var index in arr) {
      if (callback(arr[index])) {
        count++;
      }
    }
    return count;
  },
  /**
   * 得到一个最小值到最大值之间的随机整数
   * @param {*} min 最小值
   * @param {*} max 最大值 （取不到）
   * Math.random取值范围是0~1，1取不到
   * 向下取整，Math对象提供的函数，Math.floor
   */
  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  /**
   * 根据出生年月日，计算年龄。照顾到闰年2月29号出生的人
   * @param {*} year
   * @param {*} month
   * @param {*} day
   */
  getAge: function (year, month, day) {
    var now = new Date(); //得到当前日期
    var age = now.getFullYear() - year;
    if (
      now.getMonth() < month - 1 ||
      (now.getMonth() === month - 1 && now.getDate() < day)
    ) {
      age--;
    }
    return age;
  },
  /**
   * 根据日期得到一个友好的日期字符串格式
   * @param {*} d
   * @returns
   */
  getDateString: function getDateString(d) {
    var year = d.getFullYear().toString().padStart(4, "0");
    var month = (d.getMonth() + 1).toString().padStart(2, "0");
    var date = d.getDate().toString().padStart(2, "0");
    var hour = d.getHours().toString().padStart(2, "0");
    var minute = d.getMinutes().toString().padStart(2, "0");
    var second = d.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${date}  ${hour}:${minute}:${second}`;
  },
};
