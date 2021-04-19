function A() {
  B();
  console.log("a");
}
function B() {
  C();
  console.log("B");
}
function C() {
  throw new Error("dwejdkwfe");
}

A();
console.log("dwk");
