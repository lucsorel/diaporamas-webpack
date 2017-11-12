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
    filename: 'atelier-04-[name]-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 8084
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
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader?outputPath=img/'
      },
      {
        test: /\.p?uml$/,
        use: 'plantuml-file-loader?format=svg&outputPath=img/'
      },
      {
        test: /\.(md|markdown)$/,
        loader: 'markdown-image-loader'
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
