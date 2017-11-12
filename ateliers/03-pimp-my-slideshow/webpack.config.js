const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    diaporama: path.join(__dirname, 'src', 'diaporama.js'),
    vendors: [path.join(__dirname, 'src', 'vendors', 'remark-latest.min.js')]
  },
  output: {
    filename: 'atelier-03-[name]-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 8083
  },
  module: {
    rules: [
      {
        test: /\.(md|markdown)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join('src', 'diaporama.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}
