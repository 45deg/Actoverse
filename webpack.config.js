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
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css!less')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css')
    },
    { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
    { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [
    // extract inline css into separate 'style.css'
    new ExtractTextPlugin('style.css')
  ],
  resolve: {
    extensions: ['', '.js', '.less', '.css'],
    root: [path.join(__dirname, './src')]
  }
}
