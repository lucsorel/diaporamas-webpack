/* global remark window document */
require('./vendors/remark-latest.min.js')
require('./présentation.css')

const loadCharts = require('./mindmaps.js')

// loads the markdown content and starts the slideshow
document.getElementById('source').innerHTML = require('./présentation.md')
remark.create({
  // see https://github.com/gnab/remark/wiki/Configuration
  highlightLines: true
})

setTimeout(() => loadCharts(window), 10)
