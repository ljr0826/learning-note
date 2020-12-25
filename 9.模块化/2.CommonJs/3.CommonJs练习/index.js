const pokers = []; //扑克牌的数组
const Poker = require("./poker"); //导入扑克牌的构造函数
for (let i = 1; i <= 13; i++) {
  //循环牌面
  for (let j = 1; j <= 4; j++) {
    //循环花色
    pokers.push(new Poker(j, i));
  }
}
pokers.push(new Poker(null, 14), new Poker(null, 15));

//打乱
const util = require("./util");
util.sortRandom(pokers);
// console.log(pokers);
const player1 = pokers.slice(0, 17);
const player2 = pokers.slice(17, 34);
const player3 = pokers.slice(34, 51);
const desk = pokers.slice(51, 53);

console.log("玩家1：");
util.print(player1);
