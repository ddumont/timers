var _ = require('lodash');
var webpack = require('webpack');
var baseConfig = require('./webpack.config');

module.exports = Object.assign({}, baseConfig, {
  devtool: null,
  entry: _.last(baseConfig.entry),
  plugins: [
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
