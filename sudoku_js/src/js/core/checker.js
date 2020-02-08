const Toolkit = require("./toolkit");
// 检查数独的解决方案
// 检查数组含有0或者重复
class Checker {
  constructor(matrix) {
    this._matrix = matrix;
    // 标记矩阵赋初值
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
    this._success = true;
  }

  /**
   * 需要在调用 check() 之后使用，指示检查是否成功(即完全符合数独规则)
   */
  get success() {
    return this._success;
  }

  // class中static声明的变量或者函数，是function的属性
  // 静态方法在一启动时就实例化了，因而静态内存是连续的，且静态内存是有限制的
  static checkArray(array) {
    // 标记位
    // 有问题的则标记为false
    // 1. 存在0元素
    // 2. 后续存在重复项
    const length = array.length;
    const marks = new Array(length);
    marks.fill(true);

    for (let i = 0; i < length; i++) {
      if (!marks[i]) {
        // 如果当前位置有问题 直接跳过
        continue;
      }
      let v = array[i];
      if (!v) {
        marks[i] = false;
        continue;
      }
      // 检查后续是否有重复项
      // 之后再想想有没有优化
      for (let j = i + 1; j < length; j++) {
        if (v === array[j]) {
          marks[i] = false;
          marks[j] = false;
        }
      }
    }
    return marks;
  }

  check() {
    // 分别检查行、列、宫
    this.checkRows();
    this.checkCols();
    this.checkBoxes();
    this._success = this._matrixMarks.every((row) => row.every(cell => cell === true));
    return this._success;
  }


  // const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了
  checkRows() {

    for (let i = 0; i < 9; i++) {
      // 行
      const row = this._matrix[i];
      const rowMarks = Checker.checkArray(row);
      for (let j = 0; j < 9; j++) {
        // 列
        if (!rowMarks[j]) {
          // 如果当前行第j列有错误标记
          this._matrixMarks[i][j] = false;
        }
      }
    }
  }

  checkCols() {
    for (let j = 0; j < 9; j++) {
      // 列
      const col = Array.from({
          length: 9
        })
        .map((v, i) => this._matrix[i][j]);
      const colMarks = Checker.checkArray(col);
      for (let i = 0; i < 9; i++) {
        if (!colMarks[i]) {
          // 如果当前列第i行有错误标记
          this._matrixMarks[i][j] = false;
        }
      }
    }
  }

  checkBoxes() {
    // 首先获取每个宫生成的数组矩阵
    const boxes = Array.from({
        length: 9
      })
      .map((v, i) => Toolkit.box.getBoxCells(this._matrix, i));
    // 对每一个宫进行检查
    boxes.forEach((box, boxIndex) => {
      const boxMarks = Checker.checkArray(box);
      boxMarks.forEach((cell, cellIndex) => {
        if (!boxMarks[cellIndex]) {
          const {
            rowIndex,
            colIndex
          } = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      })
    });
  }
}

module.exports = Checker;