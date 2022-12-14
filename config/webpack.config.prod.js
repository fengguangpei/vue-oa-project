const base = require('./webpack.config.base.js');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const ElementPlus = require('unplugin-element-plus/webpack')
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
        vue: {
          test: /[\\/]node_modules[\\/](@vue)[\\/]/,
          name: 'vue',
          chunks: 'all',
          enforce: true
        },
        'vue-router': {
          test: /[\\/]node_modules[\\/](vue-router)[\\/]/,
          name: 'vue-router',
          chunks: 'all',
          enforce: true
        },
        'pinia': {
          test: /[\\/]node_modules[\\/](pinia)[\\/]/,
          name: 'pinia',
          chunks: 'all',
          enforce: true
        },
        'vue-table': {
          test: /[\\/]node_modules[\\/](vxe-table|xe-utils)[\\/]/,
          name: 'vxe-table',
          chunks: 'all',
          enforce: true
        },
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