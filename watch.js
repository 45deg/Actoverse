'use strict'

const webpack = require('webpack');

const rendererWebpack = webpack(
  require('./src/renderer/webpack.config.js')
);

const electron = require('electron-connect').server.create({ path: 'dist/' });
electron.start();
electron.on('quit', () => process.exit(0));

rendererWebpack.watch({}, (err, stats) => {
  if(err) { console.log(err); }
  console.log('Reloaded');
  electron.reload();
});
