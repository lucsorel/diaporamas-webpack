# Du beau dans mes diapos !

## Stylage

* CSS
* `extract-text-webpack-plugin` + `css-loader`

(∃ aussi pour Less & Sass)

---

## Police ligaturée

* https://github.com/tonsky/FiraCode
* `file-loader`

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

---

## Markdown-image-loader

Utilisation :

```sh
yarn add -D markdown-image-loader file-loader
```

--

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

M'enfin ?!?
