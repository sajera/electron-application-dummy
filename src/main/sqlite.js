// outsource dependencies
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import sqlite3 from 'sqlite3'
import { ipcMain } from 'electron'
// local dependencies
import PATH from './app-path'
import debugInfo from './debug-info'
import initialData from '../assets/sqlite/local.initial.sqlite'

export default new class SQLite {
  name = 'app.db'

  db = null

  dbPath = path.join(PATH.APP_DATA, this.name)

  dbInitial = path.join(PATH.RESOURCES, initialData)

  constructor () {
    const module = this.constructor.name
    const { name, dbInitial, dbPath } = this
    debugInfo.modules.unshift({ module, name, dbPath, dbInitial })
  }

  prebuilt = () => {
    // NOTE skip in case db already setup
    if (fs.existsSync(this.dbPath)) return
    // NOTE copy initial file
    fs.existsSync(this.dbInitial) && fs.copyFileSync(this.dbInitial, this.dbPath)
  }

  initialize = async () => {
    // NOTE setup DB handler
    ipcMain.handle('sqlite', this.handle)
    // NOTE handle prebuilt DB
    this.prebuilt()
    // NOTE up SQLite
    // const Database = !process.env.DEBUG ? sqlite3.Database : sqlite3.verbose().Database
    const Database = sqlite3.verbose().Database
    // const Database = sqlite3.Database
    this.db = new Database(this.dbPath)
    // NOTE run upgrade migrations
    this.upgrade()
  }

  handle = (event, ...params) => this.promise('all', ...params)

  promise = (action, ...params) => new Promise(resolve => {
    this.db[action](...params, (error, data) => {
      if (!error) return resolve(data)
      resolve(debugInfo.handleError(error, { action, params, module: this.constructor.name }))
    })
  })

  close = () => this.db?.close()

  upgrade = () => {
    const upgrades = _.filter(
      fs.readdirSync(PATH.RESOURCES),
      name => /^upgrade.*\.sqlite$/.test(name)
    )

    for (const file of upgrades) {
      console.log('upgrade from ', file)

    }

    // TODO upgrade migrations
    console.info('DB up to date ')
  }
}
