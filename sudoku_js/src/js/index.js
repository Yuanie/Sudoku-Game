const Toolkit = require("./core/toolkit");
// Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
// Array.from() 方法有一个可选参数 mapFn，让你可以在最后生成的数组上再执行一次 map 方法后再返回

const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupNum");

const grid = new Grid($("#container"));
grid.build();
grid.layout();

const $popupDom = $("#popup");
const popupNumbers = new PopupNumbers($popupDom);
grid.bindPopup(popupNumbers);

// 检查面板的事件
$("#check").on("click", e => {
  if (grid.check()) {
    alert("成功！");
  }
});

// 重置面板的事件
$("#reset").on("click", e => {
  grid.reset();
});

// 清空面板的事件 清除所有错误标记
$("#clear").on("click", e => {
  grid.clear();
});

// 重建面板 新建一局
$("#rebuild").on("click", e => {
  grid.rebuild();
});