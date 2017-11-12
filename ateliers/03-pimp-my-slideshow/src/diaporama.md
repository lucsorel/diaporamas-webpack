# Du beau dans mes diapos !

Objectifs :

1. intégrer une feuille de styles CSS et une police de caractères
2. permettre d'inclure des images dans le diaporama markdown

---

## Stylage & police ligaturée

* la feuille de style est `src/styles.css`
* via une `@font-face`, elle référence la police [fonts/FiraCode-Regular.woff](https://github.com/tonsky/FiraCode), qui permet de faire des ligatures sur `===` ou `>=`
* utilisation de `css-loader` (∃ aussi pour Less & Sass) + `extract-text-webpack-plugin` pour garder la feuille de styles dans un fichier à part

Leur intégration dans le diaporama nécessite les changements suivants :

* dans `diaporama.js`

```js
require('./vendors/remark-latest.min.js')

*require('./styles.css')
```

---

* dans `webpack.config.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
*const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
*        test: /\.css$/,
*        use: ExtractTextPlugin.extract({ use: 'css-loader' })
      },
      {
*        test: /\.(ttf|woff)$/,
*        use: 'file-loader?name=[name].[ext]?outputPath=fonts/'
      },
      // ...
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(/*...*/),
*    new ExtractTextPlugin('diaporama.[contenthash].css'),
    // ...
  ]
}
```

---

* le code suivant est-il bien ligaturé ?

```js
const personnages = [
  { nom: 'Harry Cover', age: 22 },
  { nom: 'Suzie Q', age: 23 },
  { nom: 'Nasreddine Hodja', age: 17 },
]

const majeurs = personnages
  .filter(perso => perso.age >= 18)
  .map(perso => perso.nom)

if (majeurs.length === 2) {
  console.log(`un beau couple : ${majeurs.join(' & ')}`);
}
```

* lancer la construction d'artefacts et voir comment les fichiers html, css et js sont articulés

---

## Intégration d'images

Utilisation combiner du `markdown-image-loader` + `file-loader` :


```js
// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
*        test: /\.(png|jpe?g|gif|svg)$/,
*        use: 'file-loader?outputPath=img/'
      },
      {
*        test: /\.(md|markdown)$/,
*        use: 'markdown-image-loader'
      }
    ]
  },
  plugins: [ /*...*/ ]
}
```

---

## Célébration !

![](img/celebrate.png)
