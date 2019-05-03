// Import modules
require("babel-polyfill");
const webpack = require('webpack'), //to access built-in plugins
  path = require('path');

// Defining relative path
const srcPath = path.join(__dirname, '../src/'),
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
    ],
  },
  resolve: {
    alias: {
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    },
  }
};

// Use the configs for webpack
module.exports = config;
