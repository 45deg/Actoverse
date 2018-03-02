'use strict'

const webpack = require('webpack');

var config = require('./webpack.config.js')
config.target = 'electron';

const rendererWebpack = webpack(config);

var electron = null;

rendererWebpack.watch({}, (err, stats) => {
  if(err) { console.log(err); }

  if (stats.hasWarnings()) {
    stats.compilation.warnings.forEach(warning => {
      console.log(warning);
    })
  }

  if (stats.hasErrors()) {
    stats.compilation.errors.forEach(error => {
      console.log(error.error.toString());
      if (error.error.codeFrame) {
        console.log(error.error.codeFrame);
      }
    })
    return;
  }

  if(!electron) {
    electron = require('electron-connect').server.create({ path: 'dist/' });
    electron.start();
    electron.on('quit', () => process.exit(0));
  } else {
    console.log('Reloaded');
    electron.reload();
  }
});
