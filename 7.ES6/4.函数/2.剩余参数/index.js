function sum(...args) {
  //args收集了所有的参数，形成的一个数组
  console.log(args);
  //   let sum = 0;
  //   for (let i = 0; i < arguments.length; i++) {
  //     sum += arguments[i];
  //   }
  //   return sum;
}
console.log(sun());
console.log(sum(1));
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));
