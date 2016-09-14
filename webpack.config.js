/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "webpack" }]*/
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/', // Required for webpack-dev-server
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }]
  }
}
