# Diagrammes UML

## PlantUML

* application Java sollicitable en [lignes de commande](http://plantuml.com/command-line)
* dépendance : bibliothèque Graphviz en C (pour la génération d'images)

-> ?
--

* c'est un boulot pour un loader :)
* installer les outils en local et leur déléguer la génération ?
* embarquer les applis dans un `container` ?

---
## PlantUML-file-loader

Utilisation :

```sh
yarn add -D plantuml-file-loader file-loader
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
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader?outputPath=img/'
      },
      {
*        test: /\.p?uml$/,
*        use: 'plantuml-file-loader?format=svg&outputPath=img/'
      },
      // ...
    ]
  },
  plugins: [ /*...*/ ]
}
```
