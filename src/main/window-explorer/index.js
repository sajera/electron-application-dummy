// outsource dependencies
import _ from 'lodash'
import { ipcMain } from 'electron'
// local dependencies
import { windowSQL } from './model'
import debugInfo from '../debug-info'
import WindowRuntime from './window-runtime'

// NOTE something specific to this particular window
export default new class WindowExplorer {
  runtime = {}
  runtimes = []

  preload = EXPLORER_PRELOAD_WEBPACK_ENTRY
  url = EXPLORER_WEBPACK_ENTRY

  constructor () {
    const module = this.constructor.name
    const { preload, url } = this
    debugInfo.modules.unshift({ module, preload, url })
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('window-explorer', this.handle)
  }

  handle = async (event, action, ...params) => {
    try {
      return await this[action](event, ...params)
    } catch (error) {
      return debugInfo.handleError(error, { action, params, module: this.constructor.name })
    }
  }

  /************************************************
   *         Windows Options management
   ************************************************/
  'get-all' = () => windowSQL.getAll()

  'get-window-by-id' = (e, id) => windowSQL.getByID(id)

  'remove-window-by-id' = (e, id) => {
    this['stop-runtime-by-id'](id)
    return windowSQL.removeByID(id)
  }

  'create-window' = (e, data) => windowSQL.insert(data)

  'update-window' = (e, data) => windowSQL.updateByID(data.id, data)

  /************************************************
   *          RUNTIME Windows
   ************************************************/
  'get-window-details-by-id' = async (e, runtimeID) => {
    const options = await windowSQL.getByID(runtimeID)
    const runtime = WindowRuntime.getById(runtimeID)
    return {
      active: Boolean(runtime),
      runtimeID: runtime?.id,
      windowId: runtime?.windowID,
      options,
      state: runtime?.state,
    }
  }

  'start-runtime-by-id' = async (event, runtimeID) => {
    if (WindowRuntime.getById(runtimeID)) return true
    const options = await windowSQL.getByID(runtimeID)
    const runtime = new WindowRuntime(runtimeID)
    runtime.create({
      parent: event.sender,
      ..._.pick(options, WindowRuntime.optionNames),
      webPreferences: {
        ..._.pick(options, WindowRuntime.webPreferencesNames),
        // NOTE within database it is stored as a string
        additionalArguments: _.split(options.additionalArguments, /\s+/ig),
        preload: this.preload
      }
    })
    runtime.loadURL(this.url)
    // NOTE notify launcher window
    runtime.on('close', () => WindowRuntime.getById('Launcher').send('window-closed', runtimeID))
    return Boolean(runtime)
  }

  'stop-runtime-by-id' = (e, runtimeID) => {
    const runtime = WindowRuntime.getById(runtimeID)
    if (!runtime) return true
    // NOTE now Electron only start the destroying process of the window
    return runtime.forceClose()
  }

  'act-runtime-by-id' = (e, runtimeID, action, ...params) => {
    const runtime = WindowRuntime.getById(runtimeID)
    return runtime[action](...params)
  }

  'get-self-runtime-id' = event => {
    const runtime = WindowRuntime.getFromEvent(event)
    return runtime?.id || null
  }

  'act-self' = (event, action, ...params) => {
    const runtime = WindowRuntime.getFromEvent(event)
    // NOTE allows object path notation 'webContents.openDevTools'
    return runtime[action](...params)
  }

}
