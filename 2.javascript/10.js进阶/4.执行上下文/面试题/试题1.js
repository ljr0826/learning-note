var foo = 1;
function bar() {
  console.log(foo); //undefined
  if (!foo) {
    var foo = 10; //变量提升和在if或者别的循环里没有关系
  }
  console.log(foo); //10
}

bar();

//GO  :  foo=1 bar=func
//VO  :  bar的上下文 foo=undefined
