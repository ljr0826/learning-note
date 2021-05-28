var a = 1;
function b() {
  console.log(a); //fn
  a = 10;
  return; //确定上下文时，规则是不会因为return或if而改变的
  function a() {}
}
b();
console.log(a); //1

//Go a=1 b=fn
//bVO a=fn
