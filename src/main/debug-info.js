// outsource dependencies
import fs from 'fs'
import path from 'path'
import { ipcMain, app } from 'electron'
// local dependencies
import PATH from './app-path'
import sqlite from './sqlite'

export default new class DebugInfo {
  errors = []

  warnings = []

  windows = []

  constructor () {
    // TODO is that usefully ?
  }

  handleWarning = warning => {
    console.error('The app encountered an warning\n', warning)
    this.warnings.push(warning)
  }

  handleError = error => {
    console.error('The app encountered an error\n', error)
    this.errors.push(error)
  }

  handleCrash = error => {
    this.errors.push(error)
    // TODO store/save/send error report ?
    const report = this.getDebugInfo()

    console.error('The app where crashed\n', error)
    app.quit()
  }

  initialize = async () => {
    // NOTE allows to get current app state
    ipcMain.handle('debug-info', this.getDebugInfo)
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
      sqlite: sqlite.getDebugInfo(),
      ENV: `--------------------------------${process.env.SID}--------------------------------`,
      ...process.env
    }
  }
}
