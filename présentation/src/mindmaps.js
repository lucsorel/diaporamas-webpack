const { DataBuilder, TreeChart } = require('./tree-chart/TreeChart.js')
const datasets = {}

datasets.quiSuisJe = {
  content: new DataBuilder('Luc Sorel-Giffo')
    .appendLeaf('social')
    .appendLabels('@lucsorel', 'github.com/lucsorel')
    .addSibling('pro')
    .appendLabels('2017+ : Zenika', '2016-17 : Energiency', '2010-16 : Podbox', '2005-08 : PhD Inra')
    .addSibling('hobbies')
    .appendLabels('musique : piano/guitare', 'humanitaire : Tous pour la Syrie', 'vacataire MyDigitalSchool')
    .getData()
}

datasets.diaporamasWeb = {
  content: new DataBuilder('Diaporamas web')
    .appendLeaf("cas d'usage")
    .appendLabels('présentation', 'documentation')
    .addSibling('frameworks')
    .appendLabels('Reveal.js', 'Remark.js')
    .addSibling('combine')
    .appendLabels('HTML', 'CSS', 'JS', 'markdown')
    .addSibling('intérêts')
    .appendLabels('SaaS', 'en ligne', 'PDF')
    .getData()
}

datasets.tldr = {
  content: new DataBuilder('En qq points...')
    .appendLeaf('webpack')
    .appendLabels('artefacts', 'incrémental', 'loaders', 'plugins')
    .addSibling('webpack-dev-server')
    .appendLabels('en mémoire', 'live-reload')
    .addSibling('Remark.js')
    .appendLabels('markdown', 'setup minimal', 'tech-friendly')
    .addSibling('markdown-image-loader')
    .appendLabels("![](my.png) -> require('my.png')", 'sync')
    .addSibling('plantuml-file-loader')
    .appendLabels('docker', 'async', "![](chart.puml) -> require('chart.svg')")
    .getData()
}

module.exports = function loadCharts(window) {
  Object.keys(datasets).forEach(
    datasetKey => new TreeChart(window, datasetKey,
      datasets[datasetKey].width, datasets[datasetKey].height
    ).load(datasets[datasetKey].content)
  )
}
