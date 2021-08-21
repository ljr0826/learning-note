import * as obj from "./a.js";
import "./init"; //这条导入语句，仅会运行模块，不适用它内部任何的导出
console.log(obj);

// import { name, age } from "./a.js";
// import { b as b2 } from "./b.js"; //通过关键字 as 对导入的符号进行重命名

// const b = 3;

// console.log("这是一个入口文件");
// console.log(name, age);
// console.log(b, b2);

// import { b } from "./b.js"; //相当于浏览器的变量提升，不要这么写
// console.log(b);
//导入时使用的符号是常量，不可修改
