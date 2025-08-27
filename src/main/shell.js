// outsource dependencies
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import { ipcMain, shell } from 'electron'
// local dependencies
import PATH from './app-path'
import debugInfo from './debug-info'

export default new class Shell {

  constructor () {
    const module = this.constructor.name
    // TODO
    const { } = this
    debugInfo.modules.unshift({ module })
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('shell', this.handle)
  }

  handle = async (event, action, ...params) => {
    try {
      return await this[action](...params)
    } catch (error) {
      return debugInfo.handleError(error, { action, params, module: this.constructor.name })
    }
  }

  openExternal = url => shell.openExternal(url)

  'default-browser' = url => shell.openExternal(url)

}
