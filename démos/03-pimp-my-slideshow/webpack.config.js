const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    diaporama: path.join(__dirname, 'src', 'diaporama.js'),
    vendors: [path.join(__dirname, 'src', 'vendors', 'remark-latest.min.js')]
  },
  output: {
    filename: 'démo-03-[name]-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 8083
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(ttf|woff)$/,
        use: 'file-loader?name=[name].[ext]?outputPath=fonts/'
      },
      {
        test: /\.(md|markdown)$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      xhtml: true,
      template: path.join('src', 'diaporama.html')
    }),
    new ExtractTextPlugin('diaporama.[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}
