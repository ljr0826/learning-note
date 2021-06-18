// "use strict";
// function test(a, b = 1) {
//   console.log("arguments:", arguments[0], arguments[1]);
//   console.log("a:", a, "b:", b);
//   a = 3;
//   console.log("arguments:", arguments[0], arguments[1]);
//   console.log("a:", a, "b:", b);
// }
// test(1, 2);

function test(a, b = a) {
  console.log(a, b);
}
test(1, 2);
test(1);
function test2(a = b, b) {
  //报错
  console.log(a, b);
}
test2();
