const gulp = require("gulp");

// 转译Js
gulp.task("webpack", () => {
  const webpack = require("webpack-stream");

  const config = require("./webpack.config.js");

  return gulp.src("./js/**/*.js")
    .pipe(webpack(config))
    .pipe(gulp.dest("../www/js"));

});

// 编译 less -> css
gulp.task("less_to_css", () => {
  const less = require("gulp-less");
  return gulp.src("./less/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("../www/css"));

});

gulp.task("default", gulp.series(["webpack", "less_to_css"], () => {}));

gulp.task("watch", () => {
  // In gulp 4.x this is no longer the case
  // gulp.watch("less/**/*.less", ["less_to_css"]);
  // gulp.watch("js/**/*.js", ["webpack"]);
  gulp.watch("less/**/*.less", gulp.series('less_to_css'));
  gulp.watch("js/**/*.js", gulp.series('webpack'));
});