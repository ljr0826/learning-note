function A() {
  try {
    console.log(a);
  } catch (err) {
    console.log("生生了错误", err);
    return 3;
  } finally {
    console.log("运行结束");
    // return 4;
  }
}
console.log(A());
