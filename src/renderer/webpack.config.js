/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "webpack" }]*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './src/renderer/index'
  ],
  output: {
    publicPath: '/dist/renderer/', // Required for webpack-dev-server
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
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([{
      from: 'src/renderer/index.html'
    }, {
      from: 'src/package.json',
      to: '../'
    }, {
      from: 'src/browser/app.js',
      to: '../browser/'
    }]),
    new CleanWebpackPlugin(['dist'])
  ],
  resolve: {
    extensions: ['', '.js', '.less', '.css'],
    root: [path.join(__dirname, './src/renderer')]
  },
  target: 'electron'
};
