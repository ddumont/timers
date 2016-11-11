var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components|dist)/,
      loader: 'babel'
    }, {
      test: /\.less$/,
      exclude: /(node_modules|bower_components|dist)/,
      loader: 'style!css!postcss!less'
    },{
      test: /\.pug$/,
      loader: 'pug-loader?pretty=true'
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/index.pug',
      inject: 'body',
      alwaysWriteToDisk: true,
      minify: false,
      cache: false
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
