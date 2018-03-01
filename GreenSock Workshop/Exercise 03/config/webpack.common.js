// Import modules
require("babel-polyfill");
const webpack = require('webpack'), //to access built-in plugins
      path    = require('path');

// Defining relative path
const srcPath  = path.join(__dirname, '../src/'),
      distPath = path.join(__dirname, '../public/dist/');

// Set the configs for webpack
const config = {
  // Create relative path for the src
  context: srcPath,
  // Define the entry
  entry: {
    vendor: [
      './vendor/vendor.js',
    ],
    main: [
      "babel-polyfill",
      './main.js'
    ],
  },
  // Define the Output
  output: {
    path: distPath,
    filename: '[name].js',
  },
  // What modules webpack actually should use
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",

        // Options for the loader
        options: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-es2016',
          ],
        },
      },
    ]
  },

  plugins: []
};

// Use the configs for webpack
module.exports = config;
