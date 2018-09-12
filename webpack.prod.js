const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  entry: {
    vendor: [
      'vue',
      'chart.js',
      'vue-router',
      'axios',
      'js-cookie',
      'v-tooltip',
      'aws-sdk'
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'BASE_HUBSPOT_URL': JSON.stringify('https://api.hsforms.com/submissions/v3/integration/submit'),
      'DEBUG_MODE': JSON.stringify(false)
    }),
    new CleanWebpackPlugin(['./dist/*.js', './dist/*.map']),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: './scripts.php',
      template: './src/dev_support/scripts_template.html',
      inject: false
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        }
      })
    ]
  },
  mode: 'production',
  output: {
    publicPath: '/dist',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
});