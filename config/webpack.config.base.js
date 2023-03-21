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
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
    extensions: [".js", ".vue", ".scss", ".css"],
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workerParallelJobs: 2
            }
          },
          {
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
        ]
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
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'vue',
          entry: 'https://unpkg.com/vue@3.2.45/dist/vue.global.js',
          global: 'Vue'
        },
        {
          module: 'vue-router',
          entry: 'https://unpkg.com/vue-router@4.1.6/dist/vue-router.global.js',
          global: 'VueRouter'
        },
        {
          module: 'vue-demi',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/vue-demi/0.13.11/index.iife.js',
          global: 'VueDemi'
        },
        {
          module: 'pinia',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.0.32/pinia.iife.js',
          global: 'Pinia'
        },
        {
          module: 'xe-utils',
          entry: 'https://cdn.jsdelivr.net/npm/xe-utils@3.5.7/dist/xe-utils.umd.min.js',
          global: 'XEUtils'
        },
        {
          module: 'vxe-table',
          entry: 'https://cdn.jsdelivr.net/npm/vxe-table@4.3.10/lib/index.umd.min.js',
          global: 'VXETable'
        }
      ]
    })
  ],
  stats: {
    builtAt: true
  }
}