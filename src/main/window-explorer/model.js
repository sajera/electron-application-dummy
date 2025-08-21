// outsource dependencies
import _ from 'lodash'
import SQLiteModel from '../../service/model-sqlite'
// local dependencies
import Sqlite from '../sqlite'


export const windowSQL = new class WindowSQL extends SQLiteModel {
  table = 'windows'

  schema = {
    id: SQLiteModel.Number(),
    title: SQLiteModel.String(),
    // TODO icon
    backgroundColor: SQLiteModel.String(),
    opacity: SQLiteModel.Number(),
    transparent: SQLiteModel.Boolean(),
    zoomFactor: SQLiteModel.Number(),

    useContentSize: SQLiteModel.Boolean(),
    x: SQLiteModel.Number(),
    y: SQLiteModel.Number(),
    center: SQLiteModel.Boolean(),

    frame: SQLiteModel.Boolean(),
    show: SQLiteModel.Boolean(),
    closable: SQLiteModel.Boolean(),
    kiosk: SQLiteModel.Boolean(),
    alwaysOnTop: SQLiteModel.Boolean(),
    fullscreen: SQLiteModel.Boolean(),
    skipTaskbar: SQLiteModel.Boolean(),
    movable: SQLiteModel.Boolean(),
    focusable: SQLiteModel.Boolean(),
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

    // TODO webPreferences
  }

  constructor () {
    super()
    this.sqlite3all = Sqlite.promise.bind(Sqlite, 'all')
    this.test()
  }
}
