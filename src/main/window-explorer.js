// outsource dependencies
import _ from 'lodash'
import { BrowserWindow, ipcMain } from 'electron'
import SQLiteModel from '../service/model-sqlite'
// local dependencies
import Sqlite from './sqlite'
import debugInfo from './debug-info'

// NOTE something specific to this particular window
export default new class WindowExplorer {
  windows = []

  constructor () {
    const { name, dbInitial, dbPath } = this
    debugInfo.modules.unshift({
      module: 'WindowExplorer',
      name,
      dbPath,
      dbInitial,
    })
  }

  _createWindow = options => {
    options.webPreferences = options.webPreferences || {}
    options.webPreferences.preload = EXPLORER_PRELOAD_WEBPACK_ENTRY

    debugInfo.windows.unshift(options)
    const window = new BrowserWindow(options)
    this.windows.unshift(window)
    window.loadURL(EXPLORER_WEBPACK_ENTRY)
    return window
  }

  initialize = async options => {
    // NOTE setup DB handler
    ipcMain.handle('window-explorer', this.handle)
  }

  _handle = (event, action, ...params) => new Promise(resolve => {
    try {
      const v = this[action](...params)
      console.log('WindowExplorer.handle', v)
      resolve(v)
    } catch (error) {
      resolve(debugInfo.handleError(error))
    }
  })

  handle = async (event, action, ...params) => {
    try {
      return await this[action](...params)
    } catch (error) {
      return debugInfo.handleError({ message: error.message, stack: error.stack, action, params })
    }
  }

  /************************************************
   *          IPC HANDLERS
   ************************************************/
  'get-all' = () => Sqlite.promise('all', 'SELECT * FROM windows')

  'get-window-by-id' = $id => windowSQL.getByID($id)

  'remove-window-by-id' = $id => windowSQL.removeByID($id)

  'create-window' = data => windowSQL.insert(data)

  'update-window' = data => windowSQL.updateByID(data.id, data)

  'get-window-runtime-by-id' = async $id => {
    const options = await windowSQL.getByID($id)

    // TODO expand by current state
    return { options }
  }

  'open-by-id' = ({ }) => {

  }

  // FIXME manual sql....
  // 'create-window' = ({ title, width, height }) => {
  //   // const params = {}
  //   // // allowed fields
  //   // const fields = []
  //   // const values = _.reduce(['title', 'width', 'height'], (acc, field) => {
  //   //   const value = data[field]
  //   //   if (_.isUndefined(value) && !_.isNull(value) && value !== '') {
  //   //     const key = `$${field}`
  //   //     params[key] = value
  //   //     fields.push(field)
  //   //     acc.push(key)
  //   //   }
  //   //   return acc
  //   // }, [])
  //   //
  //   //  return Sqlite.promise(`
  //   //    INSERT INTO windows (${fields.join()})
  //   //    VALUES (${values.join()})
  //   //    RETURNING *;
  //   // `, params).then(_.first)
  //
  //   // return Sqlite.promise('all', `
  //   //   INSERT INTO windows (title, width, height)
  //   //   VALUES (title = $title, width = $width, $height)
  //   //   RETURNING *;
  //   // `, { $title: title, $width: width, $height: height }).then(_.first)
  // }

}

const windowSQL = new class WindowSQL extends SQLiteModel {
  table = 'windows'

  schema = {
    id: SQLiteModel.Number(),

    title: SQLiteModel.String(),
    frame: SQLiteModel.Boolean(),
    show: SQLiteModel.Boolean(),
    closable: SQLiteModel.Boolean(),
    kiosk: SQLiteModel.Boolean(),

    backgroundColor: SQLiteModel.String(),
    opacity: SQLiteModel.Number(),
    transparent: SQLiteModel.Boolean(),
    zoomFactor: SQLiteModel.Number(),

    alwaysOnTop: SQLiteModel.Boolean(),
    x: SQLiteModel.Number(),
    y: SQLiteModel.Number(),
    center: SQLiteModel.Boolean(),

    fullscreen: SQLiteModel.Boolean(),
    fullscreenable: SQLiteModel.Boolean(),
    resizable: SQLiteModel.Boolean(),
    minimizable: SQLiteModel.Boolean(),
    maximizable: SQLiteModel.Boolean(),

    width: SQLiteModel.Number(),
    defaultWidth: SQLiteModel.Number(),
    minWidth: SQLiteModel.Number(),
    maxWidth: SQLiteModel.Number(),

    height: SQLiteModel.Number(),
    defaultHeight: SQLiteModel.Number(),
    minHeight: SQLiteModel.Number(),
    maxHeight: SQLiteModel.Number(),
  }

  constructor () {
    super()
    this.sqlite3all = Sqlite.promise.bind(Sqlite, 'all')
    this.test()
  }
}
