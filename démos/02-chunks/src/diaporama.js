/* global remark document */
require('./vendors/remark-latest.min.js')

document.getElementById('source').innerHTML = require('./diaporama.md')
remark.create({
  // see https://github.com/gnab/remark/wiki/Configuration
  highlightLines: true
})
