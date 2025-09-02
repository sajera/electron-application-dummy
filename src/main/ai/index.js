// outsource dependencies
import { ipcMain } from 'electron'
// local dependencies
import debugInfo from '../debug-info'
import { Generator } from './image-generator'

// NOTE something specific to this particular window
export default new class AI {
  // preload = TENSERFLOW_PRELOAD_WEBPACK_ENTRY
  // url = TENSERFLOW_WEBPACK_ENTRY

  constructor () {
    const module = this.constructor.name
    const { preload, url } = this
    debugInfo.modules.unshift({ module, preload, url })
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('ai', this.handle)
  }

  handle = async (event, action, ...params) => {
    try {
      return await this[action](event, ...params)
    } catch (error) {
      return debugInfo.handleError(error, { action, params, module: this.constructor.name })
    }
  }

  'get-random-image' = async (event, action, ...params) => {
    const generator = new Generator(100, 100)
    // Generate a single image tensor
    return await generator.randomImageDataUrl()
  }

}
