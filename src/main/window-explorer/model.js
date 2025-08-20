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
