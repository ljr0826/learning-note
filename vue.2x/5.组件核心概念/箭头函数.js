var sum = (a, b) => {
  return a + b;
};
console.log(1, 2);

var print = (data) => {
  console.log(data);
};
print("a");

var double = (n) => n * 2;
console.log(double(5));

var obj = {
  count: 0,
  start() {
    // var that = this;
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000);
  },
};
obj.start();
