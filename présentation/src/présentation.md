
class: center, middle

# Webpack & diaporamas web

.spacer[
### Interactifs & illustrés
]

.spacer[
### Écrire ses loaders
]

.spacer[
### Avec des containers dedans !
]

---

## À propos

<div id="quiSuisJe"></div>

---

## Diaporamas web

<div id="diaporamasWeb"></div>

???

illustrer les avantages de Remark.js
* `p` pour passer en mode "présentateur"
* `c` pour ouvrir une popup pour l'audience, synchronisée avec la vue "présentateur"
* `b` pour dés/activer l'écran

---

## Webpack

![](img/webpack-process.png)

* producteur (incrémental) d'**artefacts** pour le navigateur
--

* agrège les ressources comme des `modules`
--

* **[loaders](https://github.com/webpack/webpack#loaders)** : prétraitements `^(?!.*js)` -> modules `js` (import textuel, transpilage, templating, styles, composants)
--

* **[plugins](https://github.com/webpack/webpack#plugins)** : autres traitements de fichiers
  * fusion / morcellement de fichiers (js, sprites)
  * extraction / inclusion (html, css)

???

* Node.js : peut combiner des modules ES, CommonJS, AMD
* typescript, image -> inline base64, CSS
* morcellement : minification & obfuscation inutiles pour les bibliothèques (vendors)

---

## Webpack-dev-server

* server web de développement pour webpack
--

* construit les fichiers statiques en mémoire
--

* rechargement à chaud

--

## Diaporama + webpack / dev-server = ?

* visualisation à la réalisation
--

* génération automatique des fichiers statiques
--

* scripts `npm`
  * PDF
  * déploiement
--

* **interactions** avec l'audience

---

# Démo 1

Configuration minimaliste webpack-Remark.js

--

## Dépendances

```sh
yarn add -D webpack webpack-dev-server raw-loader\
  html-webpack-plugin extract-text-webpack-plugin
```

--

## Tâches npm

```js
{
  // ...
  "scripts": {
    "build": "rm -rf dist && webpack",
    "start": "webpack-dev-server"
  },
  // ...
}
```

---

## Bilan démo 1

* externalisation du fichier `markdown`
* -> coloration syntaxique par votre éditeur
--

* exposé sous forme de chaîne de caractères via un module
* génération d'un fichier `index.html` intégrant l'**artefact de compilation**...
--

  * il est **gros** !
--

![](img/obélix-300x268.jpg)

---

## Démo 2

Isoler les modules métier JS des bibliothèques

* ne minifier que le nécessaire ([uglifyjs-webpack-plugin](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/))
* build incrémental -> plus rapide

---

## Bilan démo 2

![](img/monsieur-maigre.png)
* utilisation de hash dans les noms de fichiers générés (cache)

---

## Démo 3

Pimp my slideshow!

* stylage personnalisé & polices
--

* images (ignorées par le `raw-loader`)
  * copier ?
  * inclure dans le cycle de dépendances ?

---

### Mardown-image-loader

* le `raw-loader` :
  * ne distingue pas les références aux images
  * ne les inclut pas dans la chaîne de dépendances
--

* projet github [lucsorel/markdown-image-loader](https://github.com/lucsorel/markdown-image-loader) avec exemples de [setups Reveal.js et Remark.js](https://github.com/lucsorel/markdown-image-loader#web-based-slideshows)
--

* inspiré de l'article [Webpack: A simple loader](https://bocoup.com/blog/webpack-a-simple-loader) de [Michael "Z" Goddard](http://zfighting.tumblr.com/tagged/I-MADE-DIS) avec des améliorations :
  * en ES6
  * pour webpack 2/3+
  * distingue les références "fichiers" des URLs
  * cas d'utilisations et tests unitaires

---

Principes :
* tronçonne le fichier markdown selon ses références aux images (RegExp plutôt que par un parser)

```js
// détection des motifs ![...] (chemin/sans/http-s/vers/image)
const markdownImageReferencesRE =
  /(!\[[^\]]*\]\((?!(?:https?:)?\/\/)[^)]+\))/g
```

---

* les références sont transformées en dépendances de module
* le reste est **JSON-stringifié** (comme le `raw-loader` le faisait)

```js
// regexp similaire à la précédente avec des groupes de capture
const imagePathRE =
  /^(!\[[^\]]*\]\()((?!(?:https?:)?\/\/)[^)]+)(\))$/

const stgf = JSON.stringify

function requirifyImageReference(markdownImageReference) {
  const [, imgStart, imgPath, imgEnd ] =
      imagePathRE.exec(markdownImageReference) || []
  if (!imgPath) {
    return stgf(markdownImageReference)
  } else {
*    const imgRequest = loaderUtils.stringifyRequest(
*      this, // le loader et ses options
*      loaderUtils.urlToRequest(imgPath)
*    )

    return (
*      `${stgf(imgStart)}+require(${imgRequest})+${stgf(imgEnd)}`
    )
  }
}
```

---

* le tout est exporté comme un module :

```js
// exports the MarkdownImageLoader loader function
module.exports = function MarkdownImageLoader(mdContent = '') {
  // the outputs of this loader can be cached
  this.cacheable && this.cacheable()

  return `
module.exports = [
${mdContent.split(markdownImageReferencesRE)
  .map(requirifyImageReference)
  .join(',\n')}
].join('')`
}
```

---

## Bilan démo 3

* couple loader-plugin pour externaliser la feuille de styles
--

* `markdown-image-loader` :
  * transforme les références aux images en modules requis
  * `this.cacheable()` => création incrémentale d'artefacts

---

## Démo 4

Intégration de diagrammes UML :

* du fichier source à l'image
  * c'est un boulot pour un loader :)

--

![](img/plantuml.png)

* [PlantUML](http://plantuml.com/) :
  * application Java sollicitable en [lignes de commande](http://plantuml.com/command-line)
  * dépendance : bibliothèque Graphviz en C (génère les images)

-> ?
--

* installer les outils en local et leur déléguer la génération ?
* embarquer les applis dans un `container` ?

---

### PlantUML-file-loader

* projet github [lucsorel/plantuml-file-loader](https://github.com/lucsorel/plantuml-file-loader)
--

* inspiré de [yury/plantuml-loader](https://github.com/yury/plantuml-loader) de **Yury Korolev** avec des améliorations :
  * en ES6
  * images générées en fichiers tiers (plutôt que remplacement inline)
  * utilisation d'API Node.js non bloquantes
  * tests unitaires

---

### Fonctionnement

```js
*module.exports.raw = true // handles PlantUML contents as buffers

module.exports = function PlantUmlFileLoader(plantUmlBuffer) {
  const callback = this.async()
  const conf = Object.assign({}, DEFAULT_CONFIG, /*...*/)
  const url = loaderUtils.interpolateName(this,
      `${conf.outputPath}${conf.name}.${conf.format}`, {/*...*/})
  const publicPath =
    `__webpack_public_path__ + ${JSON.stringify(url)}`

*  const umlProcess = childProcess.spawn('docker', ['run -i --rm',
*    'think/plantuml', '-charset utf8', `-t${conf.format}`]
*  )
  bufferAsStream(plantUmlBuffer).pipe(umlProcess.stdin)

  const chunks = [], errors = []
  umlProcess.stdout.on('data', d => chunks.push(d))
  umlProcess.stderr.on('data', e => errors.push(e))
  umlProcess.on('close', () => {
    if (errors.length === 0) {
*      this.emitFile(url, Buffer.concat(chunks))
*      callback(null, `module.exports = ${publicPath};`)
    } else callback(new Error(errors.join(', ')))
  })
}
```

---

## Bilan démo 4

* loader + `container docker` de conversion (transposable à d'autres applications ayant un CLI)
* seulement les sources de diagrammes à versionner
* environnement presque WYSIWYG pour l'édition de diagrammes

---

class: merci

# Merci !

<div id="tldr"></div>

---

class: center, middle, merci

# Des questions ?
