'use strict'
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.server');
var open = require('open');
var serverUrl = 'http://localhost:9090';

config.entry.unshift('webpack-dev-server/client?' + serverUrl, "webpack/hot/dev-server");

config.plugins.push(new webpack.HotModuleReplacementPlugin());

var proxy = [{
  path: "/home/msg/data/personalcontent",
  target: "https://www.baidu.com",
  host: "www.baidu.com"
}];

//启动服务

var app = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  proxy: proxy
});

app.listen(9090, () => {
  console.log('server start ' + serverUrl);
  open(serverUrl);
});