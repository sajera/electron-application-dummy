// outsource dependencies
import fs from 'fs'
import path from 'path'
import { ipcMain, app } from 'electron'
// local dependencies
import PATH from './app-path'
import Sqlite from './sqlite'

export default new class DebugInfo {
  errors = []

  warning = []

  constructor () {
    // TODO is that usefully ?
  }

  getDebugInfo = () => {
    const { errors, warnings } = this
    return {
      errors, warnings,
      isPackaged: app.isPackaged,
      EXE: PATH.EXE,
      DIR_EXE: fs.readdirSync(path.dirname(PATH.EXE)),
      MAIN: PATH.MAIN,
      DIR_MAIN: fs.readdirSync(path.dirname(PATH.MAIN)),
      RESOURCES: PATH.RESOURCES,
      DIR_RESOURCES: fs.readdirSync(PATH.RESOURCES),
      APP_DATA: PATH.APP_DATA,
      DIR_APP_DATA: fs.readdirSync(PATH.APP_DATA),
      USER_DATA: PATH.USER_DATA,
      DIR_USER_DATA: fs.readdirSync(PATH.USER_DATA),
      LOGS: PATH.LOGS,
      DIR_LOGS: fs.readdirSync(PATH.LOGS),
      TEMP: PATH.TEMP,
      DIR_TEMP: fs.readdirSync(PATH.TEMP),
      sqlite: Sqlite.getDebugInfo(),
      ENV: `--------------------------------${process.env.SID}--------------------------------`,
      ...process.env
    }
  }

  initialize = () => {
    // NOTE setup handler
    ipcMain.handle('debug-info', this.getDebugInfo)

  }

}
