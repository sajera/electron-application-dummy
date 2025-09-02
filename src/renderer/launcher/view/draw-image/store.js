// outsource dependencies
import { fabric } from 'fabric'
import { makeAutoObservable, runInAction } from 'mobx'
// local dependencies
import toast from '../../../component/toast'


class DrawImagePageStore {
  showControls = false
  initialized = true
  errorMessage = null
  disabled = new Map()

  data = null
  fabric = null
  canvas = null

  options = {
    backgroundColor: 'transparent',
    isDrawingMode: true,
    interactive: true, // NOTE require "resetFabric" to apply
    height: 600,
    width: 800,
  }

  constructor () {
    makeAutoObservable(this)
  }

  clearError = () => this.errorMessage = null

  errorHandler = header => ({ message = 'Something went wrong here' }) => {
    toast.error(message, header)
    // NOTE provide error into page
    runInAction(() => this.errorMessage = `${header}: ${message}`)
  }

  initialize = () => {
    // NOTE reset
    this.clearError()
    this.showControls = false

    // TODO load data ?
    this.initialized = true

    return () => {

    }
  }

  setupCanvas = canvas => this.resetFabric(this.canvas = canvas)

  resetFabric = () => {
    if (this.fabric) this.fabric.dispose()
    this.fabric = new fabric.Canvas(this.canvas, this.options)
  }

  updateFabric = payload => {
    console.log(`%c updateFabric ${1} `, 'color: #FF6766; font-weight: bolder;'
      , '\n fabric:', { ...this.fabric }
      , '\n payload:', { ...payload }
      , '\n this.options:', { ...this.options }
    )
    for (const prop in payload) {
      this.options[prop] = payload[prop]
      this.fabric[prop] = payload[prop]
    }
    this.fabric.renderAll()
  }

  update = payload => {
    for (const prop in payload) {
      // NOTE just in case
      if (['options', 'fabric', 'canvas', 'data', 'disabled'].includes(prop)) continue
      this[prop] = payload[prop]
    }
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
