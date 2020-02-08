const path = require("path")
module.exports = {
  // 导入
  entry: {
    index: "./js/index"
  },
  // 输出
  output: {
    filename: "[name].js"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "./node_modules"),
        query: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
}
