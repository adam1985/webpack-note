var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: APP_PATH
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: APP_PATH
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=40000'
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      include: APP_PATH,
      query: {
        presets: ['es2015']
      }
    }]
  },
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app 222',
      template: path.resolve(TEM_PATH, 'index.html'),
      filename: 'index.html',
      //要把script插入到标签里
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      //$: "jquery",
      //jQuery: "jquery",
      //"window.jQuery": "jquery"
    })
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    open: true,
    progress: true,
    proxy: [{
      path: "/home/msg/data/personalcontent",
      target: "https://www.baidu.com",
      host: "www.baidu.com"
    }]
  },
};