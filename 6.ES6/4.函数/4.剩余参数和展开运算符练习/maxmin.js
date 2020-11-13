function getValues() {
  const numbers = [];
  const inps = document.querySelectorAll("input");
  for (let i = 0; i < inps.length; i++) {
    numbers.push(+inps[i].value);
  }
  return numbers;
}
// console.log(getValues());
const btn = document.querySelector("button");
btn.onclick = function () {
  const numbers = getValues(); //得到文本框中所有数字形成的数组
  spanmax.innerText = Math.max(...numbers);
  spanmin.innerText = Math.min(...numbers);
};
