var F = function () {};
Object.prototype.a = function () {};
Function.prototype.b = function () {};

var f = new F();

console.log(f.a, f.b, F.a, F.b); //func undefined func func

//f.__proto__ === F.prototype    F.prototype.__proto__ === Object.prototype

//F.__proto__ = Function.prototype  Function.prototype.__proto__ = Object.ptototype

//按照原型链查找时。对象看__proto__，函数看__proto__和prototype
