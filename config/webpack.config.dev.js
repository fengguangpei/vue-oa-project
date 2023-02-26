const { merge } = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.config.base.js')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const SppedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SppedMeasurePlugin()
const config = merge(base, {
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
      }
    ]
  },
  plugins: [
    // new ProgressBarPlugin(),
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, '../src')
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '../'),
      manifest: require('../vendor/Vendor_manifest.json')
    })
  ]
})
module.exports = config