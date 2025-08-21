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

  preload = EXPLORER_PRELOAD_WEBPACK_ENTRY
  url = EXPLORER_WEBPACK_ENTRY

  constructor () {
    const { preload, url, runtime } = this
    debugInfo.modules.unshift({
      module: 'WindowExplorer',
      preload,
      url,
    })
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('window-explorer', this.handle)
  }

  handle = async (event, action, ...params) => {
    try {
      return await this[action](event, ...params)
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

  'get-window-by-id' = (e, id) => windowSQL.getByID(id)

  'remove-window-by-id' = (e, id) => {
    this['stop-runtime-by-id'](id)
    return windowSQL.removeByID(id)
  }

  'create-window' = (e, data) => windowSQL.insert(data)

  'update-window' = (e, data) => windowSQL.updateByID(data.id, data)

  'get-window-details-by-id' = async (e, id) => {
    const runtime = this.runtime[id]
    const options = await windowSQL.getByID(id)
    return { active: Boolean(runtime), options, state: runtime?.state || null }
  }

  'get-self-id' = event => {
    const { id: senderWindowId } = BrowserWindow.fromWebContents(event.sender)
    // eslint-disable-next-line eqeqeq
    const runtime = _.find(this.runtime, runtime => runtime?.windowID == senderWindowId)
    return runtime?.id || null
  }

  'start-runtime-by-id' = async (event, id) => {
    if (this.runtime[id]) return true
    const runtime = this.runtime[id] = new Window()
    runtime.id = id // IMPORTANT for get-self-id
    // FIXME for sure I pass all props into one table ¯\_(ツ)_/¯
    const options = await windowSQL.getByID(id)
    runtime.create({
      parent: event.sender,
      ..._.pick(options, Window.optionNames),
      webPreferences: {
        ..._.pick(options, Window.webPreferencesNames),
        preload: this.preload
      }
    })
    runtime.loadURL(this.url)
    // NOTE cleanup
    runtime.on('close', () => this.runtime[id] = null)
    return Boolean(this.runtime[id])
  }

  'stop-runtime-by-id' = (e, id) => {
    const runtime = this.runtime[id]
    if (!runtime) return true
    // NOTE now Electron only start the destroying process of the window
    return runtime.close()
  }

  'act-by-id' = (e, id, action, ...params) => {
    const runtime = this.runtime[id]
    runtime[action](...params)
    return Boolean(this.runtime[id])
  }

}
