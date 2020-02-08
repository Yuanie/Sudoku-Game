// 生成数独游戏
const Generator = require("./generator");
const Toolkit = require("./toolkit");

class Sudoku {
  constructor() {
    this.matrix = new Generator().generate();
  }
  /**
   * 根据内部的数独解决方案，生成一个随机谜盘。
   * level 表示难度等级。
   * level 越大表示越难，但 level 不能超过 8，最好是在 3~7 之间
   * level = 3 easy mode
   * level = 5 medium mode
   * level = 7 hard mode
   */

  makePuzzle(level = 5) {
    // 数独的每一行有9个元素
    // level数值即代表随机丢弃这么多个数字
    // 为了做样式处理 将欲丢弃的数字设为0
    this.puzzleMatrix = this.matrix.map((row) => {
      return row.map((value) => Math.random() * 9 <= level ? 0 : value);
    })

    return this.puzzleMatrix;
  }
}

module.exports = Sudoku;