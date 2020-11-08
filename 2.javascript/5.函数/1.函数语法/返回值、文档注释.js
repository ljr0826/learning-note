/**
 * 判断一个数是不是奇数
 * @param {number} n 数字
 * @returns{boolean}是否是奇数
 */
// function isOdd(n) {
//   return n % 2 === 1;
// }
// var num = 23;
// isOdd(num);
// if (isOdd(num)) {
//   console.log(`${num}是奇数`);
// }
/**
 * 判断一个数是不是素数
 * @param {number} n 数字
 * @returns {boolean} 是否是素数
 */
function isPrime(n) {
  var isFind;
  if (n <= 1) {
    return false;
  }
  for (var i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
      break;
    }
  }
  return true;
}
var num = 13;
isPrime(num);
if (isPrime(num)) {
  console.log(`${num}是素数`);
} else {
  console.log(`${num}不是素数`);
}
