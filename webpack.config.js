/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "webpack" }]*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index'
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
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style", "css", "less")
    }]
  },
  plugins: [
    // extract inline css into separate 'style.css'
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['', '.js', '.less'],
    root: [path.join(__dirname, './src')]
  }
}
