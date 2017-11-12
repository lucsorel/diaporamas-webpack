# Morcellement de JS

Objectif : isoler via le plugin `CommonsChunkPlugin` natif de `webpack` les 3 artefacts suivants :
* l'application de démarrage du diaporama
* l'exécutable' `webpack`
* la bibliothèque `remark.js`

---
Pour cela, il suffit de changer la configuration webpack :
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
*    filename: 'atelier-02-[name]-[hash].js', /**/
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

---

Comparer :

* lancer la création des artefacts (`npm run build` ou `yarn build`)
* constater la présence de 3 fichiers `atelier-02-[diaporama|runtime|vendors]-[hash].js`

---

**Célébrer !**

```
    \o/  \o/
```
