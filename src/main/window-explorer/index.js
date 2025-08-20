// outsource dependencies
import _ from 'lodash'
import { BrowserWindow, ipcMain } from 'electron'
// local dependencies
import Window from './window'
import { windowSQL } from './model'
import debugInfo from '../debug-info'

// NOTE something specific to this particular window
export default new class WindowExplorer {
  runtime = {}

  constructor () {
    const { name, dbInitial, dbPath } = this
    debugInfo.modules.unshift({
      module: 'WindowExplorer',
      name,
      dbPath,
      dbInitial,
    })
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('window-explorer', this.handle)
  }

  handle = async (event, action, ...params) => {
    try {
      return await this[action](...params, event)
    } catch (error) {
      return debugInfo.handleError({ action, params, message: error.message, stack: error.stack })
    }
  }

  /************************************************
   *          IPC HANDLERS
   ************************************************/
  'get-all' = () => windowSQL.sqlite3all('SELECT * FROM windows')
    .then(list => _.map(list, windowSQL.prepareJS))
    // .then(_.partial(_.map, _, windowSQL.prepareJS))

  'get-window-by-id' = id => windowSQL.getByID(id)

  'remove-window-by-id' = id => {
    this['stop-runtime-by-id'](id)
    return windowSQL.removeByID(id)
  }

  'create-window' = data => windowSQL.insert(data)

  'update-window' = data => windowSQL.updateByID(data.id, data)

  'get-window-details-by-id' = async id => {
    const runtime = this.runtime[id]
    const options = await windowSQL.getByID(id)
    return { active: Boolean(runtime), options }
  }

  'get-self-id' = event => {
    const { id: senderWindowId } = BrowserWindow.fromWebContents(event.sender)
    const runtime = _.find(this.runtime, runtime => runtime?.window?.id == senderWindowId)
    return runtime?.id || null
  }

  'start-runtime-by-id' = async id => {
    if (this.runtime[id]) return true
    const runtime = this.runtime[id] = new Window()
    runtime.id = id // IMPORTANT for get-self-id
    // FIXME for sure I pass all props into one table ¯\_(ツ)_/¯
    const options = await windowSQL.getByID(id)
    console.log('start-runtime-by-id'
      , '\noptions:', options
    )
    runtime.create({
    // TODO unexpected behavior
      ...options,
      webPreferences: {
        // ...options,
        preload: EXPLORER_PRELOAD_WEBPACK_ENTRY
      }
    })
    runtime.loadURL(EXPLORER_WEBPACK_ENTRY)
    // NOTE cleanup
    runtime.on('close', () => this.runtime[id] = null)
    return Boolean(this.runtime[id])
  }

  'stop-runtime-by-id' = id => {
    const runtime = this.runtime[id]
    if (!runtime) return true
    // NOTE now Electron only start the destroying process of the window
    return runtime.close()
  }

  'act-by-id' = (id, action, ...params) => {
    const runtime = this.runtime[id]
    runtime[action](...params)
    return Boolean(this.runtime[id])
  }

}
