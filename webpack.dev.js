const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: './src/dev_support',
    hot: true,
    hotOnly: true
  },
  devtool: '#eval-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './src/dev_support'),
    filename: 'dev.js'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
  ]
});

