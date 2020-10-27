var F = function () {};
Object.prototype.a = function () {};
Function.prototype.b = function () {};

var f = new F();

console.log(f.a, f.b, F.a, F.b);
// fn    undefined    fn    fn

//f.__proto__ === F.prototype
// f.__proto__.__proto__ === Object.prototype
// F.__proto__ === Function.prototype
// F.__proto__.__proto__ === Object.prototype
