// 处理弹出的操作面板

// cell --> (click) --> popup
// popup --> (click) --> n --> (fill) --> cell
const Grid = require("./grid")
// 字体颜色

class PopupNumbers {
  constructor($panel) {
    this._$panel = $panel.hide().removeClass("hidden")

    // 面板上的事件代理
    // 填入数字或mark的样式
    // 填入数字或样式后 面板应该消失
    this._$panel.on("click", "span", e => {
      const $cell = this._$targetCell

      const $span = $(e.target)

      if ($span.hasClass("mark1")) {
        // 如果点击的span为mark1
        // 首先查看单元格cell是否具有mark1样式
        // 如果有 则移除
        // 如果没有 则移除mark2并加上样式mark1
        if ($cell.hasClass("mark1")) {
          $cell.removeClass("mark1")
        } else {
          $cell.removeClass("mark2").addClass("mark1")
        }
      } else if ($span.hasClass("mark2")) {
        // 同理
        if ($cell.hasClass("mark2")) {
          $cell.removeClass("mark2")
        } else {
          $cell.removeClass("mark1").addClass("mark2")
        }
      } else if ($span.hasClass("empty")) {
        // 如果点的空白块
        $cell
          .text(0)
          .removeClass("mark1")
          .removeClass("mark2")
          .addClass("empty")
      } else {
        // 填入数字
        // 移除empty类 并添加上面板上点击的数字
        $cell
          .removeClass("empty")
          .text($span.text())
          .addClass(`color-${$span.text()}`)
      }
      // 点击完之后需要关闭面板
      this._$panel.slideUp(500);
    })
  }

  // 将弹出面板固定位置
  popup($cell) {
    this._$targetCell = $cell;
    this._$panel.slideDown(500);
  }
}

module.exports = PopupNumbers