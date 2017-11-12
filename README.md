
# Diaporamas webpack

> Interactifs & illustrés, écrire ses loaders, avec des containers dedans !

Les objectifs de ce contenu sont de présenter :

* `webpack` & `webpack-dev-server` dans le contexte de la construction ou projection de **diaporamas web** basés sur du contenu **markdown** (avec [Remark.js](http://remarkjs.com/), mais transposables à [Reveal.js](http://lab.hakim.se/reveal-js/), voir [ces configurations](https://github.com/lucsorel/markdown-image-loader#web-based-slideshows))
* deux loaders réalisés pour inclure des médias dans de tels diaporamas :
  * [markdown-image-loader](https://github.com/lucsorel/markdown-image-loader) : pour inclure des images
  * [plantuml-file-loader](https://github.com/lucsorel/plantuml-file-loader) : pour inclure comme des images des fichiers source [PlantUML](http://plantuml.com/), la conversion étant déléguée à un container Docker lancé par le loader

# Organisation

Ce contenu est composé :

* d'un diaporama principal ([présentation](présentation/src/présentation.md))
* de plusieurs ateliers (dans [ateliers](ateliers)) permettant d'illustrer ou de mettre en pratique (selon que les travaux soient réalisés par le présentateur⋅ice ou l'audience) les différents points abordés

Le diaporama principal et les ateliers sont des diaporamas web faits avec webpack/dev-server et Remark.js afin de mettre en pratique le contenu exposé. Oui, c'est une inception ou une mise en abyme ツ. La présentation principale sera servie sur [localhost:9090](http://localhost:9090) et les ateliers sur [localhost:8081](http://localhost:8081), [localhost:8082](http://localhost:8082), etc.

## Prérequis

* **Node.js** 6.11+ : les loaders `markdown-image-loader` & `plantuml-file-loader` sont utilisés par le diaporama principal et ceux de certains ateliers. Ils ont été développés en ES6 et requièrent donc une version 6.11+ de Node.js pour que les diaporamas puissent être lancés.

* les dépendances Node.js requises par la présentation et les ateliers doivent être installées :
  * avec la commande `npm run install:all`
  * ou `yarn install:all` (si vous avez installé [yarn](https://yarnpkg.com/))


* le service **Docker** doit être lancé et la commande `docker` exécutable sans `sudo` : en effet, le loader `plantuml-file-loader` délègue la conversion des fichiers sources PlantUML à un container sans être super-utilisateur (voir la [configuration de post-installation](https://docs.docker.com/engine/installation/linux/linux-postinstall/) pour ajouter votre utilisateur au groupe `docker`)

## Les ateliers

Ils illustrent ou mettent en pratique les points suivants :

* [01-webpack-remarkjs](ateliers/01-webpack-remarkjs) :
  * présentation de la configuration webpack pour lancer un diaporama avec webpack/dev-server
  * utilisation du `raw-loader` pour externaliser un contenu markdown et l'inclure dans l'application web lançant le diaporama


* [02-chunks](ateliers/02-chunks) : utilisation de plugins pour séparer les artefacts js produits par webpack : le cœur webpack, les bibliothèques tierces, l'application du diaporama

* [03-pimp-my-slideshow](ateliers/03-pimp-my-slideshow) utilisation :
  * du `css-loader` et du `extract-text-webpack-plugin` pour intégrer CSS et police de caractères
  * de `markdown-image-loader` & `file-loader` pour intégrer des images au diaporama


* [04-uml-diagrams](ateliers/04-uml-diagrams) utilisation du `plantuml-file-loader` pour inclure un diagramme UML expliquant le process du loader dans le diaporama

# Versions

* 1.0.**1** : modifications pour rendre publique cette présentation (compléments, ajustements, mode d'emploi)
* **1.0.0** : version présentée lors du bootcamp Zenika le 8/11/2017

Vous êtes invité⋅e à proposer des améliorations ou des corrections via des `pull request`s.

# Licence

Cette présentation et les ateliers sont publiés sous [licence MIT](LICENCE). Ces contenus ont été inspirés en partie par les travaux de :

* [Sébastien Castiel](https://github.com/scastiel) pour la combinaison webpack/dev-server + Remark.js
* [Michael "Z" Goddard](https://bocoup.com/blog/webpack-a-simple-loader) pour l'extraction d'image dans un document markdown
* [Yury Korolev](https://github.com/yury/plantuml-loader) pour déléguer la conversion d'un fichier PlantUML à un container

Copyright (c) 2017 Luc Sorel-Giffo
