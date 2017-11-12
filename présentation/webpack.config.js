const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'présentation.js'),
    vendor: ['./src/vendors/remark-latest.min.js', './src/vendors/jit-yc.js']
  },
  output: {
    filename: 'présentation-[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    port: 9090
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
        use: 'markdown-image-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join('src', 'présentation.html')
    }),
    new ExtractTextPlugin('présentations.[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  ]
}
