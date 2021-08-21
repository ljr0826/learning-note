// export var a = 1;
// export default 123;
// export { a as abc }; //很少这样用
// const a = 1;
// export { a as default };
//若导出多个东西，可以封装成对象
//默认导出每个模块只能有一个
export const a = 1;
export const b = 3;
export default {
  fn: function () {},
  name: "天官赐福",
};
