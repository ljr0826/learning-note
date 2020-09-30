/**
 * 该函数用于判断某个数是不是奇数
 * @param {number} n 数字
 * @reutrns {number} 是否是奇数
 */
function isOdd(n) {
  return n % 2 === 1;
}
/**
 * 该函数用于判断某个数是不是素数
 * @param {number} n 数字
 * @returns {boolean} 是否是素数
 */
function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (var i = 2; i <= n - 1; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
/**
 * 该函数用于对数组求和
 * @param {object} arr 数组
 * @returns {number} 数组的和
 */
function sumOfArray(arr) {
  var sum = 0;
  for (var index in arr) {
    sum += arr[index];
  }
  return sum;
}
/**
 * 该函数用于得到数组中的最大值
 * @param {object} arr 数组
 * @returns {number} 数组中的最大值
 */
function maxOfArray(arr) {
  var max;
  for (var index of arr) {
    if (!max || arr[index] > max) {
      max = arr[index];
    }
  }
  return max;
}
/**
 * 该函数用于得到数组中的最小值
 * @param {object} arr 数组
 * @returns {number} 数组中的最小值
 */
function minOfArray(arr) {
  var min;
  for (var index of arr) {
    if (!min || arr[index] < min) {
      min = arr[index];
    }
  }
  return min;
}
/**
 * 该函数用于判断数组是否是稀松数组
 * @param {object} arr 数组
 * @returns {boolean} 是否是稀松数组
 */
function hasEmptyInArray(arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    if (typeof arr[i] === "undefined") {
      //袁老师思路
      //if(!(i in arr)){
      return true;
    }
  }
  return false;
}
/**
 * 判断该年是否是闰年
 * @param {string} year 某年
 * @returns {boolean} 是否是闰年
 */
function isLeap(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
/**
 * 得到某年某月的天数
 * @param {string} year 某年
 * @param {number} month 某月
 */
function getDays(year, month) {
  if (month === 2) {
    return isLeap(year) ? 29 : 28;
  } else if ((month < 8 && isOdd(month)) || (month >= 8 && !isOdd(month))) {
    return 31;
  } else {
    return 30;
  }
}
// function getDays(year, month) {
//   if (month === 4 || month === 6 || month === 9 || month === 11) {
//     return 30;
//   } else if (
//     month === 1 ||
//     month === 3 ||
//     month === 5 ||
//     month === 7 ||
//     month === 8 ||
//     month === 10 ||
//     month === 12
//   ) {
//     return 31;
//   } else if (month === 2) {
//     if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
//       return 29;
//     }
//     return 28;
//   }
// }
/**
 * 得到某个数字数组中出现次数最多的数字和频率
 * @param {object} arr 数字数组
 */
function getTopFreqInArray(arr) {
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
}
