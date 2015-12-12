var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
