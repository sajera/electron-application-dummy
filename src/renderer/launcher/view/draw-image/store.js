// outsource dependencies
import _ from 'lodash'
import { fabric } from 'fabric'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'
import { DrawLS } from '../../local-storage'
import { FormData } from '../../../component/form'

const initialSize = {
  width: 100,
  height: 100,
  point: 10,
}

class DrawImagePageStore {
  showControls = false
  initialized = true
  errorMessage = null
  disabled = new Map()

  data = null
  // fabric = null // avoid mobx observation
  canvas = null

  options = {
    backgroundColor: 'transparent',
    pencilColor: '#000000',
    isDrawingMode: true,
    isGridMode: true,
  }

  constructor () {
    this.sizeForm = new FormData(initialSize, this.validateSizeForm, this.resetFabric)
    makeAutoObservable(this)
  }

  clearError = () => this.errorMessage = null

  errorHandler = header => ({ message = 'Something went wrong here' }) => {
    toast.error(message, header)
    // NOTE provide error into page
    runInAction(() => this.errorMessage = `${header}: ${message}`)
  }

  initialize = canvas => {
    // NOTE reset
    this.clearError()
    this.initialized = true
    this.showControls = false
    if (!canvas) return

    const toRestore = DrawLS.get()
    if (toRestore) {
      this.options = _.omit(toRestore, ['width', 'height', 'point'])
      this.sizeForm.initialize(_.pick(toRestore, ['width', 'height', 'point']))
    }
    this.canvas = canvas
    this.resetFabric(this.sizeForm.value, this.canvas)


    // NOTE record last state of page
    return () => DrawLS.set({
      ...this.options,
      ...this.sizeForm.value
    })
  }

  update = payload => {
    for (const prop in payload) {
      // NOTE just in case
      if (['options', 'fabric', 'canvas', 'data', 'disabled'].includes(prop)) continue
      this[prop] = payload[prop]
    }
  }

  resetFabric = ({ width, height, point }) => {
    if (this.fabric) this.fabric.dispose()
    this.fabric = new fabric.Canvas(this.canvas, {
      interactive: true, // NOTE require "resetFabric" to apply
      width: width * point,
      height: height * point,
    })
    this.fabric.freeDrawingBrush.width = point
    // NOTE apply after reset
    this.setBG(this.options.backgroundColor)
    this.setGridMode(this.options.isGridMode)
    this.setPencilColor(this.options.pencilColor)
    this.setDrawingMode(this.options.isDrawingMode)
    // TODO remove - for development mode when page is reloaded
    DrawLS.set({ ...this.options, ...this.sizeForm.value })
    console.log(`%c resetFabric ${1} `, 'color: #FF6766; font-weight: bolder;'
      , '\n fabric:', { ...this.fabric }
      , '\n sizeForm:', {...this.sizeForm.value}
      , '\n options:', { ...this.options }
      , '\n width:', width
      , '\n height:', height
      , '\n point:', point
    )
  }

  validateSizeForm = values => {
    const errors = {}

    errors.width = !values.width ? 'Mandatory'
      : values.width < 10 ? 'Minimum 10'
        : values.width > 1000 ? 'Maximum 1000' : null

    errors.height = !values.height ? 'Mandatory'
      : values.height < 10 ? 'Minimum 10'
        : values.height > 1000 ? 'Maximum 1000' : null

    errors.point = !values.point ? 'Mandatory'
      : values.point < 1 ? 'Minimum 1'
        : values.point > 50 ? 'Maximum 50' : null

    // console.log(`%c validate ${_.size(values)}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', { ...errors }
    // )
    return errors
  }

  setDrawingMode = value => this.fabric.isDrawingMode = this.options.isDrawingMode = value

  setPencilColor = value => this.fabric.freeDrawingBrush.color = this.options.pencilColor = value

  setBG = value => {
    this.fabric.backgroundColor = this.options.backgroundColor = value
    this.fabric.renderAll()
  }

  setGridMode = value => {
    this.options.isGridMode = value
    if (this.options.isGridMode) this.drawGrid()
    else this.removeGrid()
  }

  removeGrid = () => {
    this.fabric.remove(this.grid)
    this.fabric.renderAll()
    this.grid = null
  }

  drawGrid = () => {
    const gridLines = buildGridLines({
      point: this.fabric.freeDrawingBrush.width,
      width: this.fabric.getWidth(),
      height: this.fabric.getHeight(),
    })
    this.grid = new fabric.Group(gridLines, {
      left: 0,
      top: 0,
      evented: false,
      selectable: false,
    })
    this.fabric.add(this.grid)
    this.fabric.moveTo(this.grid, 0)
    this.fabric.renderAll()
  }

  todo = values => {
    this.clearError()
    this.disabled.set('get-random-image', true)

    // console.log(`%c DrawImagePageStore ${'submit'} `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    // )
    // NOTE no parameters for now
    return preload.ai('get-random-image', {})
      .then(data => runInAction(() => {
        console.log(`%c DrawImagePageStore ${'output'} `, 'color: #FF6766; font-weight: bolder;'
          , '\n data:', data
        )
      }))
      .catch(this.errorHandler('Image Generation'))
      .finally(() => runInAction(() => this.disabled.set('get-random-image', false)))
  }

}

export const drawImagePageStore = new DrawImagePageStore()
export default drawImagePageStore


function buildGridLines ({ width, height, point }) {
  const grid = []
  const options = { stroke: '#0000002b', strokeWidth: 1 }
  // NOTE vertical lines
  for (let i = 0; i <= width / point; i++) {
    const x = i * point
    const line = new fabric.Line([x, 0, x, height], options)
    grid.push(line)
  }
  // NOTE horizontal lines
  for (let i = 0; i <= height / point; i++) {
    const y = i * point
    const line = new fabric.Line([0, y, width, y], options)
    grid.push(line)
  }
  return grid
}
