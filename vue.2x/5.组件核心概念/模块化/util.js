export default function getRandom(min, max) {
  //导出默认的内容
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
