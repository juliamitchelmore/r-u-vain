/* eslint-disable no-console */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

console.log(config.output.publicPath);

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: "./dist",
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Listening at http://localhost:3000/')
  }
})