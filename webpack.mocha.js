const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: "./tests/RouterTest.test.js",
  output: {
    filename: "./tests/build.js",
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};