const merge  = require('webpack-merge'),
      common = require('./webpack.common.js');

// Development Settings
module.exports = merge(common, {
  // Continuously watching
  watch: true,
  // Adding Source Map
  devtool: 'cheap-eval-source-map',
});