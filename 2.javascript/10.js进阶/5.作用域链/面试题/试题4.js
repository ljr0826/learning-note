// //考法一：
// function A() {
//   for (var i = 0; i < 10; i++) {//若没有var a。在全局打印i不报错
//     setTimeout(function () {
//       console.log(i); //10个10
//     }, 1000);
//   }
// }

// A();

// console.log(i); //报错

//考法二：
console.time();
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000); //function(){}作为setTimeout的第一个参数是在全局环境中定义的。所以他的[[scope]]指向全局GO
  })(i); //用立即执行函数可以解决这个问题。这样的话计时器的参数的[[scope]]指向的是IIFE的VO
}
console.timeEnd();
