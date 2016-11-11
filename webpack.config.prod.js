var baseConfig = require('./webpack.config');
var path = require('path');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, baseConfig, {
  devtool: null,
  entry: baseConfig.entry[baseConfig.entry.length - 1],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath: '/'
  },
  plugins: [
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.pug',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true,
      output: {
        comments: false
      }
    })
  ]
});
