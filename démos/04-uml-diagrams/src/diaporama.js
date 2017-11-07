/* global remark document */
require('./vendors/remark-latest.min.js')

require('./styles.css')

document.getElementById('source').innerHTML = require('./diaporama.md')
remark.create({
  // see https://github.com/gnab/remark/wiki/Configuration
  highlightLines: true
})
