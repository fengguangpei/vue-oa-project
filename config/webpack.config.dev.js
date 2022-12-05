const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.config.base.js')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')
module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: false,
    port: 8080,
    historyApiFallback: true,
    compress: true,
    static: './dist',
    proxy: {
      '/microApp': {
        target: 'http://localhost:8081',
        pathRewrite: {
          '^/microApp': ''
        },
        secure: false
      }
    }
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
    new webpack.ProgressPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src')
    })
  ]
})