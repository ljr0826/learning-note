var foo = 1;

function bar(a) {
  var a1 = a;
  var a = foo;
  function a() {
    console.log(a); //1
  }
  a1();
}

bar(3);

//GO foo=1 bar=fn
//barVO a=1 a1=fn
