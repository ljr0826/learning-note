var foo = { n: 1 }; //引用类型指向

(function (foo) {
  console.log(foo.n); //1
  foo.n = 3;
  var foo = { n: 2 };
  console.log(foo.n); //2
})(foo);

console.log(foo.n); //1 X  输出的值为3
