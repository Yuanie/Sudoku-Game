// 工具箱脚本
/**
 * 矩阵数组实现工具函数
 */
const matrixToolkit = {
  // 生成一行的代码
  makeRow(val = 0) {
    let arr = new Array(9);
    return arr.fill(val);
  },

  // 生成矩阵
  makeMatrix(val = 0) {
    // val 为初始化矩阵的值
    return Array.from({
      length: 9
    }).map(() => this.makeRow(val));
  },

  /** 
   * Fisher-Yates 洗牌算法
   */
  shuffle(arr) {
    let endInd = arr.length - 2;
    for (let i = 0; i <= endInd; i++) {
      // 从索引i之后随机选择一个索引j
      let j = i + Math.floor(Math.random() * (arr.length - i));
      // 交换
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return [...arr];
  },

  /**
   * 检查填入的是否合适
   */
  checkFillable(matrix, num, rowIndex, colIndex) {
    // 取出 rowIndex 这一行
    const row = matrix[rowIndex];
    // 取出 colIndex 这一列
    const col = Array.from({
      length: 9
    }).map((v, i) => matrix[i][colIndex]);
    // 取出当前宫
    const {
      boxIndex
    } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);
    // 查看行、列和宫里是否存在num
    for (let i = 0; i < 9; i++) {
      if (row[i] === num || col[i] === num || box[i] === num) {
        return false;
      }
    }

    return true;
  }
}

/**
 * 宫坐标系工具函数
 */
const boxToolkit = {
  // 从坐标系转换成宫坐标系
  // 返回的是一个对象 有宫的索引boxIndex以及处于当前宫的索引cellIndex
  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: (rowIndex % 3) * 3 + colIndex % 3
    }
  },

  // 从宫转换为坐标系 上面的逆运算
  convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: (boxIndex % 3) * 3 + cellIndex % 3
    }
  },

  // 获得boxIndex处的数组
  getBoxCells(matrix, boxIndex) {
    let startRowIndex = Math.floor(boxIndex / 3) * 3;
    let startColIndex = boxIndex % 3 * 3;
    const result = [];
    for (let i = startRowIndex; i < startRowIndex + 3; i++) {
      for (let j = startColIndex; j < startColIndex + 3; j++) {
        result.push(matrix[i][j]);
      }
    }
    return result;
  }
};

//  工具集类
module.exports = class Toolkit {
  // 通过 static 关键字定义静态方法
  // 该方法不会被实例继承，而是直接通过类来调用
  static get matrix() {
    return matrixToolkit;
  }

  static get box() {
    return boxToolkit;
  }
};