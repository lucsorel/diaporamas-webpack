const { DataBuilder, TreeChart } = require('./tree-chart/TreeChart.js')
const datasets = {}

datasets.diaporamasWeb = {
  content: new DataBuilder('Diaporamas web')
    .appendLeaf("cas d'usage")
    // .appendLabels('présentation', 'documentation')
    .addSibling('frameworks')
    // .appendLabels('Reveal.js', 'Remark.js')
    .addSibling('combine')
    .appendLabels('HTML', 'CSS', 'JS', 'markdown')
    .addSibling('intérêts')
    .appendLabels('SaaS', 'en ligne', 'PDF')
    .getData()
}

datasets.tldr = {
  content: new DataBuilder('En qq points...')
    .appendLeaf('webpack')
    // .appendLabels('')
    .getData()
}

module.exports = function loadCharts(window) {
  Object.keys(datasets).forEach(
    datasetKey => new TreeChart(window, datasetKey,
      datasets[datasetKey].width, datasets[datasetKey].height
    ).load(datasets[datasetKey].content)
  )
}
