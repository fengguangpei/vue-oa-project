const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const webpack = require('webpack')
// 按需导入
const Components = require('unplugin-vue-components/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "../src")
    },
    extensions: [".js", ".vue", ".scss", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './images/[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        }),
      ]
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ]
    }),
    Icons({
      autoInstall: true
    })
  ]
}