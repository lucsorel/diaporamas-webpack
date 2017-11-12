const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'diaporama.js'),
  output: {
    filename: 'atelier-01-[hash].js',
    path: path.join(__dirname, 'dist')
  },
  devServer: {
    port: 8081
  },
  module: {
    rules: []
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join('src', 'diaporama.html')
    })
  ]
}
