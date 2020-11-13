/**
 * 对所有数字求和
 * @param  {...any} args 剩余参数数组
 */
function sum(...args) {
  //   console.log(args);
  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

/**
 * 获取一个指定长度的随机数组成的数组
 * @param {*} length 数组长度
 */
function getRandomNumbers(length) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.random());
  }
  return arr;
}

const numbers = getRandomNumbers(10);
//我们希望将数组的每一项展开，依次作为参数传递，而不是把整个数组作为一个参数传递
console.log(sum(numbers));

console.log(sum(3, 7, ...numbers, 1, 4)); //相当于传递了10个参数

const arr1 = [2, 5, 7, 4];
const arr2 = [0, ...arr1]; //将arr1中的数据clone到arr2中
console.log(arr2);

const obj1 = {
  name: "成哥",
  age: 18,
  love: ["邓嫂", "成嫂1", "成嫂2"],
  address: {
    country: "中国",
    province: "黑龙江",
    city: "哈尔滨",
  },
};
//将obj1的键值对clone到obj2中(浅克隆)
const obj2 = {
  ...obj1,
  name: "邓哥", //覆盖目标对象
  love: [...obj1.love, "成嫂3"],
  address: {
    ...obj1.address,
  },
};
console.log(obj2);
console.log(obj2.address === obj1.address);
