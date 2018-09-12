'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common.js');

const webpackConfig = merge(baseWebpackConfig, {

  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    // devtool option doesn't output typescript sourcemaps to karma
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js|html)($|\?)/i
    })
  ]
})

// no need for app entry during tests
// delete webpackConfig.entry

module.exports = webpackConfig