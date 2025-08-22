// outsource dependencies
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import { ipcMain, app } from 'electron'
// local dependencies
import PATH from './app-path'

export default new class DebugInfo {
  errors = []

  windows = []

  modules = [{
    module: 'DebugInfo',
    logs: PATH.LOGS
  }]

  constructor () {
    // TODO is that usefully ?
  }

  outputError = error => ({ isError: true, message: error.message })

  debugError = error => ({ ...error, message: error.message, stack: error.stack })

  handleError = error => {
    console.error('The app encountered an error\n', error)
    this.errors.unshift(this.debugError(error))
    return this.outputError(error)
  }

  handleCrash = error => {
    this.handleError(error)
    this.errors.unshift({ ...error })
    const report = JSON.stringify(this.getDebugInfo(), null, 2)
    const file = `${dayjs().format('hh:mm_DD-MM-YYYY')}-crash.json`
    fs.existsSync(PATH.LOGS) && fs.writeFileSync(path.join(PATH.LOGS, file), report, 'utf8')
    console.error('The app crashed and will now close', error)
    app.quit()
  }

  initialize = async () => {
    // NOTE allows to get current app state
    ipcMain.handle('debug-info', this.getDebugInfo)
  }

  getDebugInfo = () => {
    const { errors: ERRORS, windows: WINDOWS, modules: MODULES } = this
    return {
      isPackaged: app.isPackaged,
      ERRORS, WINDOWS, MODULES,
      SRC: '---------------------------------------------------------------------------------',
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
      ENV: `--------------------------------${process.env.SID}--------------------------------`,
      ...process.env,
      VER: `--------------------------------${process.version}--------------------------------`,
      ...process.versions
    }
  }
}
