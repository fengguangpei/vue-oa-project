const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    Vendor: ['element-plus', 'pinia', 'qiankun', 'vue', 'vue-router', 'vxe-table', 'xe-utils']
  },
  output: {
    filename: '[name]_dll.js',
    path: path.resolve(__dirname, '../vendor'),
    publicPath: '/vendor',
    library: '[name]_dll'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_dll',
      path: path.resolve(__dirname, '../vendor' + '/[name]_manifest.json')
    })
  ]
}
