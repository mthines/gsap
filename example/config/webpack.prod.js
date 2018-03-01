const webpack           = require('webpack'),
      merge             = require('webpack-merge'),
      UglifyJSPlugin    = require('uglifyjs-webpack-plugin'),
      CompressionPlugin = require("compression-webpack-plugin"),
      common            = require('./webpack.common.js');

// Production Settings
module.exports = merge(common, {
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new UglifyJSPlugin()
  ]
});
