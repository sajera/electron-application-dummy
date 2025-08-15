// outsource dependencies
import { BrowserWindow, ipcMain } from 'electron'

// local dependencies
import Window from './window'
import debugInfo from './debug-info'

// NOTE something specific to this particular window
export default new class WindowExplorer {
  windows = []

  constructor () {
    const { name, dbInitial, dbPath } = this
    debugInfo.modules.push({
      module: 'WindowExplorer',
      name,
      dbPath,
      dbInitial,
    })
  }

  createWindow = options => {
    options.webPreferences = options.webPreferences || {}
    options.webPreferences.preload = EXPLORER_PRELOAD_WEBPACK_ENTRY

    debugInfo.windows.push(options)
    const window = new BrowserWindow(options)
    this.windows.push(window)
    window.loadURL(EXPLORER_WEBPACK_ENTRY)
    return window
  }

  initialize = async options => {
    // NOTE setup DB handler
    ipcMain.handle('window-explorer', this.handle)

  }

  handle = (event, action, ...params) => new Promise(resolve => {
    try {
      this[action](...params)
    } catch (error) {
      resolve(debugInfo.handleError({ message: '', action, params }))
    }
  })

}
