/**
 * 判断某个数是不是奇数
 * @param {number} n 要判断的数
 * @returns {boolean}
 */
function isOdd(n) {
  return n % 2 !== 0;
}
/**
 * 判断某个数是不是素数
 * @param {number} n 要判断的数
 * @returns {boolean}
 */
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (var i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
/**
 * 对数组求和
 * @param {object} arr 要求和的数组
 * @returns {number}
 */
function sumOfArray(arr) {
  var sum = 0;
  for (var index in arr) {
    sum += arr[index];
  }
  return sum;
}
/**
 * 得到数组中的最大值
 * @param {object} arr 要判断的数组，如果数组长度为0，返回undefined
 * @return {number}
 */
function maxOfArray(arr) {
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
}
/**
 * 得到数组中的最小值
 * @param {object} arr 要判断的数组
 * @returns {number}
 */
function minOfArray(arr) {
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
}
/**
 * 判断数组是否是稀松数组
 * @param {object} arr 要判断的数组
 * @returns {boolean}
 */
function hasEmptyInArray(arr) {
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
}
/**
 * 判断某年是否是闰年
 * @param {number} year 要判断的年份
 * @returns {boolean}
 */
function isLeep(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * 得到某年某月的天数
 * @param {number} year 要判断的年份
 * @param {number} month 要判断的月份
 * @return {number}
 */
function getDays(year, month) {
  if (month === 2) {
    return isLeep(year) ? 29 : 28;
  } else if ((month < 8 && isOdd(month)) || (month >= 8 && !isOdd(month))) {
    return 31;
  } else {
    return 30;
  }
}
/**
 * 得到某个数字数组中出现次数最多的数字和频率
 * @param {object} arr 要判断的数组
 * @return {object}
 */
function getTopFreqInArray(arr) {
  var obj = {};
  for (var index in arr) {
    if (!obj[arr[index]]) {
      obj[arr[index]] = 1;
    } else {
      obj[arr[index]]++;
    }
  }
  console.log(obj);
  var result = {};
  for (var prop in obj) {
    if (!result.topFreq || result.topFreq < obj[prop]) {
      result.topFreq = obj[prop];
      result.topNum = +prop;
    }
  }
  return result;
}
