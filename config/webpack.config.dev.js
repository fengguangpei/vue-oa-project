const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.config.base.js')
module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: false,
    port: 8080,
    historyApiFallback: true,
    compress: true,
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