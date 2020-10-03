//单对象模式
var MyFunctions = {
  /**
   * 该函数用于判断某个数是不是奇数
   * @param {number} n 数字
   * @reutrns {number} 是否是奇数
   */
  isOdd: function (n) {
    return n % 2 === 1;
  },
  /**
   * 该函数用于判断某个数是不是素数
   * @param {number} n 数字
   * @returns {boolean} 是否是素数
   */
  isPrime: function (n) {
    if (n < 2) {
      return false;
    }
    for (var i = 2; i <= n - 1; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  },
  /**
   * 该函数用于对数组求和
   * @param {object} arr 数组
   * @returns {number} 数组的和
   */
  sumOfArray: function (arr) {
    var sum = 0;
    for (var index in arr) {
      sum += arr[index];
    }
    return sum;
  },
  /**
   * 该函数用于得到数组中的最大值
   * @param {object} arr 数组
   * @returns {number} 数组中的最大值
   */
  maxOfArray: function (arr) {
    var max;
    for (var index of arr) {
      if (!max || arr[index] > max) {
        max = arr[index];
      }
    }
    return max;
  },
  /**
   * 该函数用于得到数组中的最小值
   * @param {object} arr 数组
   * @returns {number} 数组中的最小值
   */
  minOfArray: function (arr) {
    var min;
    for (var index of arr) {
      if (!min || arr[index] < min) {
        min = arr[index];
      }
    }
    return min;
  },
  /**
   * 该函数用于判断数组是否是稀松数组
   * @param {object} arr 数组
   * @returns {boolean} 是否是稀松数组
   */
  hasEmptyInArray: function (arr) {
    for (var i = 0; i <= arr.length - 1; i++) {
      if (typeof arr[i] === "undefined") {
        //袁老师思路
        //if(!(i in arr)){
        return true;
      }
    }
    return false;
  },
  /**
   * 判断该年是否是闰年
   * @param {string} year 某年
   * @returns {boolean} 是否是闰年
   */
  isLeap: function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },
  /**
   * 得到某年某月的天数
   * @param {string} year 某年
   * @param {number} month 某月
   */
  getDays: function (year, month) {
    if (month === 2) {
      return this.isLeap(year) ? 29 : 28;
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
   * 得到某个数字数组中出现次数最多的数字和频率
   * @param {object} arr 数字数组
   */
  getTopFreqInArray: function (arr) {
    var nums = {};
    for (var prop in arr) {
      var index = arr[prop];
      if (!nums[index]) {
        nums[index] = 1;
      } else {
        nums[index]++;
      }
    }
    var result = undefined;
    for (var index in nums) {
      if (!result || nums[index] > resulttopFreq) {
        result = {
          topFreq: +nums[index],
          topMax: index,
        };
      }
    }
    return result;
    //函数的返回值只能有一个
  },
  /**
   * 给指定的数组升序排序
   * @param {*} arr
   * @param {Function} compare 比较大小，
   * 该函数有两个参数，代表数组中的两个元素，
   * 该函数返回一个数字，如果是正数，则第一个元素比第二个元素大，
   * 如果是0，则相等，
   * 如果是负数，则第一个元素比第二个元素小
   */
  sort: function (arr, compare) {
    if (!compare) {
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
        //比较arr[j] 和 arr[j+1]
        if (compare(arr[j], arr[j + 1]) > 0) {
          //交换
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  },
  /**
   * 筛选数组
   * @param {*} arr
   * @param {Function} callback 回调函数，接收两个参数，
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
   * 从指定的数组中，查找第一个满足条件的元素，如果没有找到，返回undefined
   * @param {*} arr
   * @param {*} callback 回调函数，接收两个参数，
   * 分别表示数组的某一项和其下标，返回boolean
   * 满足条件返回true，否则返回false
   */
  find: function (arr, callback) {
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        return arr[i];
      }
    }
  },
  /**
   * 按照指定的条件，得到某个数组中满足条件的元素数量
   * @param {*} arr
   * @param {*} callback 回调函数，接收两个参数，
   * 分别表示数组的某一项和其下标，返回boolean
   * 满足条件返回true，否则返回false
   */
  count: function (arr, callback) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
      if (callback(arr[i], i)) {
        num++;
      }
    }
    return num;
  },
};
