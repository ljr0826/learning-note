import "./b"; //这条导入语句，仅会运行模块，不适用它内部任何的导出

export const a = 3; //导出a，值为1，类似于CommonJs中的exports.a = 3
export function test() {} //导出test，值为一个函数，类似于CommonJs中的exports.test = function(){}
//注：必须要写声明语句，即基本导出必须写名字
export class Person {} //Person,类也是一个函数
export const name = "abc";

const age = 18; //变量
const sex = "male";

export { age, sex }; //将变量age导出，变量的名字就是导出的名字，变量的值就是导出的值
//{}不是对象，名字用{}约定一下；即将age变量的名称作为导出的名称，age变量的值作为导出的值
//相当于：export age = 18;export sex = "male"
