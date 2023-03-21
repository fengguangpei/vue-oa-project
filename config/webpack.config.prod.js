const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ElementPlus = require('unplugin-element-plus/webpack')
const glob = require('glob')
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
module.exports = (env, argv) => merge(base, {
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash:8].css'
    }),
    new WebpackManifestPlugin(),
    ...(env.analyzer ? [new BundleAnalyzerPlugin()] : []),
    ElementPlus(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        'element-plus': {
          test: /[\\/]node_modules[\\/](element-plus)[\\/]/,
          name: 'element-plus',
          chunks: 'all',
          enforce: true
        },
      }
    },
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    hints: false
  }
})