//通常用index.js表示入口文件
const util = require("./util.js"); //相对路径,require可以用在任何可以用函数的地方
//nodejs中导入模块使用相对路径，并且必须以./后../开头，在CommonJs中去点./会有别的含义
const count = 1;
console.log(util);
console.log(util.getNumber());
console.log(util.getNumber());
console.log(util.getNumber());
