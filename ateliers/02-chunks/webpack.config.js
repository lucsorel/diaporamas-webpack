const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'diaporama.js'),
  output: {
    filename: 'atelier-02-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 8082
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
    })
  ]
}
