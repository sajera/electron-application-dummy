// outsource dependencies
import _ from 'lodash'
import { fabric } from 'fabric'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import './selectable-controls.fabric'
import toast from '../../../component/toast'
import { DrawLS } from '../../local-storage'
import { FormData } from '../../../component/form'
import { delayResolve, delayReject } from '../../../../service'

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
    pencilSize: 3,
    isGridMode: true,
    grid: 10,
  }

  constructor () {
    // https://fabric5.fabricjs.com/fabric-intro-part-2#text
    this.textForm = new FormData({
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'Times New Roman', // NOTE same as fabric.js default
      fill: '#000',
      fontSize: 18,
      overline: false,
      linethrough: false,
      underline: false,
      stroke: '',
      strokeWidth: '',
      lineHeight: 1.2,
      text: ''
    }, this.validateTextForm, this.addText)
    this.sizeForm = new FormData({ width: 100, height: 100 }, this.validateSizeForm, this.resetFabric)
    this.circleForm = new FormData({ radius: 50, stroke: '#333', strokeWidth: 2, fill: '' }, this.validateCircleForm, this.addCircle)
    this.rectForm = new FormData({ width: 50, height: 50, stroke: '#333', strokeWidth: 2, fill: '' }, this.validateRectForm, this.addRect)
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
      this.options = _.omit(toRestore, ['width', 'height'])
      this.sizeForm.initialize(_.pick(toRestore, ['width', 'height']))
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
      height: height,
      width: width,
    })
    // NOTE apply after reset
    this.setBG(this.options.backgroundColor)
    this.setGridMode(this.options.isGridMode)
    this.setPencilSize(this.options.pencilSize)
    this.setPencilColor(this.options.pencilColor)
    this.setDrawingMode(this.options.isDrawingMode)
  }

  validateSizeForm = values => {
    const errors = {}

    errors.width = !values.width ? 'Mandatory'
      : values.width < 10 ? 'Minimum 10'
        : values.width > 1000 ? 'Maximum 1000' : null

    errors.height = !values.height ? 'Mandatory'
      : values.height < 10 ? 'Minimum 10'
        : values.height > 1000 ? 'Maximum 1000' : null

    // console.log(`%c validate ${_.size(values)}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', { ...errors }
    // )
    return errors
  }

  setGridSize = value => this.options.grid = value

  setPencilSize = value => this.fabric.freeDrawingBrush.width = this.options.pencilSize = value

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
    this.removeGrid()
    const gridLines = buildGridLines({
      grid: this.options.grid,
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

  addImageToCanvas = file => {
    this.disabled.set('add-image-to-canvas', true)
    return Promise.race([
      delayReject(3e3, { message: `Failed to read file "${file.name}"` }),
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = ({ target }) => resolve(target.result)
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
      })
    ])
      .then(dataUrl => Promise.race([
        delayReject(3e3, { message: `Failed to draw image "${file.name}"` }),
        new Promise(resolve => {
          const fw = this.fabric.getWidth()
          const fh = this.fabric.getHeight()
          // IMPORTANT might be an issues with SVG that doesn't have correct sizes as attributes - fix svg itself ¯\_(ツ)_/¯
          fabric.Image.fromURL(dataUrl, image => {
            image.scale(Math.min(fw / image.width, fh / image.height))
            this.fabric.add(image)
            this.fabric.centerObject(image)
            this.fabric.renderAll()
            this.setDrawingMode(false)
            resolve()
          })
        })
      ]))
      .catch(this.errorHandler('Add image to canvas'))
      .finally(() => runInAction(() => this.disabled.set('add-image-to-canvas', false)))
  }

  addText = values => {
    const text = new fabric.Text(values.text, { ...values, })
    this.fabric.add(text)
    this.fabric.centerObject(text)
    this.fabric.renderAll()
    this.setDrawingMode(false)
  }

  validateTextForm = values => {
    const errors = {}

    errors.text = !values.text ? 'Mandatory' : null
    errors.fill = !values.fill ? 'Mandatory' : null

    errors.fontSize = !values.fontSize ? 'Mandatory'
      : values.fontSize < 8 ? 'Minimum 8'
        : values.fontSize > 100 ? 'Maximum 100' : null

    // console.log(`%c validate ${_.size(values)}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', { ...errors }
    // )
    return errors
  }

  addRect = values => {
    const rect = new fabric.Rect({ ...values, })
    this.fabric.add(rect)
    this.fabric.centerObject(rect)
    this.fabric.renderAll()
    this.setDrawingMode(false)
  }

  validateRectForm = values => {
    const errors = {}

    errors.width = !values.width ? 'Mandatory'
      : values.width < 10 ? 'Minimum 10'
        : values.width > 1000 ? 'Maximum 1000' : null

    errors.height = !values.height ? 'Mandatory'
      : values.height < 10 ? 'Minimum 10'
        : values.height > 1000 ? 'Maximum 1000' : null

    errors.stroke = !values.stroke ? 'Mandatory' : null

    errors.strokeWidth = !values.strokeWidth ? 'Mandatory'
      : values.strokeWidth < 1 ? 'Minimum 1'
        : values.strokeWidth > 100 ? 'Maximum 100' : null

    // console.log(`%c validate ${_.size(values)}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', { ...errors }
    // )
    return errors
  }

  addCircle = values => {
    const circle = new fabric.Circle({ ...values, })
    this.fabric.add(circle)
    this.fabric.centerObject(circle)
    this.fabric.renderAll()
    this.setDrawingMode(false)
  }

  validateCircleForm = values => {
    const errors = {}

    errors.radius = !values.radius ? 'Mandatory'
      : values.radius < 10 ? 'Minimum 10'
        : values.radius > 1000 ? 'Maximum 1000' : null

    errors.stroke = !values.stroke ? 'Mandatory' : null

    errors.strokeWidth = !values.strokeWidth ? 'Mandatory'
      : values.strokeWidth < 1 ? 'Minimum 1'
        : values.strokeWidth > 100 ? 'Maximum 100' : null

    // console.log(`%c validate ${_.size(values)}`, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', { ...values }
    //   , '\n errors:', { ...errors }
    // )
    return errors
  }

  savePNG = () => {
    // TODO file name
    const fileName = 'X'
    this.disabled.set('to-png', true)
    // console.log(`%c savePNG ${1} `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n fabric:', { ...this.fabric }
    //   , '\n sizeForm:', {...this.sizeForm.value}
    //   , '\n options:', { ...this.options }
    // )
    return Promise.race([
      delayReject(3e3, { message: `Failed to create image "${fileName}.png"` }),
      new Promise(resolve => {
        const a = document.createElement('a')
        this.grid.visible = false
        const dataUrl = this.fabric.toDataURL({ format: 'png', quality: 1 })
        this.grid.visible = true
        a.setAttribute('href', dataUrl)
        a.setAttribute('download', `${fileName}.png`)
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        // document.body.removeChild(a)
        a.remove()
        resolve()
      })
    ])
      .catch(this.errorHandler('Create PNG image'))
      .finally(() => runInAction(() => this.disabled.set('to-png', false)))
  }

  saveRAW = () => {
    console.log(`%c saveRAW ${1} `, 'color: #FF6766; font-weight: bolder;'
      , '\n fabric:', { ...this.fabric }
      , '\n sizeForm:', {...this.sizeForm.value}
      , '\n options:', { ...this.options }
    )
  }

}

export const drawImagePageStore = new DrawImagePageStore()
export default drawImagePageStore


function buildGridLines ({ width, height, grid, stroke = '#0000002b' }) {
  const lines = []
  // NOTE restrict grid cell size from 5 to 50 px
  grid = grid >= 5 && grid < 51 ? grid : 5
  // NOTE vertical lines
  for (let i = 0; i <= width / grid; i++) {
    const x = i * grid
    const strokeWidth = i && !(i%10) ? 2 : 1
    lines.push(new fabric.Line([x, 0, x, height], { stroke, strokeWidth }))
  }
  // NOTE horizontal lines
  for (let i = 0; i <= height / grid; i++) {
    const y = i * grid
    const strokeWidth = i && !(i%10) ? 2 : 1
    lines.push(new fabric.Line([0, y, width, y], { stroke, strokeWidth }))
  }
  return lines
}
