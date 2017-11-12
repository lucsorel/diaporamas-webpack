# PlantUML-file-loader

Utilisation :

* dans `webpack.config.js`

```js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(png|jpe?g|gif|svg)$/,
*        use: 'file-loader?outputPath=img/'
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

---

* externaliser le fonctionnement suivant dans `img/plantuml-sequence.puml`

![](img/plantuml-sequence.puml)

Webpack -> MarkdownImageLoader : process .md file

MarkdownImageLoader -> MarkdownImageLoader : detect image references

MarkdownImageLoader -> PlantUMLFileLoader : process .puml file

PlantUMLFileLoader -> Docker : spawn think/plantuml image

PlantUMLFileLoader -> Docker : pipe .puml file content

PlantUMLFileLoader <- Docker : pipe image content

Webpack <- PlantUMLFileLoader : emit image file

MarkdownImageLoader <- PlantUMLFileLoader : replace .puml references by image modules

Webpack <- MarkdownImageLoader : exports .md as a module

---


## Célébration !

![](img/docker.png)
