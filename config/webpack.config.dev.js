const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.config.base.js')
module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ]
})