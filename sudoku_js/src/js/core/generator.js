// 生成数独解决方案
const Toolkit = require("./toolkit");
class Generator {
  generate() {
    while (!this.internalGenerate()) {
      // 不符合的次数
      console.warn("rebuild!");
    }
    return this.matrix;
  }

  internalGenerate() {
    // 入口方法
    // 生成矩阵
    this.matrix = Toolkit.matrix.makeMatrix();
    // 为随机选列生成一个0-8的数组
    this.orders = Array.from({
        length: 9
      })
      .map(() => Array.from({
        length: 9
      }, (x, i) => i))
      .map(row => Toolkit.matrix.shuffle(row));

    // 检查数字1-9是否满足填入要求
    // 如果有一个不满足则返回false
    return Array.from({
        length: 9
      })
      .every((v, i) => this.fillNumber(i + 1));
  }

  fillNumber(num) {
    // 递归函数入口
    // 从第0行开始
    return this.fillRow(num, 0);
  }

  fillRow(num, rowIndex) {
    if (rowIndex > 8) {
      return true;
    }
    // 取出当前行的数组
    let rowArray = this.matrix[rowIndex];
    // 具有随机列索引的矩阵
    let orders = this.orders[rowIndex];
    for (let i = 0; i < 9; i++) {
      // 随机选择列
      const colIndex = orders[i];
      // 如果当前列有值
      if (rowArray[colIndex]) {
        continue;
      }
      // 检查这个位置是否能填入
      // 如果不能填入则继续
      if (!Toolkit.matrix.checkFillable(this.matrix, num, rowIndex, colIndex)) {
        continue;
      }
      // 填入
      rowArray[colIndex] = num;

      // 进行下一行操作
      // 如果下一行不能填入num 则回溯
      if (!this.fillRow(num, rowIndex + 1)) {
        // 重新置0
        rowArray[colIndex] = 0;
        continue;
      }
      return true;
    }
    return false;
  }
}

module.exports = Generator;