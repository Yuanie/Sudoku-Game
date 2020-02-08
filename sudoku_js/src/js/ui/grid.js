// 生成九宫格
const Toolkit = require("../core/toolkit");
const Generator = require("../core/generator");
const Sudoku = require("../core/sudoku");
const Checker = require("../core/checker");
// 0-9设置的字体颜色
// 0为白色 留给用户填写
const numberClass = [
  "#FFFFFF",
  "#4876FF",
  "#458B00",
  "#CD6600",
  "#27408B",
  "#B22222",
  "#48D1CC",
  "#CD00CD",
  "#EEC900",
  "#000000"
];
class Grid {
  constructor(container) {
    // 私有变量
    // container 是一个jquery变量
    this._$container = container;
  }

  build() {
    const sudoku = new Sudoku();
    const matrix = sudoku.makePuzzle();
    // 为每一个span添加类 tag
    // 然后找出宫的方块加样式
    // 之后可以尝试用 &:nth-child() 来为宫添加样式
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right'];

    const $cells = matrix.map(rowArray => rowArray
      .map((cellValue, colIndex) => {
        let $span = $("<span>")
          // 为class=col_g_right 的方块加样式 
          .addClass(colGroupClasses[colIndex % 3])
          .text(cellValue)
          .addClass(cellValue ? 'fixed' : 'empty');
        // 为不同的数字设置不同颜色
        // 0则赋予白色 留给用户填写
        // 项目中一直有问题就是赋予背景色之后白色的0显现出来
        // 因为此处对0赋予了 style内联式的样式 其级别大于其他选择器样式
        // 因此在less表中修改无用
        // 这里根据是否为0进行判断
        if (cellValue > 0) {
          $span.css({
            "color": numberClass[cellValue]
          })
        }
        return $span;
      }));

    const $divArray = $cells
      .map(($spanArray, rowIndex) => {
        return $("<div>")
          .addClass("row")
          // 为 class=row_g_bottom 的方块加样式
          .addClass(rowGroupClasses[rowIndex % 3])
          .append($spanArray);
      });

    this._$container.append($divArray);
  }

  layout() {
    // jQuery(selector,context)
    // 接收一个css选择器表达式(selector)和可选的选择器上下文(context)
    // 返回一个包含了匹配的DOM元素的jQuery对象
    const width = $("span:first", this._$container).width();
    $("span", this._$container)
      .height(width)
      .css({
        "line-height": `${width}px`,
        "font-size": width < 32 ? `${width/2}px` : ""
      });
  }

  /**
   * 检查用户解谜结果 如果成功进行提示
   * 失败则进行标记
   */
  check() {
    // 首先要得到面板的数据 matrixData
    const matrixData = this._$container
      .children()
      // 对每个div进行检查
      .map((rowIndex, div) => {
        return $(div)
          .children()
          // 提取出每个span的数字
          .map((colIndex, span) =>
            parseInt($(span).text())
          )
      })
      .toArray()
      // 转换成数组
      .map(($data) => $data.toArray());
    const checker = new Checker(matrixData);
    if (checker.check()) {
      return true;
    }

    // 没有成功则进行标记
    // 获取标记矩阵
    const marks = checker._matrixMarks;
    // 然后再遍历 如果有错的标记为error
    this._$container
      .children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          // 如果获取的是谜盘原有的固定数字
          // 或者检查正确的 则不标记位error
          if ($(span).is(".fixed") || marks[rowIndex][colIndex]) {
            return;
          }
          $(span).addClass("error");
        })
      });


  }

  /**
   * 重置到初始状态
   */
  reset() {
    this._$container.find("span:not(.fixed)")
      .removeClass("error mark1 mark2")
      .addClass("empty")
      .text(0);
  }

  /**
   * 清除错误标记
   */
  clear() {
    this._$container.find("span.error")
      .removeClass("error");
  }

  /**
   * 重建新的谜盘
   */
  rebuild() {
    this._$container.empty();
    this.build();
    this.layout();
  }

  bindPopup(popupNumbers) {
    // 弹出面板绑定的事件代理
    this._$container.on("click", "span", e => {
      const $cell = $(e.target);
      if ($cell.hasClass("fixed")) {
        // 点击固定的数字不会弹出面板
        return;
      }

      popupNumbers.popup($cell);
    })
  }
}

module.exports = Grid;