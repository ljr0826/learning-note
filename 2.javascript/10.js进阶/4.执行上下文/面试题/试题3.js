console.log(foo); //fnC
var foo = "A";
console.log(foo); //"A"
var foo = function () {
  console.log("B");
};
console.log(foo); //fnB
foo(); //"B"
function foo() {
  console.log("C");
}
console.log(foo); //fnB
foo(); //"B"

//GO foo=fn
