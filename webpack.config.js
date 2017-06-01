module.exports = {
  entry: "./src/simple-static-react-router.js",
  output: {
    filename: "./index.js",
    library : "simple-static-react-router",
    libraryTarget: "umd"
  },
  externals: {
    "react": "react"
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  }
};
