import $Jit from './jit-bridge.js'

// simple generator of unique ids (incremental)
let LAST_ELEMENT_ID = 0
function NEXT_ELEMENT_ID() {
  return `${LAST_ELEMENT_ID++}`
}

export class DataBuilder {
  constructor(rootLabel) {
    this.treeChartData = this.createNode(rootLabel)
  }

  createNode(label) {
    return {
      id: NEXT_ELEMENT_ID(),
      name: label,
      children: []
    }
  }

  appendLabels(...labels) {
    this.appendLabelsToNode(this.treeChartData, ...labels)

    return this
  }

  appendLabelsToNode(node, ...labels) {
    node.children.push(...labels.map(label => this.createNode(label)))
  }

  appendLeaf(label) {
    return new LeafBuilder(this, label)
  }

  getData() {
    return this.treeChartData
  }
}

class LeafBuilder {
  constructor(dataBuilder, label, parentNode = dataBuilder.treeChartData) {
    this.dataBuilder = dataBuilder
    this.parentNode = parentNode
    this.node = this.dataBuilder.createNode(label)
    this.parentNode.children.push(this.node)
  }

  appendLabels(...labels) {
    this.dataBuilder.appendLabelsToNode(this.node, ...labels)
    return this
  }

  addSibling(label) {
    return new LeafBuilder(this.dataBuilder, label, this.parentNode)
  }

  getData() {
    return this.dataBuilder.getData()
  }
}

const FONT_SIZE_LARGE = '0.8em'
const FONT_SIZE_MEDIUM = '0.7em'
const FONT_SIZE_SMALL = '0.6em'
const COLOR_NODE = '#f00'
const COLOR_EDGE = '#088'
// const LIGHT_GRAY = '#ddd'
const GRAY = '#555'

export class TreeChart {
  constructor(window, domElementHolderId, width = 600, height = 400) {
    if (!window.document.getElementById(domElementHolderId)) {
      throw new Error(`could not find an element with id="${domElementHolderId}"`)
    }

    const ht = new $Jit.Hypertree({
      //id of the visualization container
      injectInto: domElementHolderId,
      //canvas width and height
      width,
      height,
      //Change node and edge styles such as color, width and dimensions.
      Node: {
        dim: 9,
        color: COLOR_NODE
      },
      Edge: {
        lineWidth: 2,
        color: COLOR_EDGE
      },
      onBeforeCompute: () => {},
      //Attach event handlers and add text to the labels. This method is only triggered on label creation
      onCreateLabel: function(domElement, node) {
        domElement.innerHTML = node.name
        $Jit.util.addEvent(domElement, 'click', () => ht.onClick(node.id))
      },
      //Change node styles when labels are placed or moved.
      onPlaceLabel: function(domElement, node){
        const style = domElement.style
        style.display = ''
        style.cursor = 'pointer'
        if (node._depth === 0) {
          style.fontSize = FONT_SIZE_LARGE
          style.color = GRAY
        } else if (node._depth === 1) {
          style.fontSize = FONT_SIZE_MEDIUM
          style.color = GRAY
        } else if(node._depth == 2){
          style.fontSize = FONT_SIZE_SMALL
          style.color = GRAY

        } else {
          style.display = 'none'
        }

        const left = parseInt(style.left)
        const w = domElement.offsetWidth
        style.left = (left - w / 2) + 'px'
      }
    })

    this.hypertree = ht
  }

  load(jsonData) {
    this.hypertree.loadJSON(jsonData)
    this.hypertree.refresh()
    this.hypertree.controller.onComplete()
  }
}
