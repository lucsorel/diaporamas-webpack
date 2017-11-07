# Morcellement de JS

* via le plugin `CommonsChunkPlugin` natif
* isoler le runtime `webpack`
* isoler la bibliothèque `remark.js`

---

```js
// webpack.config.js
*const webpack = require('webpack')

module.exports = {
  entry: {
*    diaporama: path.join(__dirname, 'src', 'diaporama.js'),
*    vendors: [path.join(__dirname, 'src', 'vendors',
*       'remark-latest.min.js')]
  },
  output: {
*    filename: 'démo-02-[name]-[hash].js', /**/
  },
  module: { rules: [/*...*/] },
  plugins: [
    new HtmlWebpackPlugin({
      xhtml: true,
      template: path.join('src', 'diaporama.html')
    }),
*    new webpack.optimize.CommonsChunkPlugin({
*      name: 'vendors'
*    }),
*    new webpack.optimize.CommonsChunkPlugin({
*      name: 'runtime'
*    })
  ]
}
```
