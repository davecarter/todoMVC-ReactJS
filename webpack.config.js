var path = require('path');

module.exports = {
  entry: "./dist/index.js",
  debug: true,
  devtool: 'source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/")
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: path.join(__dirname, "node_modules")
      }
    ]
  }
}
