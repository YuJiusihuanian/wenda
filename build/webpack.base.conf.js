var path = require('path')
var utils = require('./utils')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var vueLoaderConfig = require('./vue-loader.conf')
// var pxtorem = require('postcss-pxtorem')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // postcss: function() {
  //   return [pxtorem({remUnit: 34.5})];
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.less$/,
      //   include: [resolve('src'), resolve('test')],
      //   exclude: [/node_modules\/(?!(ng2-.+|ngx-.+))/],
      //   use: ExtractTextPlugin.extract({
      //     use: ['css-loader', 'less-loader'],
      //     fallback: 'style-loader'
      //   })
      // },
      // {
      //   test: /\.css$/,
      //   include: [resolve('src'), resolve('test')],
      //   exclude: [/node_modules\/(?!(ng2-.+|ngx-.+))/],
      //   use: ExtractTextPlugin.extract({
      //     use: ['css-loader'],
      //     fallback: 'style-loader'
      //   })
      // }
    ]
  }
}
